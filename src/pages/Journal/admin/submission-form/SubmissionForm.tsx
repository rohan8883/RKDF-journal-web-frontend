import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFSelectField,
  RHFTextArea,
} from "@/components/forms";
import EditDialogBox from "@/components/edit-dialog-box-w-full";
import {
  useApi,
  usePostMutation,
  usePutMutation,
} from "@/hooks/useCustomQuery";
import { rkdfApi } from "@/lib";
import {
  Book,
  FileText,
  BookOpen,
  Save,
  Upload,
  Trash,
  Archive,
} from "lucide-react";
import KeywordTagInput from "./KeywordTagInput";
import { useAuth } from "@/store/useAuth";
import QuillField from "@/hooks/useQuillForm";

// Dynamic schema based on user role
const getSchema = (userRole: string) => {
  const baseSchema = {
    title: yup.string().required("Title is required"),
    submittedBy: userRole !== 'Author'
      ? yup.string().required("Author is required")
      : yup.string().notRequired(),
    abstract: yup.string().required("Abstract is required"),
    keywords: yup.string(),
    references: yup.string(),
    journalId: yup.string().required("Journal is required"),
    manuscriptFile: yup.mixed()
      .test(
        "fileRequired",
        "Manuscript file is required",
        (value) => {
          // For edit mode, file might already exist
          if (userRole === 'EDIT_MODE') return true;
          return !!value;
        }
      )
      .test(
        "fileType",
        "Only PDF, DOC or DOCX files are accepted",
        (value) => {
          if (!value) return true; // Skip if no file (for edit mode)
          const file = Array.isArray(value) ? value[0] : value;
          return file && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type);
        }
      )
      .test(
        "fileSize",
        "File size must be less than 10MB",
        (value) => {
          if (!value) return true; // Skip if no file (for edit mode)
          const file = Array.isArray(value) ? value[0] : value;
          return file && file.size <= 10 * 1024 * 1024; // 10MB
        }
      ),
  };

  // Add submittedBy validation only for non-Author users
  if (userRole !== 'Author') {
    return yup.object().shape({
      ...baseSchema,
      submittedBy: yup.string().required("Author is required"),
    });
  }

  return yup.object().shape(baseSchema);
};

type FormData = yup.InferType<ReturnType<typeof getSchema>>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
};

export default function SubmissionForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const [manuscriptFileName, setManuscriptFileName] = useState<string>("");
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});
  const { user } = useAuth();

  // Use dynamic schema based on user role
  const schema = getSchema(user?.role || '');

  const { data, isFetching } = useApi<any>({
    api: `${rkdfApi.getSubmissionsById}/${id}`,
    options: {
      enabled: edit,
    },
  });

  const journalList = useApi<any>({
    api: `${rkdfApi.getAllJournal}?page=1&limit=100`,
    options: {
      enabled: true,
    },
  });

  const authorList = useApi<any>({
    api: `${rkdfApi.getAvailableAuthors}?page=1&limit=100`,
    options: {
      enabled: true,
    },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      title: "",
      abstract: "",
      references: "",
      keywords: "",
      journalId: "",
      manuscriptFile: undefined,
      ...(user?.role !== 'Author' && { submittedBy: "" }),
    },
    resolver: yupResolver(schema),
  });

  const handleManuscriptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, DOC or DOCX files are allowed");
        return;
      }

      // Validate file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should not exceed 10MB");
        return;
      }

      methods.setValue("manuscriptFile", file);
      setManuscriptFileName(file.name);
      toast.success("Manuscript file selected successfully");
    }
  };

  const clearManuscriptFile = () => {
    methods.setValue("manuscriptFile", "");
    setManuscriptFileName("");
  };

  const onSubmit = async (formData: FormData) => {
    try {
      const data = new FormData();

      // Append all text fields
      data.append("title", formData.title);
      data.append("abstract", formData.abstract);

      // Only include submittedBy if user is not Author
      if (user?.role !== 'Author' && formData?.submittedBy) {
        data.append("submittedBy", formData?.submittedBy);
      }

      // Process keywords
      if (formData.keywords) {
        const keywordsArray = formData.keywords
          .split(",")
          .map(keyword => keyword.trim())
          .filter(keyword => keyword);
        data.append("keywords", JSON.stringify(keywordsArray));
      }

      data.append("journalId", formData.journalId);

      // Handle manuscript file - only append if it's a new file
      if (formData.manuscriptFile && typeof formData.manuscriptFile !== 'string') {
        const manuscriptFile = Array.isArray(formData.manuscriptFile)
          ? formData.manuscriptFile[0]
          : formData.manuscriptFile;
        data.append("manuscriptFile", manuscriptFile);
      }

      if (edit && id) {
        const res = await putMutation.mutateAsync({
          api: `${rkdfApi.updateSubmissions}/${id}`,
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Submission not updated successfully");
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: rkdfApi.createSubmissions,
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Submission not created successfully");
        }
      }

      setOpen(false);
      if (setEdit) setEdit(false);
      if (refetch) refetch();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit the form");
    }
  };

  useEffect(() => {
    if (edit && data) {
      const initialValues: any = {
        title: data?.data?.title,
        abstract: data?.data?.abstract,
        references: data?.data?.references,
        keywords: data?.data?.keywords?.join(", "),
        journalId: data?.data?.journalId?._id || data?.data?.journalId,
        manuscriptFile: data?.data?.manuscriptFile, // Keep existing file path
      };

      // Only include submittedBy if user is not Author
      if (user?.role !== 'Author') {
        initialValues.submittedBy = data?.data?.submittedBy?._id || data?.data?.submittedBy;
      }

      methods.reset(initialValues);

      // If manuscript file exists in the data
      if (data?.data?.manuscriptFile) {
        setManuscriptFileName(data?.data?.manuscriptFile.split('/').pop() || "Current manuscript file");
      }
    } else {
      const defaultValues: any = {
        title: "",
        abstract: "",
        references: "",
        keywords: "",
        journalId: "",
        manuscriptFile: undefined,
      };

      // Only include submittedBy if user is not Author
      if (user?.role !== 'Author') {
        defaultValues.submittedBy = "";
      }

      methods.reset(defaultValues);
      setManuscriptFileName("");
    }
  }, [edit, data, methods.reset, user?.role]);

  const showFormErrors = () => {
    const errors = methods.formState.errors;
    const errorMessages = Object.entries(errors)
      .map(([, error]) => error?.message)
      .filter(Boolean);

    if (errorMessages.length > 0) {
      toast.error(errorMessages.join(", "));
    }
  };

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit, showFormErrors)}
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
            {/* Author Selection - only show for non-Author users */}
            {user?.role !== 'Author' && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                  Author Information
                </h3>
                <div className="space-y-4">
                  <RHFSelectField
                    name="submittedBy"
                    label="Select Author"
                    data={authorList?.data?.data?.docs?.map((item: any) => ({
                      label: item.fullName,
                      value: item._id,
                    }))}
                    className="pr-2 pl-2"
                  />
                </div>
              </div>
            )}

            {/* Title Section */}
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <Book className="h-5 w-5 mr-2 text-blue-600" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <RHFTextField
                    name="title"
                    label="Submission Title"
                    placeholder="Enter a descriptive title for your submission"
                    className="pr-2 pl-2"
                  />
                </div>
                {/* 
                <div className="relative w-full">
                  <RHFTextArea
                    name="abstract"
                    label="Abstract"
                    placeholder="Provide a concise summary of your submission"
                    rows={4}
                    className="w-full border rounded-md p-1 shadow-sm"
                  />
                </div> */}
                <div className="relative w-full">
                  <QuillField
                    name="abstract"
                    control={methods.control}
                    label="Abstract"
                    placeholder="Enter your abstract here..."
                  />
                </div>


                <div className="flex flex-col w-full">
                  <KeywordTagInput
                    control={methods.control}
                    name="keywords"
                    label="Keywords"
                    placeholder="Type and press Enter to add keywords"
                  />
                </div>
              </div>
            </div>

            {/* Journal Selection */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Journal Information
              </h3>
              <div className="space-y-4">
                <RHFSelectField
                  name="journalId"
                  label="Select Journal"
                  data={journalList?.data?.data?.docs?.map((item: any) => ({
                    label: item.title,
                    value: item._id,
                  }))}
                  className="pr-2 pl-2"
                />
              </div>
            </div>
            {/* References */}
            <div className="relative w-full">
              <RHFTextArea
                name="references"
                label="References"
                placeholder="Enter your references here..."
                rows={8}
                className="w-full border rounded-md p-1 shadow-sm"
              />
            </div>
            {/* Manuscript Upload Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <Archive className="h-5 w-5 mr-2 text-blue-600" />
                Manuscript File
              </h3>

              <div className="space-y-4">
                {/* Manuscript File Upload */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-10 w-10 text-blue-500" />
                    <p className="text-sm text-gray-600 text-center">
                      Upload your manuscript file (PDF, DOC, DOCX - max 10MB)
                    </p>

                    <input
                      type="file"
                      id="manuscriptUpload"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleManuscriptFileChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="manuscriptUpload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-4 w-4 inline mr-2" />
                      Select Manuscript File
                    </label>
                  </div>
                </div>

                {/* Selected File Display */}
                {manuscriptFileName && (
                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">{manuscriptFileName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={clearManuscriptFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium flex items-center justify-center"
              disabled={methods.formState.isSubmitting}
            >
              <Save className="h-5 w-5 mr-2" />
              {edit ? "Update Submission" : "Submit Manuscript"}
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}