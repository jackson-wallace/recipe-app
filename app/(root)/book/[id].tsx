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
import { fetchBookById } from "@/utils/book-service";
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
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookById(bookId).then((book: Book) => {
      setBook(book);
      setLoading(false);
    });
  }, [id]);

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

  const testRecipes: Recipe[] = [
    {
      id: 1,
      user_id: 101,
      name: "Spaghetti Bolognese",
      preparation_time: 45,
      servings: 4,
      created_at: "2024-09-16T12:00:00Z",
      image_url: "https://example.com/spaghetti-bolognese.jpg",
    },
    {
      id: 2,
      user_id: 102,
      name: "Chicken Curry",
      preparation_time: 60,
      servings: 6,
      created_at: "2024-09-14T14:30:00Z",
      image_url: "https://example.com/chicken-curry.jpg",
    },
    {
      id: 3,
      user_id: 103,
      name: "Vegan Tacos",
      preparation_time: 30,
      servings: 3,
      created_at: "2024-09-10T10:00:00Z",
      image_url: "https://example.com/vegan-tacos.jpg",
    },
    {
      id: 4,
      user_id: 104,
      name: "Blueberry Pancakes",
      preparation_time: 20,
      servings: 2,
      created_at: "2024-09-12T08:45:00Z",
      image_url: "https://example.com/blueberry-pancakes.jpg",
    },
    {
      id: 5,
      user_id: 105,
      name: "Caesar Salad",
      preparation_time: 15,
      servings: 2,
      created_at: "2024-09-15T13:15:00Z",
      image_url: "https://example.com/caesar-salad.jpg",
    },
    {
      id: 6,
      user_id: 106,
      name: "Beef Stir-Fry",
      preparation_time: 25,
      servings: 4,
      created_at: "2024-09-13T18:00:00Z",
      image_url: "https://example.com/beef-stir-fry.jpg",
    },
    {
      id: 7,
      user_id: 107,
      name: "Margherita Pizza",
      preparation_time: 90,
      servings: 8,
      created_at: "2024-09-09T17:00:00Z",
      image_url: "https://example.com/margherita-pizza.jpg",
    },
    {
      id: 8,
      user_id: 108,
      name: "Avocado Toast",
      preparation_time: 10,
      servings: 1,
      created_at: "2024-09-11T07:30:00Z",
      image_url: "https://example.com/avocado-toast.jpg",
    },
    {
      id: 9,
      user_id: 109,
      name: "Grilled Salmon",
      preparation_time: 35,
      servings: 3,
      created_at: "2024-09-08T19:15:00Z",
      image_url: "https://example.com/grilled-salmon.jpg",
    },
    {
      id: 10,
      user_id: 110,
      name: "Chocolate Cake",
      preparation_time: 120,
      servings: 10,
      created_at: "2024-09-07T15:45:00Z",
      image_url: "https://example.com/chocolate-cake.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex h-full items-center justify-start bg-base-100 px-4 relative pt-4">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-20 left-4 z-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} size={20} />
      </TouchableOpacity>
      {/* Could */}
      {/* <Image
        source={{
          uri: book.image_url || "https://via.placeholder.com/250",
        }}
        style={{
          width: "60%",
          height: undefined,
          aspectRatio: 1,
          borderRadius: 10,
        }}
      /> */}
      <View className="flex flex-col w-full items-center">
        <Text className="text-3xl font-Bold">{book.name}</Text>
        <Text className="text-md opacity-50">by {book.author}</Text>
      </View>
      <ScrollView className="flex-1 flex-col w-full mt-6">
        {testRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            className="flex flex-row w-full my-2 justify-between items-center"
            // Bad practice to pass entire book object as params
            onPress={() => router.push(`/recipe/${recipe.id}` as Href)}
          >
            <View className="flex flex-row w-11/12">
              <Image
                source={{
                  uri: "https://via.placeholder.com/100",
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
                  {recipe.user_id}
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
