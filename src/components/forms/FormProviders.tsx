// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  className,
  methods
}: Readonly<Props>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
}
