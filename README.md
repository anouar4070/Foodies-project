# 🍽️ Foodies — Next.js Meals Project

A simple and elegant meals application built with **Next.js 14**, using **better-sqlite3** as a lightweight database solution.
The project is deployed on **Vercel**.

## 🚀 Live Demo

👉 [https://foodies-project-fawn.vercel.app/meals](https://foodies-project-fawn.vercel.app/meals)

---

## 📦 Tech Stack

* **Next.js 14 (App Router)**
* **React 18**
* **better-sqlite3** (local database)
* **slugify** (friendly URL slugs)
* **xss** (input sanitization)
* **Vercel** (deployment)

---

## ⚙️ Installation & Setup
Clone the repo and install dependencies:
```bash
git clone <repo-url>
cd foodies
npm install
npm run dev
````

---

## 🗄️ Database

This project uses **better-sqlite3**.
The database file (e.g., `meals.db`) should be located in a `db/` folder at the root.

### Example query usage

```js
import sql from "better-sqlite3";
const db = sql("./db/meals.db");
```

---

## 🌐 Deployment

Deploy easily using **Vercel**:

```bash
vercel
```

Or connect your GitHub repo directly.

---

## 🛡️ Security

This project uses **xss** to sanitize user input.

```js
import xss from "xss";
const safeInput = xss(userInput);
```

---

## 📄 License

Feel free to clone or modify this project.
