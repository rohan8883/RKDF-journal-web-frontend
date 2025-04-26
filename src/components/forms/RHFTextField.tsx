// form
import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui/input';
import {
  customInputValidation,
  InputValidationType,
  InputElementType
} from '@/lib';

// ----------------------------------------------------------------------

type Props = InputProps & {
  name: string;
  label?: string;
  isDynamic?: boolean;
  inputValidation?: InputValidationType;
  inputSize?: 'small' | 'medium' | 'large';
  isHookForm?: boolean;
};

export default function RHFTextField({
  name,
  label,
  isDynamic,
  inputValidation,
  inputSize,
  isHookForm = true,
  ...other
}: Props) {
  if (isHookForm) {
    return (
      <WithHookFormTextField
        name={name}
        label={label}
        isDynamic={isDynamic}
        inputValidation={inputValidation}
        inputSize={inputSize}
        {...other}
      />
    );
  }
  return (
    <WithOutHookFormTextField
      name={name}
      label={label}
      isDynamic={isDynamic}
      inputValidation={inputValidation}
      inputSize={inputSize}
      {...other}
    />
  );
}

const WithHookFormTextField = ({
  name,
  label,
  isDynamic,
  inputValidation,
  inputSize,
  ...other
}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <label
            className="text-muted-foreground text-xs font-bold"
            htmlFor={label}
          >
            {label} {error && label && <span className="text-red-400">*</span>}
          </label>
          <Input
            {...field}
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            ref={ref}
            // if error then border-red-400 else border-indigo-400
            className={`${error ? 'border-red-400 rounded-lg' : null}
          ${
            (inputSize === 'small' && 'h-8') ||
            (inputSize === 'medium' && 'h-10') ||
            (inputSize === 'large' && 'h-12') ||
            'h-9'
          }`}
            onInput={(e: InputElementType) => {
              if (inputValidation) {
                customInputValidation(e, inputValidation);
              }
            }}
            {...other}
          />
          {
            // if is field ayrray then show error message
            error && (
              <span className="text-red-400 text-xs">{error.message}</span>
            )

            // if not field array then show error message
          }
        </>
      )}
    />
  );
};

const WithOutHookFormTextField = ({
  name,
  label,
  isDynamic,
  inputValidation,
  inputSize,
  ...other
}: Props) => {
  return (
    <>
      <label
        className="text-muted-foreground text-xs font-bold"
        htmlFor={label}
      >
        {label}
      </label>
      <Input
        // if error then border-red-400 else border-indigo-400
        className={`${
          (inputSize === 'small' && 'h-8') ||
          (inputSize === 'medium' && 'h-10') ||
          (inputSize === 'large' && 'h-12') ||
          'h-9'
        }`}
        onInput={(e: InputElementType) => {
          if (inputValidation) {
            customInputValidation(e, inputValidation);
          }
        }}
        {...other}
      />
    </>
  );
};
