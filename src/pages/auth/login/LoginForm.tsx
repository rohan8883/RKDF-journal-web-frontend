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
import { Link } from 'react-router-dom';

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
            className="rounded  py-4 px-5 w-full bg-background"
            name="email"
            inputValidation={['email', 'removeSpace']}
            placeholder="Enter your email"
          />
        </div>
        <div className="space-y-2">
          <RHFPasswordField
            className="rounded py-4 px-5 w-full bg-background"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <ButtonLoading
            type="submit"
            isLoading={methods.formState.isSubmitting}
            className="w-full rounded  py-4 px-4 mt-2 shadow-none"
            variant="outline"
          >
            Login
          </ButtonLoading>
        </div> 
        <div className="text-center">
          <Link to="/loan/auth/forget-password">
            <span className="text-sm text-primary">Forget password?</span>
          </Link>
        </div>
      </div>
    </FormProviders>
  );
}
