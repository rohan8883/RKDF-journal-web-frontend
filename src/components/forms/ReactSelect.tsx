import { useFormContext, Controller } from 'react-hook-form';
import Select, { Props } from 'react-select';

type SelectProps = Props & {
  name: string;
  label?: string;
  isDynamic?: boolean;
  options: { value: string; label: string }[];
  inputSize?: 'small' | 'medium' | 'large';
};

export default function RHFSelectField({
  name,
  label,
  isDynamic,
  inputSize,
  options,
  ...other
}: SelectProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <label className="text-gray-700 dark:text-gray-200" htmlFor={label}>
            {label} {error && label && <span className="text-red-400">*</span>}
          </label>
          <Select
            onChange={(e: any) => {
              setValue(name, e.value);
              field.onChange(e);
            }}
            value={field.value}
            options={options}
            ref={ref}
            className={`${error ? 'border-red-400' : null}
            ${
              (inputSize === 'small' && 'h-8') ||
              (inputSize === 'medium' && 'h-10') ||
              (inputSize === 'large' && 'h-12') ||
              'h-9'
            }`}
            {...other}
          />
        </>
      )}
    />
  );
}
