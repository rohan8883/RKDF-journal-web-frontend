("");
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
import { loanApi } from "@/lib";
import { I_USER_TYPE_VIEW } from "./type";

const schema = yup.object().shape({
  roleId: yup.string().required("Role name is required"),
  fullName: yup.string().required("Role name is required"),
  address: yup.string().required("address is required"),
  email: yup.string().required("address is required"),
  mobile: yup.string().required("mobile is required"),
  password: yup.string(),
  imageUrl: yup.mixed(),
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

export default function UserForm({
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
  const { data, isFetching } = useApi<I_USER_TYPE_VIEW>({
    api: `${loanApi.getUserById}/${id}`,
    options: {
      enabled: edit,
    },
  });
  const roleList = useApi<any>({
    api: `${loanApi.getAllRole}?page=1&limit=10`,
    options: {
      enabled: true,
    },
  });

  const methods = useForm<FormData>({
    defaultValues: {
      fullName: "",
      address: "",
      email: "",
      mobile: "",
      password: "",
      imageUrl: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("roleId", data.roleId);
      formData.append("fullName", data.fullName);
      formData.append("address", data.address);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
      if (data.password) formData.append("password", data.password);

      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${loanApi.updateUserwithImage}/${id}`,
          data: formData,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("User not updated successfully");
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: loanApi.createUserswithImage,
          data: formData,
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error("User not created successfully");
        }
        methods.reset({
          fullName: "",
          address: "",
          email: "",
          mobile: "",
          password: "",
        });
      }
      setOpen(false);
      setEdit!(false);
      refetch!();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (edit && data) {
      console.log(data);
      methods.reset({
        roleId: data?.userDetails?.roleId,
        fullName: data?.userDetails?.fullName,
        address: data?.userDetails?.address,
        email: data?.userDetails?.email,
        mobile: data?.userDetails?.mobile,
      });
    } else {
      methods.reset({
        fullName: "",
        email: "",
        address: "",
        password: "",
        mobile: "",
      });
    }
  }, [edit, data]);

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
          {!edit && (
            <div>
              <RHFSelectField
                name="roleId"
                data={roleList?.data?.data?.docs?.map((item: any) => ({
                  label: item.roleName,
                  value: item._id,
                }))}
              />
            </div>
          )}

          <div>
            <RHFTextField name="fullName" placeholder="Enter your user name" />
          </div>
          <div>
            <RHFTextArea name="address" placeholder="Enter your address" />
          </div>

          <div>
            <RHFTextField name="email" placeholder="Enter your email" />
          </div>
          <div>
            <RHFTextField name="mobile" placeholder="Enter your mobile" />
          </div>
          {!edit && (
            <div>
              <RHFTextField name="password" placeholder="Enter your password" />
            </div>
          )}
          <div>
            <RHFUploadFiled name="imageUrl" placeholder="Upload " />
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
