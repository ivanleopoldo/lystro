import { Tabs } from "expo-router";
import { FontAwesome5 } from "@/lib/icons/FontAwesome5";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="lists/index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="lists/[id]/item/[itemId]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
