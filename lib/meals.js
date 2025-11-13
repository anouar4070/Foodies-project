import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

//**** the code that reaches out the database ****
import sql from "better-sqlite3";

//db connection
const db = sql("meals.db");

export async function getMeals() {
  // just to simulate the time for fetching data
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //throw new Error('Loading meals failed');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  //i wanna remove any harmful content from those instructions
  meal.instructions = xss(meal.instructions);

  // pop the last element which is the extension
  const extension = meal.image.name.split(".").pop();
  //generate unique file name and not use the file name of the user
  //to make sure that you don't accidentally override other images with the same file name, you could consider adding some random / unique element to each filename.
  const fileName = `${meal.slug}.${extension}`;
  // write the filename to a file in the public folder
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  //the error argument is null if everything worked
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  // store the overall data in the database
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
    (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
         )
    `
  ).run(meal);
}

/**
 * run() : would be used if you are inserting data
 * all() : is used if you are fetching data and you want to get back all the rows
 * get() : if you are looking for a single row
 */
