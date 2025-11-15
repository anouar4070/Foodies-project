"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

// export async function shareMeal(formData) {
export async function shareMeal(prevState, formData) {
  //'use server'; //this creates a so-called Server Action, which is a function that's guaranteed to execute on the server, and only there.

  function isInvalidText(text) {
    return !text || text.trim() === "";
  }

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // throw new Error("Invalid input");
    // i don't use that because we are destroying all the entered inputs, it's not the better user experience
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(meal);
  //tells NextJS to revalidate the cache that belongs to a certain route path
  //Useful on production
  revalidatePath("/meals");

  redirect("/meals");
}
