// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFPasswordField
} from '@/components/forms';
import { useStore } from '@/store';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5)
});

export default function LoginForm() {
  const postLogin = usePostMutation({});
  const { login } = useStore();
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.login,
        data: data
      });
      if (response?.data?.success) {
        await login(response);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <FormProviders methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-4 ">
        <div className="space-y-2">
          <RHFTextField
            className="rounded-xl py-6 px-5 w-full bg-background"
            name="email"
            inputValidation={['email', 'removeSpace']}
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <RHFPasswordField
            className="rounded-xl py-6 px-5 w-full bg-background"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded-xl py-5 px-4 mt-2 shadow-none"
            variant="outline"
          >
            Login
          </ButtonLoading>
        </div>
        {/* or */}
        {/* <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span>or</span>
          <hr className="flex-1" />
        </div> */}
        {/* <div>
          <Link
            to="/auth/otp-login"
            className="w-full justify-center rounded-xl py-2 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium text-sm px-5  text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v14m7-7H5"
              />
            </svg>
            Sign in with Mobile
          </Link>
        </div> */}
{/* 
        <div className="text-center">
          <Link to="/loan/auth/forget-password">
            <span className="text-sm text-primary">Forget password?</span>
          </Link>
        </div> */}
      </div>
    </FormProviders>
  );
}
