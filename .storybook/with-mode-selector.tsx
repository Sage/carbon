import React from "react";

type Modes = "dark" | "light" | "system";
type ProductContexts = "small" | "large";

function setMode(mode: Modes) {
  document.body.classList.remove("mode-dark");
  document.body.classList.remove("mode-light");

  if (mode === "dark") {
    document.body.classList.add("mode-dark");
  }

  if (mode === "light") {
    document.body.classList.add("mode-light");
  }
}

function setProductContext(product: ProductContexts) {
  document.body.classList.remove("product-small");
  document.body.classList.remove("product-large");

  if (product === "small") {
    document.body.classList.add("product-small");
  }
  if (product === "large") {
    document.body.classList.add("product-large");
  }
}

export const globalModeTypes = {
  mode: {
    name: "Mode",
    description: "Global mode for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light mode" },
        { value: "dark", icon: "moon", title: "Dark mode" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  product: {
    name: "Product",
    description: "Set the product context",
    defaultValue: "small",
    toolbar: {
      icon: "wrench",
      items: [
        { value: "small", title: "Small product" },
        { value: "large", title: "Large product" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

interface StoryContextGlobals {
  mode?: Modes;
  product?: ProductContexts;
}

interface StoryContext {
  globals: StoryContextGlobals;
}

type StoryFn = () => React.ReactNode;

let lastMode: Modes | undefined;
let lastContext: ProductContexts | undefined;

export const modeDecorator = (Story: StoryFn, context: StoryContext) => {
  // const { mode = "light", product = "small" } = context.globals;

  // Only apply changes if values actually changed
  // if (lastMode !== mode) {
  //   setMode(mode);
  //   lastMode = mode;
  // }

  // if (lastContext !== product) {
  //   setProductContext(product);
  //   lastContext = product;
  // }

  return <Story />;
};

// mode: light dark
// context/theme: product-local, product-small, frozen
