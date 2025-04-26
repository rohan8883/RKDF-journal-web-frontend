import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { usePostMutation } from '@/hooks/useCustomQuery';
import useTimer from '@/hooks/useTimer';
import { authApi, getErrorMessage } from '@/lib';
import { I_DATA, I_NEXT, I_PREV } from './index';

type IProps = {
  next: I_NEXT;
  data: I_DATA;
  prev: I_PREV;
  setData: React.Dispatch<React.SetStateAction<I_DATA>>;
};

const schema = yup.object({
  email: yup.string().email().required(),
  otp: yup.string().required(),
  token: yup.string().required()
});

export default function VerifyOTP({
  next,
  data,
  setData,
  prev
}: Readonly<IProps>) {
  const { minutes, seconds, togglerTimer, runTimer } = useTimer(0.5);
  const postData = usePostMutation({});
  const methods = useForm<yup.InferType<typeof schema>>({
    defaultValues: {
      email: data.email,
      otp: data.otp,
      token: data.token
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await postData.mutateAsync({
        api: authApi.verifyOtp,
        data: data
      });
      if (response?.data?.success) {
        next({ ...data, otp: data?.otp });
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    togglerTimer();
    return () => {
      togglerTimer();
    };
  }, []);

  const resendOtp = async () => {
    try {
      const response = await postData.mutateAsync({
        api: authApi.sendOtpViaEmail,
        data: {
          email: data.email
        }
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setData({
          ...data,
          otp: ''
        });
        methods.setValue('otp', '');
        togglerTimer();
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
          Verify OTP
        </h1>

        {/* subtitle */}
        <h1 className="text-center mt-2 text-muted-foreground text-xs">
          Verify your OTP to reset your password
          <p className="text-center text-muted-foreground text-xs text-green-400">
            {data.email}
            {'  '}
            <button
              onClick={() => prev(data)}
              className="text-center mt-2  text-sm text-green-400 cursor-pointer hover:text-green-500 underline"
            >
              Edit
            </button>
          </p>
        </h1>
      </div>
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <RHFTextField
              className="rounded-xl py-6 px-5 w-full bg-background"
              name="otp"
              inputValidation={['number', 'removeSpace']}
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
              Verify OTP
            </ButtonLoading>
          </div>
          <div className="text-center text-muted-foreground text-xs">
            <span>Didn't receive the OTP? </span>
            {runTimer ? (
              <span className="text-center mt-2  text-sm text-green-400 cursor-pointer hover:text-green-500 underline">
                {minutes}:{seconds}
              </span>
            ) : (
              <button
                className="text-center mt-2  text-sm text-green-400 cursor-pointer hover:text-green-500 underline"
                onClick={resendOtp}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </FormProviders>
    </>
  );
}
