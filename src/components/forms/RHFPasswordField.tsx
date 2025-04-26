// form
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui/input';
// eye icon
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import {
  customInputValidation,
  InputValidationType,
  InputElementType
} from '@/lib';

// ----------------------------------------------------------------------

type Props = InputProps & {
  name: string;
  label?: string;
  inputValidation?: InputValidationType;
  inputSize?: 'small' | 'medium' | 'large';
};

export default function RHFPasswordField({
  name,
  label,
  inputSize,
  inputValidation,
  ...other
}: Props) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <label className="text-gray-700 dark:text-gray-200" htmlFor={label}>
            {label} {error && label && <span className="text-red-400">*</span>}
          </label>
          {/* <Input
            {...field}
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            ref={ref}
            // if error then border-red-400 else border-indigo-400
            className={`mt-1 ${error ? 'border-red-400' : null}`}
            {...other}
          /> */}
          <div className="relative mt-1">
            <Input
              {...field}
              value={
                typeof field.value === 'number' && field.value === 0
                  ? ''
                  : field.value
              }
              ref={ref}
              // if error then border-red-400 else border-indigo-400
              className={`mt-1 ${error ? 'border-red-400' : null}
              ${
                (inputSize === 'small' && 'h-8') ||
                (inputSize === 'medium' && 'h-10') ||
                (inputSize === 'large' && 'h-12') ||
                'h-9'
              }`}
              type={showPassword ? 'text' : 'password'}
              onInput={(e: InputElementType) => {
                if (inputValidation) {
                  customInputValidation(e, inputValidation);
                }
              }}
              {...other}
            />
            <button
              type="button"
              className="absolute right-3 top-4"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeClosedIcon width={20} height={20} />
              ) : (
                <EyeOpenIcon width={20} height={20} />
              )}
            </button>
          </div>
          {error && (
            <span className="text-red-400 text-xs">{error?.message}</span>
          )}
        </>
      )}
    />
  );
}
