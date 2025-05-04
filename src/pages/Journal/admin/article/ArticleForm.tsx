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
import { Separator } from "@/components/ui/separator";
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
  Calendar, 
  Hash, 
  Tag, 
  FileSpreadsheet, 
  Link, 
  Archive, 
  Save,
  Upload,
  File,
  FileUp,
  Trash
} from "lucide-react";

// Modified schema to make fullText optional when uploading PDF
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  abstract: yup.string().required("Abstract is required"),
  keywords: yup.string(),
  issueId: yup.string().required("Issue is required"),
  submissionId: yup.string(),
  doi: yup.string(),
  pages: yup.string().matches(/^\d+-\d+$/, "Pages must be in format XXXX-XXXX"),
  publicationDate: yup.string().required("Publication date is required"),
  fullText: yup.string(), // Made optional since we're using file upload
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

export default function ArticleForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch,
}: Readonly<Props>) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});

  const { data, isFetching } = useApi<any>({
    api: `${rkdfApi.getArticlesById}/${id}`,
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

  const submissionList = useApi<any>({
    api: `${rkdfApi.getAllSubmissions}?page=1&limit=100`,
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
      fullText: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (file.type !== 'application/pdf') {
        toast.error("Only PDF files are allowed");
        return;
      }
      
      // Validate file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should not exceed 10MB");
        return;
      }
      
      setPdfFile(file);
      setPdfFileName(file.name);
      toast.success("PDF file selected successfully");
    }
  };

  const clearSelectedFile = () => {
    setPdfFile(null);
    setPdfFileName("");
  };

  const uploadPDF = async (): Promise<string | null> => {
    if (!pdfFile) {
      toast.error("No PDF file selected");
      return null;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', pdfFile);
      
      // Simulate progress (replace with actual API upload call)
      const uploadResponse = await new Promise<{ data: { fileUrl: string } }>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            // Replace this with your actual API response structure
            resolve({ data: { fileUrl: `https://example.com/uploads/${pdfFile.name}` } });
          }
        }, 300);
      });
      
      setIsUploading(false);
      toast.success("PDF uploaded successfully");
      return uploadResponse.data.fileUrl;
      
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("Failed to upload PDF file");
      setIsUploading(false);
      return null;
    }
  };

  const onSubmit = async (formData: FormData) => {
    try {
      let pdfUrl = null;
      
      if (pdfFile) {
        pdfUrl = await uploadPDF();
        if (!pdfUrl) {
          return; // Stop submission if upload failed
        }
      }
      
      const payload = {
        title: formData.title,
        abstract: formData.abstract,
        keywords: formData.keywords,
        issueId: formData.issueId,
        submissionId: formData.submissionId || undefined,
        doi: formData.doi,
        pages: formData.pages,
        publicationDate: formData.publicationDate,
        fullText: pdfUrl || formData.fullText, // Use PDF URL if available, otherwise use text content
        fileType: pdfFile ? 'pdf' : 'text',
      };

      if (edit && id) {
        const res = await putMutation.mutateAsync({
          api: `${rkdfApi.updateArticles}/${id}`,
          data: payload,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Article not updated successfully");
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: rkdfApi.createArticles,
          data: payload,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Article not created successfully");
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
        issueId: data?.data?.issueId?._id || data?.data?.issueId,
        submissionId: data?.data?.submissionId?._id || data?.data?.submissionId,
        doi: data?.data?.doi,
        pages: data?.data?.pages,
        publicationDate: data?.data?.publicationDate?.split('T')[0],
        fullText: data?.data?.fullText,
      });
      
      // If PDF URL exists in the data
      if (data?.data?.fullText && data?.data?.fileType === 'pdf') {
        setPdfFileName(data?.data?.fullText.split('/').pop() || "Current PDF file");
      }
    } else {
      methods.reset({
        title: "",
        abstract: "",
        keywords: "",
        issueId: "",
        submissionId: "",
        doi: "",
        pages: "",
        publicationDate: "",
        fullText: "",
      });
      clearSelectedFile();
    }
  }, [edit, data, methods.reset]);

  // Helper function to show form errors in toast
  const showFormErrors = () => {
    const errors = methods.formState.errors;
    const errorMessages = Object.entries(errors)
      .map(([field, error]) => error?.message)
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
                    label="Article Title" 
                    placeholder="Enter a descriptive title for your article" 
                    className="pr-2 pl-2"
                  />
                </div>
                
                <div className="relative w-full">
                  <RHFTextArea 
                    name="abstract" 
                    label="Abstract" 
                    placeholder="Provide a concise summary of your article" 
                    rows={4}
                    className="w-full border rounded-md p-1 shadow-sm "
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
            
            {/* Publication Details */}
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
            
            {/* Journal Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <Archive className="h-5 w-5 mr-2 text-blue-600" />
                Journal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFSelectField
                  name="issueId"
                  label="Select Issue"
                  data={issueList?.data?.data?.docs?.map((item: any) => ({
                    label: `${item.journal?.title} - Vol. ${item.volume}, No. ${item.issueNumber}`,
                    value: item._id,
                  }))}
                  className="pr-2 pl-2"
                />
                <RHFSelectField
                  name="submissionId"
                  label="Related Submission (Optional)"
                  data={submissionList?.data?.data?.docs?.map((item: any) => ({
                    label: item.title,
                    value: item._id,
                  }))}
                  className="pr-2 pl-2"
                />
              </div>
            </div>
            
            {/* PDF Upload Section - Replacing Full Text */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Article Full Text
              </h3>
              
              <div className="space-y-4">
                {/* PDF File Upload */}
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FileUp className="h-10 w-10 text-blue-500" />
                    <p className="text-sm text-gray-600 text-center">
                      Upload PDF file containing the full text of your article
                    </p>
                    
                    <input
                      type="file"
                      id="pdfUpload"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    <label 
                      htmlFor="pdfUpload" 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-4 w-4 inline mr-2" />
                      Select PDF File
                    </label>
                  </div>
                </div>
                
                {/* Selected File Display */}
                {pdfFileName && (
                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <File className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">{pdfFileName}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={clearSelectedFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Upload progress bar - only visible when uploading */}
                    {isUploading && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}% Uploaded</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Hidden field to maintain form state */}
                <input 
                  type="hidden" 
                  {...methods.register("fullText")}
                />
                
                {/* Optional: Fallback textarea for when PDF upload is not possible */}
                {/* <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    If you cannot upload a PDF, you can enter the text content below:
                  </p>
                  <RHFTextArea 
                    name="fullText" 
                    label="Text Content (Optional if PDF is uploaded)" 
                    placeholder="Enter the full text of your article if PDF upload is not available" 
                    rows={4}
                    className="pr-2 pl-2 w-full"
                  />
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ButtonLoading
              isLoading={methods.formState.isSubmitting || isUploading}
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium flex items-center justify-center"
              disabled={methods.formState.isSubmitting || isUploading}
            >
              <Save className="h-5 w-5 mr-2" />
              {edit ? "Update Article" : "Publish Article"}
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}