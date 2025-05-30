import { cn } from "@/lib/utils";
import { Image } from "react-native";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      className={cn(className)}
      source={require("../../../assets/images/icon.png")}
    />
  );
}
