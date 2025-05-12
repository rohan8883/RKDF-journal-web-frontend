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
  RHFSelectField,
} from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import EditDialogBox from "@/components/edit-dialog-box";
import { useApi, usePostMutation, usePutMutation } from "@/hooks/useCustomQuery";
import { rkdfApi } from "@/lib";
import {
  BookOpen,
  Hash,
  Calendar,
  Type,
  FileText,
  Layers,
  Bookmark,
} from "lucide-react";

const schema = yup.object().shape({
  journalId: yup.string().required("Journal is required"),
  volume: yup.string().required("Volume is required"),
  issueNumber: yup.string().required("Issue number is required"),
  title: yup.string().required("Title is required"),
  publicationDate: yup.string().required("Publication date is required"),
  description: yup.string(),
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
    options: { enabled: edit },
  });

  const journalList = useApi<any>({
    api: `${rkdfApi.getAllJournal}?page=1&limit=100`,
    options: { enabled: true },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      journalId: "",
      volume: "",
      issueNumber: "",
      title: "",
      publicationDate: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const payload = { ...formData };

      let res;
      if (edit && id) {
        res = await putMutation.mutateAsync({
          api: `${rkdfApi.updateIssue}/${id}`,
          data: payload,
        });
      } else {
        res = await postMutation.mutateAsync({
          api: rkdfApi.createIssue,
          data: payload,
        });
      }

      if (res.data?.success) {
        toast.success(res.data.message || "Success");
        setOpen(false);
        if (setEdit) setEdit(false);
        if (refetch) refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
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
        publicationDate: data?.data?.publicationDate?.split("T")[0],
        description: data?.data?.description,
      });
    } else {
      methods.reset({
        journalId: "",
        volume: "",
        issueNumber: "",
        title: "",
        publicationDate: "",
        description: "",
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
      <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Journal Selection */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <BookOpen className="h-5 w-5" />
              <label className="font-medium">Journal</label>
            </div>
            <RHFSelectField
              name="journalId"
              // placeholder="Select a journal"
              data={journalList?.data?.data?.docs?.map((item: any) => ({
                label: item.title,
                value: item._id,
              }))}
            />
          </div>

          {/* Volume, Issue Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border">
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <Layers className="h-5 w-5" />
                <label className="font-medium">Volume</label>
              </div>
              <RHFTextField 
                name="volume" 
                placeholder="Enter volume number" 
                className="w-full"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border">
              <div className="flex items-center gap-2 mb-2 text-gray-700">
                <Hash className="h-5 w-5" />
                <label className="font-medium">Issue Number</label>
              </div>
              <RHFTextField 
                name="issueNumber" 
                placeholder="Enter issue number" 
                className="w-full"
              />
            </div>
          </div>

          {/* Title */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <Type className="h-5 w-5" />
              <label className="font-medium">Title</label>
            </div>
            <RHFTextField 
              name="title" 
              placeholder="Enter issue title" 
              className="w-full"
            />
          </div>

          {/* Publication Date */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <Calendar className="h-5 w-5" />
              <label className="font-medium">Publication Date</label>
            </div>
            <RHFTextField
              name="publicationDate"
              type="date"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <FileText className="h-5 w-5" />
              <label className="font-medium">Description</label>
            </div>
            <RHFTextArea 
              name="description" 
              placeholder="Enter description (optional)" 
              className="w-full min-h-[100px]"
            />
          </div>

          <Separator />

          {/* Submit Button */}
          <div>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="h-11 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Bookmark className="h-4 w-4" />
              {edit ? "Update Issue" : "Create Issue"}
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}