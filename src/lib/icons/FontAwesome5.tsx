import FontAwesome5Icon from "@expo/vector-icons/FontAwesome5";
import { iconWithClassName } from "./iconWithClassName";
import { cn } from "../utils";

iconWithClassName(FontAwesome5Icon);

function FontAwesome5Wrapper({
  className,
  ...props
}: { className?: string } & React.ComponentProps<typeof FontAwesome5Icon>) {
  return (
    <FontAwesome5Icon {...props} className={cn("text-foreground", className)} />
  );
}
export { FontAwesome5Wrapper as FontAwesome5 };
