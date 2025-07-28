import { Lucide } from "@/lib/icons/Lucide";
import { cn } from "@/lib/utils";
import { Link as ExpoLink, Href, LinkProps } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { icons } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  PressableProps,
  Share,
  View,
  Switch,
  ViewProps,
} from "react-native";
import { Text as ReusablesText } from "../ui/text";
import { Muted } from "../ui/typography";

// TODO: allow support for left icon
// TODO: allow support for custom right icon

type RowProps = {
  children?: React.ReactNode;
  containerProps?: PressableProps;
  containerClassName?: string;
  className?: string;
  pressable?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  isLast?: boolean;
};

function IndentedRow({ ...props }: RowProps) {
  return (
    <>
      <Pressable
        onPress={props.onPress}
        className={cn(
          props.containerClassName,
          "px-5 flex-row items-center gap-2",
          props.pressable && "active:bg-muted-foreground/10",
        )}
        {...props.containerProps}
      >
        <View className="flex-row items-center w-full py-3 gap-3">
          {props.leftIcon && (
            <View className="w-6 items-center justify-center">
              {props.leftIcon}
            </View>
          )}
          <View className="flex-1 flex-row justify-between items-center">
            {props.children}
          </View>
        </View>
      </Pressable>
      {!props.isLast && (
        <View className="ml-5 border-b-[1px] border-muted-foreground/10" />
      )}
    </>
  );
}

function Section({
  title,
  footer,
  ...props
}: { title?: string; footer?: string } & ViewProps) {
  const count = React.Children.count(props.children);
  return (
    <View {...props} className="gap-2">
      {title && <Muted className="ml-5 uppercase">{title}</Muted>}
      <View className="bg-muted rounded-lg overflow-hidden">
        {React.Children.map(props.children, (child, index) => {
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

function Text({ hint, ...props }: { hint?: string } & RowProps) {
  return (
    <IndentedRow {...props}>
      <ReusablesText className={cn("text-lg", props.className)}>
        {props.children}
      </ReusablesText>
      {hint && <Muted className="text-muted-foreground text-lg ">{hint}</Muted>}
    </IndentedRow>
  );
}

// TODO: add deeplink support

function Link({
  iconType,
  target,
  ...props
}: {
  iconType?: "globe" | "share" | "default" | "external" | undefined;
  target?: LinkProps["target"] | "share";
} & Omit<LinkProps, "target"> &
  RowProps) {
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
      <IndentedRow leftIcon={props.leftIcon} pressable>
        <ReusablesText className={cn("text-lg", props.className)}>
          {props.children}
        </ReusablesText>
        <Lucide name={iconName} size={16} className="text-muted-foreground" />
      </IndentedRow>
    </ExpoLink>
  );
}

function Card({ ...props }: RowProps) {
  return (
    <IndentedRow {...props} pressable>
      {props.children}
    </IndentedRow>
  );
}

function Toggle({ value, ...props }: { value?: boolean } & RowProps) {
  return (
    <IndentedRow {...props} pressable>
      <ReusablesText className={cn("text-lg", props.className)}>
        {props.children}
      </ReusablesText>
      <Switch value={value} pointerEvents="none" />
    </IndentedRow>
  );
}

export const Grouped = {
  Section,
  Text,
  Link,
  Toggle,
  Card,
};
