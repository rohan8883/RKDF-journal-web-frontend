import { ReloadIcon } from '@radix-ui/react-icons';
import { Button, ButtonProps } from '@/components/ui/button';

export interface ButtonLoadingProps extends ButtonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function ButtonLoading({
  isLoading,
  children,
  ...other
}: Readonly<ButtonLoadingProps>) {
  return (
    <Button {...other} disabled={isLoading}>
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? 'Loading...' : children}
    </Button>
  );
}
