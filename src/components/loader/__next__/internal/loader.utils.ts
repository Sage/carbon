import useIdPolyfill from "../../../../hooks/__internal__/useIdPolyfill";

import type { LoaderProps } from "../loader.component";

export const getAnimationTime = (
  animationTime: LoaderProps["animationTime"],
  fallback: number,
) => animationTime || fallback;

export const useGeneratedId = () => useIdPolyfill();
