// form
import { useFormContext, Controller } from 'react-hook-form';
import { Input, InputProps } from '@/components/ui/input';

// ----------------------------------------------------------------------

type Props = InputProps & {
  name: string;
  label?: string;
  isDynamic?: boolean;
};

export default function RHFTextField({
  name,
  label,
  isDynamic,
  ...other
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref }, fieldState: { error } }) => (
        <>
          <label className="text-gray-700 dark:text-gray-200" htmlFor={label}>
            {label} {error && <span className="text-red-400">*</span>}
          </label>
          <Input
            type="file"
            onChange={(e) => {
              setValue(name, e.target.files ? e.target.files[0] : null);
            }}
            ref={ref}
            className={`mt-1 ${error ? 'border-red-400' : null}`}
            {...other}
          />
          {error && (
            <span className="text-red-400 text-xs">{error.message}</span>
          )}
        </>
      )}
    />
  );
}
