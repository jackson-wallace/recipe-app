import { supabase } from "./supabase";
import { Recipe, RecipeIngredient, RecipeStep } from "@/types/type";

// fetch recipes for the current user
export const fetchRecipesByUserId = async (
  userId: string
): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from("recipe")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  return data;
};

// Need to make fetchRecipeByBookId for book/[id].tsx

// fetch ingredients for a given recipe
export const fetchIngredientsForRecipe = async (
  recipe_id: number
): Promise<RecipeIngredient[]> => {
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

  if (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }

  return data.map((item: any) => ({
    recipe_id: recipe_id,
    ingredient_id: item.ingredient_id,
    ingredient_name: item.ingredient.name,
    quantity: item.quantity,
    unit_name: item.unit.name,
    unit_abbreviation: item.unit.abbreviation,
  }));
};

// fetch steps for a given recipe
export const fetchStepsForRecipe = async (
  recipe_id: number
): Promise<RecipeStep[]> => {
  const { data, error } = await supabase
    .from("recipe_step")
    .select("*")
    .eq("recipe_id", recipe_id)
    .order("step_number", { ascending: true });

  if (error) {
    console.error("Error fetching steps:", error);
    return [];
  }

  return data.map((step: any) => ({
    id: step.id,
    recipe_id: step.recipe_id,
    step_number: step.step_number,
    instruction: step.instruction,
  }));
};


// Fetch recipes for a given book ID and include the author's username
export async function fetchRecipesByBookId(bookId: number): Promise<Recipe[]> {
  const { data, error } = await supabase
    .rpc('get_recipes_for_book', { book_id: bookId }); // You can create a stored procedure for this

  if (error) {
    console.error("Error fetching recipes for book:", error);
    return [];
  }

  return data; // This will be the raw data mapped to your Recipe type
}