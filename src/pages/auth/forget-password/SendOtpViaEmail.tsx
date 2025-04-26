import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { authApi, getErrorMessage } from '@/lib';
import { I_DATA, I_NEXT } from './index';

type IProps = {
  next: I_NEXT;
  data: I_DATA;
};

const schema = yup.object({
  email: yup.string().email().required()
});

export default function SendOtpViaEmail({ next, data }: Readonly<IProps>) {
  const postLogin = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: data.email
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postLogin.mutateAsync({
        api: authApi.sendOtpViaEmail,
        data: data
      });
      if (response?.data?.success) {
        next({ ...data, email: data?.email, token: response?.data?.token });
        toast.success(response?.data?.message);
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
          Send OTP
        </h1>

        {/* subtitle */}
        <p className="text-center mt-2 text-muted-foreground text-xs">
          Enter your email to send OTP to your email address
        </p>
      </div>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <RHFTextField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="email"
              inputValidation={['email', 'removeSpace']}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <ButtonLoading
              type="submit"
              isLoading={methods.formState.isSubmitting}
              className="w-full rounded-xl py-5 px-4 mt-2 shadow-none"
              variant="outline"
            >
              Send OTP
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </>
  );
}
