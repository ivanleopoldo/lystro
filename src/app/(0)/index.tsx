import { SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Lead } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RelativePathString, router } from "expo-router";
import { PropsWithChildren } from "react";

export default function Dev() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-6 gap-8">
        <Section title="Authentication Screens">
          <Link url={"/(auth)"} title="Sign In/Sign Up" />
          <Link url={"/(auth)/confirm"} title="Confirm Email" />
        </Section>
        <Section title="Main Screens">
          <Link url={"/(tabs)"} title="Main" />
        </Section>
      </View>
    </SafeAreaView>
  );
}

function Section({
  className,
  title,
  children,
}: { className?: string; title?: string } & PropsWithChildren) {
  return (
    <View className={cn(className, "gap-4")}>
      <Lead>{title ?? "Title"}</Lead>
      <View className="gap-2">{children}</View>
    </View>
  );
}

function Link({
  className,
  title,
  url,
}: {
  className?: string;
  title?: string;
  url: string;
} & PropsWithChildren) {
  return (
    <Button
      onPress={() => {
        // @ts-ignore
        router.push(url);
      }}
      className={cn("items-start", className)}
      variant={"secondary"}
    >
      <Text>{title ?? "Submit"}</Text>
    </Button>
  );
}
