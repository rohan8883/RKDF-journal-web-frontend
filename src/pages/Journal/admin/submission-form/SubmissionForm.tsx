import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFTextArea,
  RHFSelectField,
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
  Tag, 
  BookOpen, 
  Save,
  Upload,
  // File,
  Trash,
  Archive,
  // FileSymlink
} from "lucide-react";


const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  abstract: yup.string().required("Abstract is required"),
  keywords: yup.string(),
  journalId: yup.string().required("Journal is required"),
  manuscriptFile: yup.mixed()
    .required("Manuscript file is required")
    .test(
      "fileType",
      "Only PDF, DOC or DOCX files are accepted",
      (value) => {
        if (!value) return false;
        const file = Array.isArray(value) ? value[0] : value;
        return file && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type);
      }
    )
    .test(
      "fileSize",
      "File size must be less than 10MB",
      (value) => {
        if (!value) return false;
        const file = Array.isArray(value) ? value[0] : value;
        return file && file.size <= 10 * 1024 * 1024; // 10MB
      }
    ),
  // coverLetter: yup.mixed()
  //   .test(
  //     "fileType",
  //     "Only PDF, DOC or DOCX files are accepted",
  //     (value) => {
  //       if (!value) return true; // Optional field
  //       const file = Array.isArray(value) ? value[0] : value;
  //       return file && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type);
  //     }
  //   )
  //   .test(
  //     "fileSize",
  //     "File size must be less than 5MB",
  //     (value) => {
  //       if (!value) return true; // Optional field
  //       const file = Array.isArray(value) ? value[0] : value;
  //       return file && file.size <= 5 * 1024 * 1024; // 5MB
  //     }
  //   ),
});

type FormData = yup.InferType<typeof schema>;

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
  // const [coverLetterFileName, setCoverLetterFileName] = useState<string>("");
  
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});

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
 
  const methods = useForm<FormData>({
    defaultValues: {
      title: "",
      abstract: "",
      keywords: "", 
      journalId: "",
      manuscriptFile: undefined,
      // coverLetter: undefined,
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

  // const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
      
  //     // Validate file type
  //     const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  //     if (!allowedTypes.includes(file.type)) {
  //       toast.error("Only PDF, DOC or DOCX files are allowed");
  //       return;
  //     }
      
  //     // Validate file size (limit to 5MB)
  //     if (file.size > 5 * 1024 * 1024) {
  //       toast.error("File size should not exceed 5MB");
  //       return;
  //     }
      
  //     methods.setValue("coverLetter", file);
  //     setCoverLetterFileName(file.name);
  //     toast.success("Cover letter file selected successfully");
  //   }
  // };

  const clearManuscriptFile = () => {
    methods.setValue("manuscriptFile", "");
    setManuscriptFileName("");
  };

  // const clearCoverLetterFile = () => {
  //   methods.setValue("coverLetter", undefined);
  //   setCoverLetterFileName("");
  // };

  const onSubmit = async (formData: FormData) => {
    try {
      const data = new FormData();

      // Append all text fields
      data.append("title", formData.title);
      data.append("abstract", formData.abstract);
      if (formData.keywords) data.append("keywords", formData.keywords); 
      data.append("journalId", formData.journalId);

      // Handle manuscript file
      const manuscriptFile = Array.isArray(formData.manuscriptFile)
        ? formData.manuscriptFile[0]
        : formData.manuscriptFile;
      data.append("manuscriptFile", manuscriptFile);

      // Handle cover letter if exists
      // if (formData.coverLetter) {
      //   const coverLetter = Array.isArray(formData.coverLetter)
      //     ? formData.coverLetter[0]
      //     : formData.coverLetter;
      //   data.append("coverLetter", coverLetter);
      // }

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
      methods.reset({
        title: data?.data?.title,
        abstract: data?.data?.abstract,
        keywords: data?.data?.keywords?.join(", "), 
        journalId: data?.data?.journalId?._id || data?.data?.journalId,
        manuscriptFile: undefined,
        // coverLetter: undefined,
      });
      
      // If manuscript file exists in the data
      if (data?.data?.manuscriptFile) {
        setManuscriptFileName(data?.data?.manuscriptFile.split('/').pop() || "Current manuscript file");
      }
      
      // If cover letter exists in the data
      // if (data?.data?.coverLetter) {
      //   setCoverLetterFileName(data?.data?.coverLetter.split('/').pop() || "Current cover letter");
      // }
    } else {
      methods.reset({
        title: "",
        abstract: "",
        keywords: "", 
        journalId: "",
        manuscriptFile: undefined,
        // coverLetter: undefined,
      });
      setManuscriptFileName("");
      // setCoverLetterFileName("");
    }
  }, [edit, data, methods.reset]);

  // Helper function to show form errors in toast
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
                  <RHFTextArea 
                    name="abstract" 
                    label="Abstract" 
                    placeholder="Provide a concise summary of your submission" 
                    rows={4}
                    className="w-full border rounded-md p-1 shadow-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-blue-600" />
                  <RHFTextField 
                    name="keywords" 
                    label="Keywords" 
                    placeholder="E.g., research, medicine, technology (comma separated)" 
                    className="pr-2 pl-2"
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
                
                {/* Hidden field to maintain form state */}
                <input 
                  type="hidden" 
                  {...methods.register("manuscriptFile")}
                />
              </div>
            </div>
            
            {/* Cover Letter Upload Section */}
            
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