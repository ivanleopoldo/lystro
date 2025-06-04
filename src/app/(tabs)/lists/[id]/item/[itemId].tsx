import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";

export default function ListItem() {
  const { id, itemId } = useLocalSearchParams<{ id: string; itemId: string }>();
  return (
    <View>
      <Text>List: {id}</Text>
      <Text>Item: {itemId}</Text>
    </View>
  );
}
