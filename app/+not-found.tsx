import { Href, Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen doesn't exist.</Text>
        <Link href={"/index" as Href}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
