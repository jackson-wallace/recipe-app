import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons/faNewspaper";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faTrophy } from "@fortawesome/free-solid-svg-icons/faTrophy";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#282425",
        tabBarInactiveTintColor: "#A8A4A5",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#EBE2CA",
          borderTopColor: "#A8A4A5",
          shadowColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faNewspaper} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: "Your Books",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faBook} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faMagnifyingGlass} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faTrophy} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
