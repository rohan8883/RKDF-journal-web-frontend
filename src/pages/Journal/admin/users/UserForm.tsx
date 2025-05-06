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
import { Separator } from "@/components/ui/separator";
import EditDialogBox from "@/components/edit-dialog-box";
import {
  useApi,
  usePostMutation,
  usePutMutation,
} from "@/hooks/useCustomQuery";
import { authApi, loanApi } from "@/lib";
import { I_USER_TYPE_VIEW } from "./type";
import { User, UserCircle, Mail, Phone, Shield, Key, Eye, EyeOff } from "lucide-react";

const schema = yup.object().shape({
  roleId: yup.string().required("Role is required"),
  fullName: yup.string().required("Full name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits"),
  password: yup.string()
    .when('edit', {
      is: false,
      then: (schema) => schema
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
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
  const [showPassword, setShowPassword] = useState(false);
  
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
      roleId: "",
      fullName: "",
      userName: "",
      email: "",
      mobile: "",
      password: "",
    },
    resolver: yupResolver(schema),
    context: { edit }, // Add edit to context for conditional validation
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        roleId: data.roleId,
        fullName: data.fullName,
        userName: data.userName,
        email: data.email,
        mobile: data.mobile,
        ...(!edit && { password: data.password }), // Only include password for new users
      };

      if (edit) {
        const res = await putMutation.mutateAsync({
          api: `${loanApi.updateUser}/${id}`,
          data: payload,
        });
        if (res.data?.success) {
          toast.success("User updated successfully");
        } else {
          toast.error(res.data?.message || "Failed to update user");
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: authApi.register,
          data: payload,
        });
        if (res.data?.success) {
          toast.success("User created successfully");
          methods.reset();
        } else {
          toast.error(res.data?.message || "Failed to create user");
        }
      }
      
      setOpen(false);
      if (setEdit) setEdit(false);
      if (refetch) refetch();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (edit && data) {
      methods.reset({
        roleId: data?.userDetails?.roleId,
        fullName: data?.userDetails?.fullName,
        userName: data?.userDetails?.userName,
        email: data?.userDetails?.email,
        mobile: data?.userDetails?.mobile,
      });
    } else {
      methods.reset({
        roleId: "",
        fullName: "",
        userName: "",
        email: "",
        mobile: "",
        password: "",
      });
    }
  }, [edit, data, methods]);

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title || (edit ? "Edit User" : "Create User")}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-8 py-2">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-100 to-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-indigo-800 flex items-center">
              <UserCircle className="mr-2 h-5 w-5" />
              {edit ? "Update User Details" : "Create New User Account"}
            </h2>
            <p className="text-sm text-gray-600 mt-1 ml-7">
              {edit ? "Modify the existing user information below" : "Fill in the required information to create a new user"}
            </p>
          </div>
          
          {/* Role Selection - Full Width */}
          <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-2">
              <Shield className="h-4 w-4 text-indigo-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-800">User Role</h3>
            </div>
            <RHFSelectField
              name="roleId"
              label="Select Role"
              data={roleList?.data?.data?.docs?.map((item: any) => ({
                label: item.roleName,
                value: item._id,
              }))}
              disabled={edit}
              className="w-full"
            />
          </div>
          
          {/* Personal Information Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <User className="h-4 w-4 text-indigo-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-800">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <RHFTextField
                name="fullName"
                label="Full Name"
                placeholder="Enter full name"
              />
              
              <RHFTextField
                name="userName"
                label="Username"
                placeholder="Enter username"
                disabled={edit}
              />
            </div>
          </div>
          
          {/* Contact Information Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <Mail className="h-4 w-4 text-indigo-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-800">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <RHFTextField
                name="email"
                label="Email Address"
                placeholder="Enter email address"
                type="email"
              />
              
              <div className="relative">
                <RHFTextField
                  name="mobile"
                  label="Mobile Number"
                  placeholder="Enter mobile number"
                  inputValidation={['mobile','number']}
                />
                <Phone className="absolute right-3 top-9 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Password Section - Only for new users */}
          {!edit && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <Key className="h-4 w-4 text-indigo-600 mr-2" />
                <h3 className="text-sm font-medium text-gray-800">Security</h3>
              </div>
              <div className="relative">
                <RHFTextField
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-1 ml-1">Minimum 8 characters required</p>
              </div>
            </div>
          )}

          <Separator className="my-6" />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                if (setEdit) setEdit(false);
              }}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <ButtonLoading
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm"
            >
              {edit ? "Update User" : "Create User"}
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}