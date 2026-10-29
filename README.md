# e-plantShopping

Paradise Nursery is a responsive houseplant shop built with React, React Router, and Redux Toolkit. Browse three collections of indoor plants, add favorites to your cart, adjust quantities, and see totals update immediately.

Use Node.js 20.19+ or 22.12+ to run the Vite development server.

## Run locally

```bash
npm install
npm run dev
```

For a production build, run `npm run build`. The generated site is written to `dist/`.

## Project files

- `src/App.jsx` and `src/App.css` — application routes, landing page, and visual design.
- `src/components/AboutUs.jsx` — company story and values.
- `src/CartSlice.jsx` — Redux cart actions and reducer.
- `src/components/ProductList.jsx` — categorized plant catalog and add-to-cart controls.
- `src/components/CartItem.jsx` — cart items, quantity controls, totals, and checkout message.

## Upload to GitHub

The project is already initialized as a local Git repository on the `main` branch, with an initial commit ready. The assignment asks for a **public repository named `e-plantShopping`**. The easiest option is GitHub Desktop:

1. Sign in to GitHub Desktop and choose **File → Add Local Repository**. Select this project folder: `C:\Users\TheMu\Downloads\mmm`.
2. Choose **Publish repository**, set the repository name to `e-plantShopping`, make sure **Keep this code private** is unchecked, then publish.

Or, create an empty public repository named `e-plantShopping` on GitHub, then run these commands from this folder (replace `YOUR-USERNAME`):

```bash
git remote add origin https://github.com/YOUR-USERNAME/e-plantShopping.git
git push -u origin main
```

After publishing, the direct file links for the assignment will use these paths:

- `README.md`
- `src/components/AboutUs.jsx`
- `src/App.css`
- `src/App.jsx`
- `src/CartSlice.jsx`
- `src/components/ProductList.jsx`
- `src/components/CartItem.jsx`
