import { Text } from "../ui/text";
import { Button } from "./button";
import { View, ScrollView, ScrollViewProps } from "react-native";

export type ListProps = {
  title?: string;
  children?: React.ReactNode;
} & ScrollViewProps;

export function List({ title = "Title", children, ...props }: ListProps) {
  return (
    <ScrollView {...props}>
      <Text>Title</Text>
      <Text>Grouped</Text>
    </ScrollView>
  );
}

export function Section() {
  return null;
}

export function Link() {
  return null;
}

export function Toggle() {
  return null;
}

export const Grouped = { List, Section };
