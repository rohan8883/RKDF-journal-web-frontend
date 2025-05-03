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
  journalId: yup.string().required("Journal is required"),
  volume: yup.string().required("Volume is required"),
  issueNumber: yup.string().required("Issue number is required"),
  title: yup.string().required("Title is required"),
  publicationDate: yup.string().required("Publication date is required"),
  description: yup.string(),
  coverImage: yup.mixed(),
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

export default function IssueForm({
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
    api: `${rkdfApi.getIssueById}/${id}`,
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
      journalId: "",
      volume: "",
      issueNumber: "",
      title: "",
      publicationDate: "",
      description: "",
      coverImage: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const data = new FormData();

      // Append all text fields
      data.append("journalId", formData.journalId);
      data.append("volume", formData.volume);
      data.append("issueNumber", formData.issueNumber);
      data.append("title", formData.title);
      data.append("publicationDate", formData.publicationDate);
      
      if (formData.description) {
        data.append("description", formData.description);
      }

      // Handle file upload
      if (formData.coverImage) {
        // If coverImage is an array (from RHFUploadFiled), take the first item
        const file = Array.isArray(formData.coverImage) 
          ? formData.coverImage[0] 
          : formData.coverImage;
        data.append("coverImage", file);
      }

      if (edit && id) {
        const res = await putMutation.mutateAsync({
          api: `${rkdfApi.updateIssue}/${id}`,
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Issue not updated successfully");
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: rkdfApi.createIssue,
          data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("Issue not created successfully");
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
        journalId: data?.data?.journalId?._id || data?.data?.journalId,
        volume: data?.data?.volume,
        issueNumber: data?.data?.issueNumber,
        title: data?.data?.title,
        publicationDate: data?.data?.publicationDate?.split('T')[0], // Format date if needed
        description: data?.data?.description,
        coverImage: null, // Reset to null for edit mode
      });
    } else {
      methods.reset({
        journalId: "",
        volume: "",
        issueNumber: "",
        title: "",
        publicationDate: "",
        description: "",
        coverImage: null,
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
            <RHFSelectField
              name="journalId"
              label="Journal"
              data={journalList?.data?.data?.docs?.map((item: any) => ({
                label: item.title,
                value: item._id,
              }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <RHFTextField name="volume" label="Volume" placeholder="Enter volume" />
            <RHFTextField name="issueNumber" label="Issue Number" placeholder="Enter issue number" />
          </div>

          <div>
            <RHFTextField name="title" label="Title" placeholder="Enter title" />
          </div>

          <div>
            <RHFTextField 
              name="publicationDate" 
              label="Publication Date" 
              placeholder="YYYY-MM-DD"
              type="date"
            />
          </div>

          <div>
            <RHFTextArea name="description" label="Description" placeholder="Enter description" />
          </div>

          <div>
            <RHFUploadFiled 
              name="coverImage" 
              label="Cover Image" 
              accept="image/*"
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