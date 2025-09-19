import React from "react";

import { LoaderProps, LoaderVariants } from "../loader.component";
import { StyledLoaderDot } from "../loader.style";

const DotsLoader = ({
  isActive,
  isInsideButton,
  size = "medium",
  variant = "default",
}: Pick<LoaderProps, "size" | "variant" | "isActive" | "isInsideButton">) => {
  const getDotColor = (
    variant: LoaderVariants | undefined,
    fallback: string,
    color: string,
  ) => {
    if (isInsideButton && isActive) return "var(--colorsUtilityYang100)";
    return variant === "gradient" ? color : fallback;
  };

  return (
    <>
      {["#13A038", "#0092DB", "#8F49FE"].map((color) => (
        <StyledLoaderDot
          data-role="loader-square"
          key={color}
          backgroundColor={getDotColor(
            variant,
            "var(--colorsActionMajor500)",
            color,
          )}
          size={size}
        />
      ))}
    </>
  );
};

export default DotsLoader;
