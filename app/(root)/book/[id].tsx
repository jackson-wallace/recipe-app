import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Href, router, useLocalSearchParams } from "expo-router";
import { fetchBookById, } from "@/utils/book-service";
 import { fetchRecipesByBookId } from "@/utils/recipe-service";
import { Book, Recipe } from "@/types/type";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function BookPage() {
  const { id } = useLocalSearchParams();
  const bookId = Number(id); // Convert id to a number
  const [recipes, setRecipes] = useState<Recipe[]>([]);  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookAndRecipes() {
      setLoading(true);  
      const fetchedBook = await fetchBookById(bookId);
      setBook(fetchedBook);
      const fetchedRecipes = await fetchRecipesByBookId(bookId);
      setRecipes(fetchedRecipes);
      setLoading(false);  
    }
    loadBookAndRecipes();  
  }, [bookId]); 

  if (loading) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-base-100 px-4">
        <ActivityIndicator size="large" color="#282425" />
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-base-100 px-4">
        <Text>Oops!</Text>
        <View className="flex flex-row mt-2 items-center">
          <Text>The book you're looking for doesn't exist</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex h-full items-center justify-start bg-base-100 px-4 relative pt-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-20 left-4 z-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} size={20} />
      </TouchableOpacity>
      {/* Could */}
      <Image
        source={{
          uri: book.image_url || "https://via.placeholder.com/250",
        }}
        style={{
          width: "60%",
          height: undefined,
          aspectRatio: 1,
          borderRadius: 10,
        }}
      /> 
      <View className="flex flex-col w-full items-center">
        <Text className="text-3xl font-Bold">{book.name}</Text>
        <Text className="text-md opacity-50">by {book.author}</Text>
      </View>
      <ScrollView className="flex-1 flex-col w-full mt-6">
        {recipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            className="flex flex-row w-full my-2 justify-between items-center"
            // Bad practice to pass entire book object as params
            onPress={() => router.push(`/recipe/${recipe.id}` as Href)}
          >
            <View className="flex flex-row w-11/12">
              <Image
                source={{
                  uri: recipe.image_url || "https://via.placeholder.com/100",
                }}
                style={{
                  width: "22%",
                  height: undefined,
                  aspectRatio: 1,
                  borderRadius: 10,
                }}
              />
              <View className="flex flex-col justify-center ml-2">
                <Text className="font-bold text-md">{recipe.name}</Text>
                <Text className="text-sm opacity-50 text-base-content">
                  {recipe.author}
                  {/* TODO put recipe creaters username here instead of id */}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                size={20}
                color="#A8A4A5"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
