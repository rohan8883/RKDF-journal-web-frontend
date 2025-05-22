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
} from "@/components/forms";
import EditDialogBox from "@/components/edit-dialog-box-w-full";
import {
  useApi,
  usePostMutation,
} from "@/hooks/useCustomQuery";
import { rkdfApi } from "@/lib";
import {
  Book,
  FileText,
  BookOpen,
  Save,
  FileSpreadsheet,
  Calendar,
  Hash,
   Link, 
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
    issueId: yup.string().required("Issue  is required"),
     submissionId: yup.string(),
    doi: yup.string(),
      pages: yup.string().matches(/^\d+-\d+$/, "Pages must be in format XXXX-XXXX"),
      publicationDate: yup.string().required("Publication date is required"),
      
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

export default function PublicationForm({
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
  const { user } = useAuth();

  // Use dynamic schema based on user role
  const schema = getSchema(user?.role || '');

  const { data, isFetching } = useApi<any>({
    api: `${rkdfApi.getSubmissionsById}/${id}`,
    options: {
      enabled: edit,
    },
  });

 const issueList = useApi<any>({
    api: `${rkdfApi.getAllIssue}?page=1&limit=100`,
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
      keywords: "",
      issueId: "",
        submissionId: "",
      doi: "",
      pages: "",
      publicationDate: "",
      ...(user?.role !== 'Author' && { submittedBy: "" }),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    try {
      // Prepare the payload as a simple object
      const payload: any = {
        title: formData.title,
        abstract: formData.abstract,
        issueId: formData.issueId,
        submissionId: id,
        doi: formData.doi,
        pages: formData.pages,
        publicationDate: formData.publicationDate,
        manuscriptFile: data?.data?.fullManuscriptUrl
      };

      // Only include submittedBy if user is not Author
      if (user?.role !== 'Author' && formData?.submittedBy) {
        payload.submittedBy = formData.submittedBy;
      }

      // Process keywords
      if (formData.keywords) {
        const keywordsArray = formData.keywords
          .split(",")
          .map(keyword => keyword.trim())
          .filter(keyword => keyword);
        payload.keywords = keywordsArray;
      }

      if (edit && id) {
          const res = await postMutation.mutateAsync({
          api: rkdfApi.createPublication,
          data: payload,
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
        keywords: data?.data?.keywords?.join(", "),
        journalId: data?.data?.journalId?._id || data?.data?.journalId,
      };

      // Only include submittedBy if user is not Author
      if (user?.role !== 'Author') {
        initialValues.submittedBy = data?.data?.submittedBy?._id || data?.data?.submittedBy;
      }

      methods.reset(initialValues);

      // If manuscript file exists in the data
      if (data?.data?.fullManuscriptUrl) {
        setManuscriptFileName(data?.data?.fullManuscriptUrl.split('/').pop() || "Current manuscript file");
      }
    } else {
      const defaultValues: any = {
        title: "",
        abstract: "",
        keywords: "",
        issueId: "",
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
                  name="issueId"
                  label="Select Issue"
                  data={issueList?.data?.data?.docs?.map((item: any) => ({
                    label: `${item.journal?.title} - Vol. ${item.volume}, No. ${item.issueNumber}`,
                    value: item._id,
                  }))}
                  className="pr-2 pl-2"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FileSpreadsheet className="h-5 w-5 mr-2 text-blue-600" />
                Publication Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <RHFTextField
                    name="publicationDate"
                    label="Publication Date"
                    type="date"
                    className="pr-2 pl-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-blue-600" />
                  <RHFTextField
                    name="doi"
                    label="DOI"
                    placeholder="e.g., 10.1000/xyz123"
                    className="pr-2 pl-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-blue-600" />
                  <RHFTextField
                    name="pages"
                    label="Page Range"
                    placeholder="e.g., 123-145"
                    className="pr-2 pl-2"
                  />
                </div>
              </div>
            </div>

            {/* Manuscript Display Section */}
            {manuscriptFileName && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Manuscript File
                </h3>
                <div className="bg-gray-100 p-3 rounded-md">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">{manuscriptFileName}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium flex items-center justify-center"
              disabled={methods.formState.isSubmitting}
            >
              <Save className="h-5 w-5 mr-2" />
              {edit ? "Update Publication" : "Submit Manuscript"}
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}