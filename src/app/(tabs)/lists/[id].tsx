import { SafeAreaView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import { dummyListItemData } from "@/lib/constants";

export default function ListItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dummyListItem = dummyListItemData.filter((item) => item.list_id === id);
  return (
    <SafeAreaView>
      {dummyListItem.map((listItem) => {
        return <Text key={listItem.id}>{listItem.name}</Text>;
      })}
    </SafeAreaView>
  );
}
