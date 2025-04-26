// form
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// ----------------------------------------------------------------------

type Props = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  name: string;
  data: { value: string; label: string }[];
  label?: string;
  defaultValue?: string;
};

export default function RadioButton({
  name,
  label,
  data,
  defaultValue,

  ...other
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({}) => (
        <>
          <RadioGroup
            defaultValue={defaultValue || data[0].value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(name, e.target.value);
            }}
            {...other}
          >
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={item.value}>{item.label}</RadioGroupItem>
                <Label htmlFor={`r${item.value}`}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </>
      )}
    />
  );
}
