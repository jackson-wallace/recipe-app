import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon
          //     name={focused ? "home" : "home-outline"}
          //     color={color}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: "Lists",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon
          //     name={focused ? "code-slash" : "code-slash-outline"}
          //     color={color}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon
          //     name={focused ? "code-slash" : "code-slash-outline"}
          //     color={color}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon
          //     name={focused ? "code-slash" : "code-slash-outline"}
          //     color={color}
          //   />
          // ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon
          //     name={focused ? "code-slash" : "code-slash-outline"}
          //     color={color}
          //   />
          // ),
        }}
      />
    </Tabs>
  );
}
