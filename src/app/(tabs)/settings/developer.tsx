import { Grouped } from "@/components/general/grouped";
import { View } from "react-native";
import { ScrollView } from "@/components/general/with-headers";

// TODO: add button to stop syncing

export default function Developer() {
  return (
    <ScrollView title="Developer" largeHeader={false}>
      <Grouped.Section title="Developer"></Grouped.Section>
    </ScrollView>
  );
}
