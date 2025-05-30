import React from "react";
import { Button as UIButton, ButtonProps as UIButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export function Button({
  icon,
  children,
  className,
  ...props
}: UIButtonProps & { icon?: React.ReactNode }) {
  return (
    <UIButton
      className={cn(className, "flex-row items-center justify-center gap-2")}
      {...props}
    >
      {icon && icon}
      <>{children}</>
    </UIButton>
  );
}
