import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { SafeAreaView, View } from "react-native";

export default function Dev() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-6 gap-8">
        <Section title="Authentication Screens">
          <Link url={"/(auth)"} title="Sign In/Sign Up" />
          <Link url={"/confirm"} title="Confirm Email" />
        </Section>
        <Section title="Main Screens">
          <Link url={"/lists"} title="Main" />
          <Link url={"/lists/1"} title="Lists" />
          <Link url={"/lists/1/item/2"} title="Items" />
        </Section>
        <Section title="Misc">
          <Link url={"/_sitemap"} title="Sitemap" />
          <Link url={"/+not-found"} title="Not Found" />
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
