'use server';


import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(formData) {
  //'use server'; //this creates a so-called Server Action, which is a function that's guaranteed to execute on the server, and only there.

  const meal = {
    title: formData.get('title'),
    summary : formData.get('summary'),
    instructions : formData.get('instructions'),
    image : formData.get('image'),
    creator : formData.get('name'),
    creator_email : formData.get('email'),
  }
 
 await saveMeal(meal);
 redirect('/meals');
}