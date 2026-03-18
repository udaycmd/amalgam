import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-7 p-6 md:p-12 max-w-8xl mx-auto w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}
