import { useFormContext, Controller } from 'react-hook-form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

type Props = {
  name: string;
  label?: string;
};

export default function OTPInput({ name }: Readonly<Props>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <InputOTP
          maxLength={4}
          ref={ref}
          inputMode="numeric"
          className={`mt-1 ${error ? 'border-red-400' : null}`}
          {...field}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSeparator className="ml-2 mr-2" />
            <InputOTPSlot index={1} />
            <InputOTPSeparator className="ml-2 mr-2" />
            <InputOTPSlot index={2} />
            <InputOTPSeparator className="ml-2 mr-2" />
            <InputOTPSlot index={3} />
            {/* <InputOTPSeparator />
              <InputOTPSlot index={4} />
              <InputOTPSeparator />
              <InputOTPSlot index={5} /> */}
          </InputOTPGroup>
        </InputOTP>
      )}
    />
  );
}
