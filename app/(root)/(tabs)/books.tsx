import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { Recipe, RecipeIngredient, RecipeStep } from "@/types/type"; 
import { fetchRecipes, fetchIngredientsForRecipe, fetchStepsForRecipe } from "@/utils/recipe-service";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";


export default function BooksTab() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<{ [key: string]: RecipeIngredient[] }>({});
  const [steps, setSteps] = useState<{ [key: string]: RecipeStep[] }>({});
  const [loading, setLoading] = useState(true);

  const loadRecipes = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();   
    if (!user) {
      setLoading(false);
      return;
    }

    const recipeData = await fetchRecipes(user.id);

    setRecipes(recipeData);
    recipeData.forEach(async (recipe: Recipe) => {
      const recipeIngredients = await fetchIngredientsForRecipe(recipe.id);
      const recipeSteps = await fetchStepsForRecipe(recipe.id);

      setIngredients((prev) => ({ ...prev, [recipe.id]: recipeIngredients }));
      setSteps((prev) => ({ ...prev, [recipe.id]: recipeSteps }));
    });

    setLoading(false);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-base-100 px-4">
        <ActivityIndicator size="large" color="#000000" />
        <Text>Loading recipes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex h-full items-center justify-start bg-base-100 px-4">
      <View className="flex flex-row w-full items-center justify-between">
        <Text className="text-2xl font-Bold mt-1 text-base-content">
          Books
        </Text>
        <View className="w-14 flex flex-row justify-end">
            <FontAwesomeIcon icon={faPenToSquare} size={24} color="#282425" />
        </View>
      </View>
      <ScrollView>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <View key={recipe.id} className="mb-4">
              <Text className="text-xl font-bold">{recipe.name}</Text>
              <Text className="text-base">Servings: {recipe.servings}</Text>
              <Text className="text-sm text-gray-500">Preparation Time: {recipe.preparation_time}</Text>

              {/* Render ingredients for this recipe */}
              <View className="mt-4">
                <Text className="text-lg font-bold">Ingredients</Text>
                {ingredients[recipe.id]?.length > 0 ? (
                  ingredients[recipe.id].map((ingredient, index) => (
                    <View key={index} className="mb-2">
                      <Text>{ingredient.quantity} {ingredient.unit_abbreviation} {ingredient.ingredient_name}</Text> 
                    </View>
                  ))
                ) : (
                  <Text>No ingredients found</Text>
                )}
              </View>

              {/* Render steps for this recipe */}
              <View className="mt-4">
                <Text className="text-lg font-bold">Steps</Text>
                {steps[recipe.id]?.length > 0 ? (
                  steps[recipe.id].map((step, index) => (
                    <View key={step.id} className="mb-2">
                      <Text>{step.step_number}. {step.instruction}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No steps found</Text>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text>No recipes found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
