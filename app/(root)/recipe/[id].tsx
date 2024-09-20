import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

export default function RecipePage() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView className="flex h-full items-center justify-start bg-base-100 px-4 relative pt-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-20 left-4"
      >
        <FontAwesomeIcon icon={faChevronLeft} size={20} />
      </TouchableOpacity>
      <Text>Recipe id: {id}</Text>
    </SafeAreaView>
  );
}
