import {
  ScrollViewProps as BaseScrollViewProps,
  ScrollView as BaseScrollView,
  StyleSheet,
  SafeAreaView,
  View,
} from "react-native";

import {
  FadingView,
  Header,
  LargeHeader,
  ScalingView,
  ScrollHeaderProps,
  ScrollLargeHeaderProps,
  ScrollViewWithHeaders,
  SurfaceComponentProps,
} from "@codeherence/react-native-header";
import { Text } from "../ui/text";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { PropsWithChildren } from "react";
import { useTheme } from "@react-navigation/native";
import { cn } from "@/lib/utils";

function HeaderSurface({ showNavBar }: SurfaceComponentProps) {
  return (
    <FadingView opacity={showNavBar} style={StyleSheet.absoluteFill}>
      <BlurView style={StyleSheet.absoluteFill} tint="systemThickMaterial" />
    </FadingView>
  );
}

function HeaderComponent({
  title = "Title",
  headerLeft,
  headerRight,
  showNavBar,
}: {
  title?: string;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
} & ScrollHeaderProps) {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Header
      headerLeft={headerLeft}
      headerRight={headerRight}
      borderColor={theme.colors.border}
      borderWidth={0.2}
      showNavBar={showNavBar}
      initialBorderColor="transparent"
      headerStyle={{
        height: 45 + top,
      }}
      headerCenter={<Text className="text-2xl font-semibold">{title}</Text>}
      SurfaceComponent={HeaderSurface}
    />
  );
}

function LargeHeaderComponent({
  title = "Title",
  scrollY,
}: { title?: string } & ScrollLargeHeaderProps) {
  return (
    <LargeHeader>
      <ScalingView scrollY={scrollY}>
        <Text className="text-5xl font-bold">{title}</Text>
      </ScalingView>
    </LargeHeader>
  );
}

export default function ScrollView({
  title = "Title",
  className,
  containerClassName,
  contentContainerClassName,
  children,
  header = true,
  ...props
}: {
  title?: string;
  className?: string;
  containerClassName?: string;
  contentContainerClassName?: string;
  header?: boolean;
} & PropsWithChildren &
  BaseScrollViewProps) {
  const { bottom } = useSafeAreaInsets();

  const baseClassName = "flex-1";
  const baseContentContainerClassName = "p-4";

  return (
    <>
      {header ? (
        <ScrollViewWithHeaders
          {...props}
          HeaderComponent={(props) => (
            <HeaderComponent title={title} {...props} />
          )}
          LargeHeaderComponent={(props) => (
            <LargeHeaderComponent title={title} {...props} />
          )}
          absoluteHeader
          className={cn(baseClassName, "-z-100", className)}
          contentContainerClassName={cn(
            baseContentContainerClassName,
            containerClassName,
          )}
          contentContainerStyle={{ paddingBottom: bottom }}
        >
          <View className={contentContainerClassName}>{children}</View>
        </ScrollViewWithHeaders>
      ) : (
        <SafeAreaView className="flex-1">
          <BaseScrollView
            className={cn(baseClassName, className)}
            contentContainerClassName={cn(
              baseContentContainerClassName,
              contentContainerClassName,
            )}
            {...props}
          >
            {children}
          </BaseScrollView>
        </SafeAreaView>
      )}
    </>
  );
}
