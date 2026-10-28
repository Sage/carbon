import React from "react";
import { MarginProps } from "styled-system";
import { StyledSkeleton, StyledSkeletonPlaceholder } from "./skeleton.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

export type SkeletonShape =
  | "circle"
  | "rectangle-curved"
  | "rectangle-moderate";

export type SkeletonHeight = "h1" | "h2" | "h3" | "h4" | "paragraph" | "button";

export interface SkeletonProps extends MarginProps, TagProps {
  /** Children content to render in the component. */
  children?: React.ReactNode;
  /** Sets loading state. */
  loading?: boolean;
  /** Sets a preset or custom pixel/CSS height. Presets: h1 (38px), h2 (30px), h3 (26px), h4 (23px), paragraph (21px), button (40px). */
  height?: SkeletonHeight | (string & {});
  /** Sets the width of the Skeleton. Defaults to 100% (except circles, which match their height). */
  width?: string;
  /** The number of placeholder shapes to render. */
  lines?: number;
  /** Sets the Skeleton shape. */
  shape?: SkeletonShape;
  /** Removes the animation. Also disabled when the user prefers reduced motion. */
  disableAnimation?: boolean;
}

export const Skeleton = ({
  children,
  loading,
  lines = 1,
  height,
  width,
  shape = "rectangle-moderate",
  disableAnimation,
  ...props
}: SkeletonProps) => {
  const marginProps = filterStyledSystemMarginProps(props);
  const hasPlaceholder = loading ?? !children;

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (hasPlaceholder) {
    const placeholders = [];

    for (let i = 0; i < lines; i++) {
      placeholders.push(
        <StyledSkeletonPlaceholder
          aria-hidden="true"
          data-role="skeleton-placeholder"
          key={i}
          height={height}
          width={width}
          shape={shape}
          disableAnimation={disableAnimation || reduceMotion}
          {...props}
          {...tagComponent("skeleton", props)}
        />,
      );
    }

    return (
      <StyledSkeleton data-role="skeleton-wrapper" {...marginProps}>
        {placeholders}
      </StyledSkeleton>
    );
  }

  return (
    <StyledSkeleton data-role="skeleton-wrapper" {...marginProps}>
      {children}
    </StyledSkeleton>
  );
};

Skeleton.displayName = "Skeleton";

export default Skeleton;
