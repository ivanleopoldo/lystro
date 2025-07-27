import React from "react";
import { View, Pressable, ViewProps } from "react-native";
import { Link as ExpoLink } from "expo-router";
import { Text as ReusablesText } from "../ui/text";
import { Muted } from "../ui/typography";
import { Button as ReusablesButton } from "./button";
import { cn } from "@/lib/utils";
import { Entypo } from "@/lib/icons/Entypo";

type ContainerProps = ViewProps & { className?: string };

function IndentedRow({
  children,
  containerProps,
  className,
  onPress,
  style,
  isLast,
}: {
  children: React.ReactNode;
  containerProps?: ContainerProps;
  className?: string;
  style?: any;
  onPress?: () => void;
  isLast?: boolean;
}) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        className={cn(
          "px-5 py-3 flex-row justify-between items-center",
          containerProps?.className,
          className,
          "active:bg-muted-foreground/10",
        )}
        style={style}
        {...containerProps}
      >
        {children}
      </Pressable>
      {!isLast && (
        <View className="ml-5 border-b-[1px] border-muted-foreground/10" />
      )}
    </View>
  );
}

function Section({
  title,
  footer,
  children,
  ...props
}: { title?: string; footer?: string } & ViewProps & React.PropsWithChildren) {
  const count = React.Children.count(children);
  return (
    <View {...props} className="gap-2">
      {title && <Muted className="ml-5 uppercase">{title}</Muted>}
      <View className="bg-muted rounded-lg overflow-hidden">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          const el = child as React.ReactElement<any>;
          return React.cloneElement(el, {
            containerProps: el.props.containerProps,
            className: el.props.className,
            isLast: index === count - 1,
          } as any);
        })}
      </View>
      {footer && <Muted className="ml-5 uppercase">{footer}</Muted>}
    </View>
  );
}

function Text({
  children,
  hint,
  containerProps,
  className,
  isLast,
  onPress,
}: {
  children: React.ReactNode;
  hint?: string;
  containerProps?: ContainerProps;
  className?: string;
  isLast?: boolean;
  onPress?: () => void;
}) {
  return (
    <IndentedRow
      containerProps={containerProps}
      className={className}
      onPress={onPress}
      isLast={isLast}
    >
      <ReusablesText className="text-lg">{children}</ReusablesText>
      {hint && (
        <Muted className="text-muted-foreground font-medium">{hint}</Muted>
      )}
    </IndentedRow>
  );
}

function Link({
  href,
  children,
  containerProps,
  className,
  isLast,
}: {
  href: any;
  children: React.ReactNode;
  containerProps?: ContainerProps;
  className?: string;
  isLast?: boolean;
}) {
  return (
    <ExpoLink href={href} asChild>
      <IndentedRow
        containerProps={containerProps}
        className={className}
        isLast={isLast}
      >
        <ReusablesText className="text-lg">{children}</ReusablesText>
        <Entypo
          name="chevron-right"
          size={16}
          className="text-muted-foreground"
        />
      </IndentedRow>
    </ExpoLink>
  );
}

function Toggle({
  children,
  containerProps,
  className,
  isLast,
}: {
  children: React.ReactNode;
  containerProps?: ContainerProps;
  className?: string;
  isLast?: boolean;
}) {
  return (
    <IndentedRow
      containerProps={containerProps}
      className={className}
      isLast={isLast}
    >
      <ReusablesText className="text-lg">{children}</ReusablesText>
      <Muted>Toggle</Muted>
    </IndentedRow>
  );
}

function Button({
  children,
  onPress,
  containerProps,
  className,
  isLast,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  containerProps?: ContainerProps;
  className?: string;
  isLast?: boolean;
}) {
  return (
    <IndentedRow
      containerProps={containerProps}
      className={className}
      onPress={onPress}
      isLast={isLast}
    >
      <ReusablesButton>{children}</ReusablesButton>
    </IndentedRow>
  );
}

export const Grouped = {
  Section,
  Text,
  Link,
  Toggle,
  Button,
};
