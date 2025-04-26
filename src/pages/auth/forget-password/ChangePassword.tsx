import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFPasswordField,
  FormProviders
} from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import { I_DATA, I_PREV } from './index';

type IProps = {
  data: I_DATA;
  prev?: I_PREV;
  setData?: React.Dispatch<React.SetStateAction<I_DATA>>;
};

const schema = yup.object({
  email: yup.string().email().required(),
  token: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
});

export default function ChangePassword({ data }: Readonly<IProps>) {
  const navigate = useNavigate();
  const postLogin = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: data.token
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.resetPassword,
        data: {
          email: data.email,
          password: data.password,
          token: data.token
        }
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate('/lms-app/auth/login');
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <>
      <div className="px-6 lg:px-0 mx-auto max-w-sm mb-4">
        {/* logo */}
        <div className="flex justify-center">
          {/* <Image
          src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={100}
          height={100}
          alt="Logo"
          className="rounded-full"
        /> */}
        </div>

        <h1 className="text-3xl font-bold text-center mt-4 text-green-400">
          {/* title */}
          Reset Password
        </h1>

        {/* subtitle */}
        <h1 className="text-center mt-2 text-muted-foreground text-xs">
          Reset your password to login to your account
        </h1>
      </div>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="password"
              placeholder="Enter your OTP"
            />
          </div>
          <div className="space-y-2">
            <RHFPasswordField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="confirmPassword"
              placeholder="Enter your OTP"
            />
          </div>

          <div>
            <ButtonLoading
              type="submit"
              isLoading={methods.formState.isSubmitting}
              className="w-full rounded-xl py-5 px-4 mt-2 shadow-none"
              variant="outline"
            >
              Reset Password
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </>
  );
}
