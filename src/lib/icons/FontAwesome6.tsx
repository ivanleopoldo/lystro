import FontAwesome6Icon from "@expo/vector-icons/FontAwesome6";
import { iconWithClassName } from "./iconWithClassName";
import { cn } from "../utils";

iconWithClassName(FontAwesome6Icon);

function FontAwesome6Wrapper({
  className,
  ...props
}: { className?: string } & React.ComponentProps<typeof FontAwesome6Icon>) {
  return (
    <FontAwesome6Icon {...props} className={cn("text-foreground", className)} />
  );
}
export { FontAwesome6Wrapper as FontAwesome6 };
