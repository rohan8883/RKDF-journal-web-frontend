import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

type Props = SelectProps &
  React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    name: string;
    data: { value: string; label: string }[];
    selectedText?: string;
    label?: string;
    className?: string;
    children?: React.ReactNode;
    isRequired?: boolean;
    isNormal?: boolean;
    placeHolder?: string;
    isHookForm?: boolean;
  };

const RHFSelectField = ({
  children,
  name,
  label,
  selectedText,
  className,
  data,
  isRequired,
  placeHolder,
  isNormal = true,
  isHookForm = true,
  ...other
}: Props) => {
  if (isHookForm) {
    return (
      <RHFSelectFieldComp
        name={name}
        label={label}
        selectedText={selectedText}
        className={className}
        data={data}
        isRequired={isRequired}
        placeHolder={placeHolder}
        isNormal={isNormal}
        {...other}
      />
    );
  }
  return (
    <WithOutRHFSelectField
      name={name}
      label={label}
      selectedText={selectedText}
      className={className}
      data={data}
      isRequired={isRequired}
      placeHolder={placeHolder}
      isNormal={isNormal}
      {...other}
    />
  );
};

const RHFSelectFieldComp = ({
  name,
  label,
  selectedText,
  className,
  data,
  isRequired,
  placeHolder,
  isNormal = true,
  ...other
}: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) =>
        isNormal ? (
          <div>
            <h1 className="text-muted-foreground text-xs font-bold mt-2">
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
                'flex h-9 w-full rounded-[6px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                error ? 'border-red-400' : null,
                className
              )}
              {...other}
            >
              <option
                value=""
                className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
              >
                Select
              </option>
              {data?.map((item, index) => (
                <option
                  key={index + 1}
                  value={item.value}
                  className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
                >
                  {item.label}
                </option>
              ))}
            </select>

            {error && (
              <span className="text-red-400 text-xs">{error?.message}</span>
            )}
          </div>
        ) : (
          <>
            <label
              className="text-muted-foreground text-xs font-bold"
              htmlFor={label}
            >
              {label} {error && <span className="text-red-400">*</span>}
            </label>
            <Select
              onValueChange={(e) => {
                field.onChange(e);
                if (selectedText) {
                  // setValue(
                  //   selectedText,
                  //   children?.find((child: any) => child.props.value === e)?.props
                  //     .children
                  // );
                  setValue(
                    selectedText,
                    data?.find((item) => item.value == e)?.label
                  );
                }
              }}
              defaultValue={field.value}
              {...other}
            >
              <SelectTrigger
                ref={ref}
                className={cn(
                  'h-9',
                  error ? 'border-red-400' : null,
                  className
                )}
              >
                <SelectValue placeholder={placeHolder ?? 'Select'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {data?.map((item, index) => (
                    <SelectItem key={index + 1} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {error && (
              <span className="text-red-400 text-xs">{error?.message}</span>
            )}
          </>
        )
      }
    />
  );
};

const WithOutRHFSelectField = ({
  name,
  label,
  selectedText,
  className,
  data,
  isRequired,
  placeHolder,
  isNormal = true,
  ...other
}: Props) => {
  if (isNormal) {
    return (
      <div>
        <h1 className="text-muted-foreground text-xs font-bold mt-2">
          {label} {isRequired && <span className="text-red-400">*</span>}
        </h1>
        <select
          className={cn(
            'flex h-9 w-full rounded-[6px] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...other}
        >
          <option
            value=""
            className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
          >
            Select
          </option>
          {data?.map((item, index) => (
            <option
              key={index + 1}
              value={item.value}
              className="text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <>
      <label
        className="text-muted-foreground text-xs font-bold"
        htmlFor={label}
      >
        {label} {isRequired && <span className="text-red-400">*</span>}
      </label>
      <Select {...other}>
        <SelectTrigger className={cn('h-9', className)}>
          <SelectValue placeholder={placeHolder ?? 'Select'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.map((item, index) => (
              <SelectItem key={index + 1} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default RHFSelectField;
