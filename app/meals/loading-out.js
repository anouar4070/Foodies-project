//* *** we are not using it now, we use Suspense instead within page.js ***

import classes from "./loading.module.css";

export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching meals...</p>;
}
