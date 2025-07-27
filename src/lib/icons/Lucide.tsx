import { icons } from "lucide-react-native";
import { iconWithClassName } from "./iconWithClassName";
import { cn } from "../utils";

const Lucide = ({
  name,
  color,
  className,
  size,
}: {
  name: keyof typeof icons;
  color?: string;
  className?: string;
  size?: number;
}) => {
  const LucideIcon = icons[name];

  iconWithClassName(LucideIcon);

  return (
    <LucideIcon
      className={cn("text-foreground", className)}
      color={color}
      size={size}
    />
  );
};

export { Lucide };
