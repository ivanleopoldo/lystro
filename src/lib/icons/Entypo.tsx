import EntypoIcon from "@expo/vector-icons/Entypo";
import { iconWithClassName } from "./iconWithClassName";
import { cn } from "../utils";
// @ts-ignore
iconWithClassName(EntypoIcon);

function Entypo({
  className,
  ...props
}: { className?: string } & React.ComponentProps<typeof EntypoIcon>) {
  return <EntypoIcon {...props} className={cn("text-foreground", className)} />;
}

export { Entypo };
