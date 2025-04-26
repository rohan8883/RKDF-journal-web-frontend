import { cn } from "@/lib/utils"; // Ensure this function is available
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        secondary: "bg-blue-100 text-blue-800",
        destructive: "bg-red-100 text-red-800",
        outline: "border border-gray-300 text-gray-800",
        success: "bg-green-100 text-green-800" // ✅ Add success variant here
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge };
