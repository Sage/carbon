import React from "react";

type Modes = "dark" | "light" | "system";
type BusinessContexts = "small" | "large";

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

function setContext(businessContext: BusinessContexts) {
  document.body.classList.remove("small-business-context");
  document.body.classList.remove("large-business-context");

  if (businessContext === "small") {
    document.body.classList.add("small-business-context");
  }
  if (businessContext === "large") {
    document.body.classList.add("large-business-context");
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
  businessContext: {
    name: "Business context",
    description: "Set the business context",
    defaultValue: "small",
    toolbar: {
      icon: "wrench",
      items: [
        { value: "small", title: "Small business context" },
        { value: "large", title: "Large business context" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

interface StoryContextGlobals {
  mode?: Modes;
  businessContext?: BusinessContexts;
}

interface StoryContext {
  globals: StoryContextGlobals;
}

type StoryFn = () => React.ReactNode;

let lastMode: Modes | undefined;
let lastContext: BusinessContexts | undefined;

export const modeDecorator = (Story: StoryFn, context: StoryContext) => {
  const { mode = "light", businessContext = "small" } = context.globals;

  // Only apply changes if values actually changed
  if (lastMode !== mode) {
    setMode(mode);
    lastMode = mode;
  }

  if (lastContext !== businessContext) {
    setContext(businessContext);
    lastContext = businessContext;
  }

  return <Story />;
};

// mode: light dark
// context/theme: product-local, product-small, frozen
