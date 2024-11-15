//**** the code that reaches out the database ****

import sql from "better-sqlite3";

//db connection
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}





/**
 * run() : would be used if you are inserting data
 * all() : is used if you are fetching data and you want to get back all the rows
 * get() : if you are looking for a single row
 */
