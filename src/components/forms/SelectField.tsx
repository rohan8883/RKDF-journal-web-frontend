import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  name: string;
  data: { value: string; label: string }[];
  selectedText?: string;
  label?: string;
  className?: string;
  children?: any;
  initialValue?: string;
  initialValueText?: string;
  isRequired?: boolean;
};

const RHFSelectField = ({
  children,
  name,
  label,
  selectedText,
  className,
  data,
  initialValue,
  initialValueText,
  isRequired,
  ...other
}: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <h1 className="text-gray-700 dark:text-gray-200 ">
            {label} {isRequired && <span className="text-red-400">*</span>}
          </h1>
          <select
            {...field}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              field.onChange(e);
              if (selectedText) {
                setValue(
                  selectedText,
                  data?.find((item) => item.value == e.target.value)?.label
                );
              }
            }}
            ref={ref}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-red-400' : null,
              className
            )}
            {...other}
          >
            <option value="">Select</option>
            {data?.map((item, index) => (
              <option key={index + 1} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          {error && (
            <span className="text-red-400 text-xs">{error?.message}</span>
          )}
        </>
      )}
    />
  );
};

export default RHFSelectField;
