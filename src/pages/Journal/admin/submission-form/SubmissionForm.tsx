import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFTextArea,
  RHFUploadFiled,
  RHFSelectField,
} from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import EditDialogBox from "@/components/edit-dialog-box";
import {
  useApi,
  usePostMutation,
  usePutMutation,
} from "@/hooks/useCustomQuery";
import { rkdfApi } from "@/lib";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  abstract: yup.string().required("Abstract is required"),
  keywords: yup.string(),
  // submittedBy: yup.string().required("Submitter is required"),
  journalId: yup.string().required("Journal is required"),
  manuscriptFile: yup.mixed().required("Manuscript file is required"),
  coverLetter: yup.mixed(),
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

  const personList = useApi<any>({
    api: `${rkdfApi.getAllUser}?page=1&limit=100`,
    options: {
      enabled: true,
    },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      title: "",
      abstract: "",
      keywords: "",
      // submittedBy: "",
      journalId: "",
      manuscriptFile: undefined,
      coverLetter: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const data = new FormData();

      // Append all text fields
      data.append("title", formData.title);
      data.append("abstract", formData.abstract);
      if (formData.keywords) data.append("keywords", formData.keywords);
      // data.append("submittedBy", formData.submittedBy);
      data.append("journalId", formData.journalId);

      // Handle manuscript file
      const manuscriptFile = Array.isArray(formData.manuscriptFile)
        ? formData.manuscriptFile[0]
        : formData.manuscriptFile;
      data.append("manuscriptFile", manuscriptFile);

      // Handle cover letter if exists
      if (formData.coverLetter) {
        const coverLetter = Array.isArray(formData.coverLetter)
          ? formData.coverLetter[0]
          : formData.coverLetter;
        data.append("coverLetter", coverLetter);
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
      methods.reset({
        title: data?.data?.title,
        abstract: data?.data?.abstract,
        keywords: data?.data?.keywords?.join(", "),
        // submittedBy: data?.data?.submittedBy?._id || data?.data?.submittedBy,
        journalId: data?.data?.journalId?._id || data?.data?.journalId,
        manuscriptFile: undefined,
        coverLetter: null,
      });
    } else {
      methods.reset({
        title: "",
        abstract: "",
        keywords: "",
        // submittedBy: "",
        journalId: "",
        manuscriptFile: undefined,
        coverLetter: null,
      });
    }
  }, [edit, data, methods.reset]);

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
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-x-2 gap-y-4">
          <div>
            <RHFTextField name="title" label="Title" placeholder="Enter title" />
          </div>

          <div>
            <RHFTextArea name="abstract" label="Abstract" placeholder="Enter abstract" rows={5} />
          </div>

          <div>
            <RHFTextField
              name="keywords"
              label="Keywords"
              placeholder="Comma separated keywords"
            />
          </div>
          <div>
            <RHFSelectField
              name="journalId"
              label="Journal"
              data={journalList?.data?.data?.docs?.map((item: any) => ({
                label: item.title,
                value: item._id,
              }))}
            />
          </div>

          <div>
            <RHFUploadFiled
              name="manuscriptFile"
              label="Manuscript File"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <div>
            <RHFUploadFiled
              name="coverLetter"
              label="Cover Letter (Optional)"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <Separator />
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="h-11 w-full rounded-xl"
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}