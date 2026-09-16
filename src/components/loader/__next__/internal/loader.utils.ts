import { useRef } from "react";

import guid from "../../../../__internal__/utils/helpers/guid";

import type { LoaderProps } from "../loader.component";

export const getAnimationTime = (
  animationTime: LoaderProps["animationTime"],
  fallback: number,
) => animationTime ?? fallback;

export const useGeneratedId = () => {
  const generatedId = useRef<string>();

  if (!generatedId.current) {
    generatedId.current = guid();
  }

  return generatedId.current;
};
