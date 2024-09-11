import { OnboardingProvider } from "@/providers/onboarding-provider";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <OnboardingProvider>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="name" options={{ headerShown: false }} />
        <Stack.Screen name="username" options={{ headerShown: false }} />
      </Stack>
    </OnboardingProvider>
  );
};

export default Layout;
