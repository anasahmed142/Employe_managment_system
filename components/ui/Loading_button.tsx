import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

interface ButtonLoadingProps extends React.ComponentProps<"button"> {
  text: string;
  loading?: boolean;
}

export function ButtonLoading({ text, type, className, loading=false, onClick, ...props }: ButtonLoadingProps) {
  return (
    <Button size="sm" className={cn("",className)} disabled={loading} type={type} {...props} onClick={onClick}>
      {loading && 
        <Loader2Icon className="animate-spin" />
      }
      {text}
    </Button>
  );
}
