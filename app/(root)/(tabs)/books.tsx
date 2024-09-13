import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/utils/supabase";
import { Recipe, RecipeIngredient, RecipeStep } from "@/types/type"; 

export default function BooksTab() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState<{ [key: string]: RecipeIngredient[] }>({});
  const [steps, setSteps] = useState<{ [key: string]: RecipeStep[] }>({});
  const [loading, setLoading] = useState(true);

  // Function to fetch recipes for the current user
  const fetchRecipes = async () => {
    setLoading(true);
    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error fetching user:", userError);
      setLoading(false);
      return;
    }

   // fetch recipes for the authenticated user
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipe") // Assuming the table name is Recipe
      .select("*")
      .eq("user_id", user.id); // Fetch recipes for the authenticated user

    if (recipeError) {
      console.error("Error fetching recipes:", recipeError);
    } else {
      setRecipes(recipeData as Recipe[]);  
      // fetch ingredients and steps for each recipe
      recipeData.forEach(async (recipe: Recipe) => {
        await fetchIngredientsForRecipe(recipe.id);
        await fetchStepsForRecipe(recipe.id);
      });  
    }
    setLoading(false);
  };
  const fetchIngredientsForRecipe = async (recipe_id: number) => {
    // Fetch ingredients for the given recipe
    const { data, error } = await supabase
      .from("recipe_ingredient")
      .select(
        `
        ingredient:ingredient_id(name), 
        quantity, 
        unit:unit_id(name, abbreviation)
        `
      )
      .eq("recipe_id", recipe_id);
      console.log('Fetched ingredients:', data); // Log the response

    if (error) {
      console.error("Error fetching ingredients:", error);
    } else {
      const mappedIngredients: RecipeIngredient[] = data.map((item: any) => ({
        recipe_id: recipe_id,
        ingredient_id: item.ingredient_id,
        ingredient_name: item.ingredient.name,
        quantity: item.quantity,
        unit_name: item.unit.name,
        unit_abbreviation: item.unit.abbreviation,
      }));
      console.log('Mapped ingredients: ', mappedIngredients)
      setIngredients((prev) => ({ ...prev, [recipe_id]: mappedIngredients }));

    }
  };

  const fetchStepsForRecipe = async (recipe_id:number) => {
    const { data, error } = await supabase
        .from("recipe_step")
        .select("*")
        .eq("recipe_id", recipe_id)
        .order("step_number", { ascending: true }); // Order steps by step_number

    if (error) {
      console.error("Error fetching steps:", error);
    } else {
      const mappedSteps: RecipeStep[] = data.map((step: any) => ({
        id: step.id,
        recipe_id: step.recipe_id,
        step_number: step.step_number,
        instruction: step.instruction,
      }));

      setSteps((prev) => ({ ...prev, [recipe_id]: mappedSteps }));
    }
  }
  // Use effect to fetch the recipes on component mount
  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // Simple loading state
  }
return (
    <ScrollView>
      <View className="p-4">
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
      </View>
    </ScrollView>
  );
}