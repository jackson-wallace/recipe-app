import { AuthProvider, useAuth } from "@/providers/auth-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutComponent() {
  const { loading: authLoading } = useAuth(); // Access the loading state from AuthProvider
  const [fontsLoaded, fontsError] = useFonts({
    regular: require("../assets/fonts/regular.otf"),
    bold: require("../assets/fonts/bold.otf"),
    italic: require("../assets/fonts/italic.otf"),
    boldItalic: require("../assets/fonts/bold-italic.otf"),
  });

  useEffect(() => {
    if ((fontsLoaded || fontsError) && !authLoading) {
      SplashScreen.hideAsync(); // Hide the splash screen once both fonts and auth are ready
    }
  }, [fontsLoaded, fontsError, authLoading]);

  // Keep showing the splash screen until both fonts and auth are ready
  if (!fontsLoaded || authLoading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutComponent />
    </AuthProvider>
  );
}
