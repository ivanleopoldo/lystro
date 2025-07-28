import {
  ScrollView as BaseScrollView,
  ScrollViewProps as BaseScrollViewProps,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import {
  FadingView,
  Header,
  HeaderProps,
  LargeHeader,
  LargeHeaderProps,
  ScalingView,
  ScrollHeaderProps,
  ScrollLargeHeaderProps,
  ScrollViewWithHeaders,
  SurfaceComponentProps,
} from "@codeherence/react-native-header";
import { Text } from "../ui/text";

import { cn } from "@/lib/utils";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HeaderSurface({ showNavBar }: SurfaceComponentProps) {
  return (
    <FadingView opacity={showNavBar} style={StyleSheet.absoluteFill}>
      <BlurView style={StyleSheet.absoluteFill} tint="systemThickMaterial" />
    </FadingView>
  );
}

function HeaderComponent({
  title = "Title",
  showNavBar,
  ...props
}: {
  title?: string;
  headerCenterFadesIn?: boolean;
} & ScrollHeaderProps &
  HeaderProps) {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Header
      {...props}
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
  ...props
}: { title?: string } & ScrollLargeHeaderProps & LargeHeaderProps) {
  return (
    <LargeHeader {...props}>
      <ScalingView scrollY={scrollY}>
        <Text className="text-5xl text-foreground font-bold">{title}</Text>
      </ScalingView>
    </LargeHeader>
  );
}

export function ScrollView({
  title = "Title",
  className,
  containerClassName,
  contentContainerClassName,
  children,
  header = true,
  largeHeader = true,
  headerProps,
  largeHeaderProps,
  ...props
}: {
  title?: string;
  className?: string;
  containerClassName?: string;
  contentContainerClassName?: string;
  header?: boolean;
  largeHeader?: boolean;
  headerProps?: Omit<HeaderProps, "showNavBar" | "scrollY">;
  largeHeaderProps?: Omit<LargeHeaderProps, "showNavBar" | "scrollY">;
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
            <HeaderComponent
              title={title}
              headerCenterFadesIn={largeHeader}
              {...headerProps}
              {...props}
            />
          )}
          {...(largeHeader && {
            LargeHeaderComponent: (props) => (
              <LargeHeaderComponent
                title={title}
                {...largeHeaderProps}
                {...props}
              />
            ),
          })}
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
