// form
import { useFormContext, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { SwitchProps } from '@radix-ui/react-switch';

// ----------------------------------------------------------------------

type Props = SwitchProps & {
  name: string;
  label?: string;
};

export default function RHFSwitch({ name, label, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <label className="text-gray-700 dark:text-gray-200" htmlFor={label}>
            {label} {error && <span className="text-red-400">*</span>}
          </label>

          <div className="relative mt-1">
            <Switch
              onCheckedChange={field.onChange}
              checked={field.value}
              ref={ref}
              // if error then border-red-400 else border-indigo-400
              className={`mt-1 ${error ? 'border-red-400' : null}`}
              {...other}
            />
          </div>
          {error && (
            <span className="text-red-400 text-xs">{error?.message}</span>
          )}
        </>
      )}
    />
  );
}
