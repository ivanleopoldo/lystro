import React, { PropsWithChildren } from "react";
import { View, Pressable, ViewProps, Share, Switch } from "react-native";
import { Link as ExpoLink, Href, LinkProps } from "expo-router";
import { Text as ReusablesText } from "../ui/text";
import { Muted } from "../ui/typography";
import { Button as ReusablesButton } from "./button";
import { cn } from "@/lib/utils";
import { Lucide } from "@/lib/icons/Lucide";
import { icons } from "lucide-react-native";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "@react-navigation/native";

type ContainerProps = ViewProps & { className?: string };

// TODO: generalize props into one
// TODO: allow support for left icon

function IndentedRow({
  children,
  containerProps,
  pressable = false,
  onPress,
  style,
  isLast,
}: {
  children: React.ReactNode;
  containerProps?: ContainerProps;
  className?: string;
  pressable?: boolean;
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
          pressable && "active:bg-muted-foreground/10",
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
      <ReusablesText className={cn("text-lg", className)}>
        {children}
      </ReusablesText>
      {hint && <Muted className="text-muted-foreground text-lg ">{hint}</Muted>}
    </IndentedRow>
  );
}

function Link({
  children,
  containerProps,
  className,
  iconType,
  isLast,
  target,
  ...props
}: {
  children: React.ReactNode;
  containerProps?: ContainerProps;
  iconType?: "globe" | "share" | "default" | "external" | undefined;
  className?: string;
  target?: LinkProps["target"] | "share";
  isLast?: boolean;
} & Omit<LinkProps, "target">) {
  const iconMap: Record<string, keyof typeof icons> = {
    default: "ChevronRight",
    share: "Share",
    external: "Globe",
    _blank: "ExternalLink",
  };

  const isExternal = /^([\w\d_+.-]+:)?\/\//.test(
    ExpoLink.resolveHref(props.href),
  );

  const resolveIcon =
    target === undefined && isExternal ? "external" : undefined;
  const iconName = iconMap[target ?? resolveIcon ?? "default"];

  const openInAppBrowser = (href: Href) => {
    WebBrowser.openBrowserAsync(href as string, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
    });
  };

  return (
    <ExpoLink
      {...props}
      href={props.href}
      onPress={(e) => {
        if (target === undefined && isExternal) {
          e.preventDefault();

          openInAppBrowser(props.href);
        } else if (target === "share" && isExternal) {
          e.preventDefault();
          Share.share({
            url: props.href as string,
          });
        } else {
          props.onPress?.(e);
        }
      }}
      asChild
    >
      <IndentedRow containerProps={containerProps} pressable isLast={isLast}>
        <ReusablesText className={cn("text-lg", className)}>
          {children}
        </ReusablesText>
        <Lucide name={iconName} size={16} className="text-muted-foreground" />
      </IndentedRow>
    </ExpoLink>
  );
}

function Card({
  children,
  onPress,
  containerProps,
}: {
  className?: string;
  containerProps?: ContainerProps;
  onPress?: () => void;
} & PropsWithChildren) {
  return (
    <IndentedRow onPress={onPress} pressable {...containerProps} isLast={true}>
      {children}
    </IndentedRow>
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
  const theme = useTheme();
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <IndentedRow
      onPress={() => setIsEnabled((prev) => !prev)}
      containerProps={containerProps}
      pressable
      isLast={isLast}
    >
      <ReusablesText className={cn("text-lg", className)}>
        {children}
      </ReusablesText>
      <Switch
        pointerEvents="none"
        value={isEnabled}
        className="scale-[0.85] self-center h-full mb-[6px]"
      />
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
  Card,
};
