import { Button } from "@/components/general/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView, View } from "react-native";

export default function ConfirmEmail() {
  const email = "john@doe.com";

  const hidePartsOfEmail = (str: string) => {
    const strArr = str.split("@");

    return (
      strArr[0][0].toString() +
      "***" +
      strArr[0][strArr.length + 1].toString() +
      "@" +
      strArr[1].toString()
    );
  };

  return (
    <SafeAreaView className="relative flex-1 justify-center">
      <View className="flex-1 justify-center items-center p-6 gap-4">
        <Text className="text-2xl font-bold">Confirm your email address</Text>
        <View className="justify-center items-center w-full gap-2">
          <Text className="text-lg">We sent a confirmation email to:</Text>
          <View className="w-2/3 text-lg items-center justify-center font-bold bg-neutral-100 py-2 px-4 rounded-lg">
            <Text className="text-lg font-semibold">
              {hidePartsOfEmail(email)}
            </Text>
          </View>
          <Text className="text-lg">Press on confirm to continue</Text>
        </View>
      </View>
      <View className="items-center">
        <Button variant={"secondary"}>
          <Text>Resend Email</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
