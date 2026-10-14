import React from "react";
import { MarginProps } from "styled-system";
import { StyledPreview, StyledPreviewPlaceholder } from "./preview.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

export type SkeletonShape =
  | "circle"
  | "rectangle-curved"
  | "rectangle-moderate"
  /** @deprecated Use `rectangle-moderate` instead. */
  | "rectangle"
  /** @deprecated Use `rectangle-curved` instead. */
  | "rectangle-round"
  /** @deprecated Use `rectangle-moderate` instead. */
  | "text";

/** @deprecated Use `SkeletonShape` instead. */
export type Shapes = SkeletonShape;

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
  /** Sets the Skeleton shape. Legacy values remain supported for Preview compatibility. */
  shape?: SkeletonShape;
  /** Removes the animation. Also disabled when the user prefers reduced motion. */
  disableAnimation?: boolean;
}

/** @deprecated Use `Skeleton` instead. */
export type PreviewProps = SkeletonProps;

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
        <StyledPreviewPlaceholder
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
      <StyledPreview data-role="skeleton-wrapper" {...marginProps}>
        {placeholders}
      </StyledPreview>
    );
  }

  return (
    <StyledPreview data-role="skeleton-wrapper" {...marginProps}>
      {children}
    </StyledPreview>
  );
};

Skeleton.displayName = "Skeleton";

/** @deprecated Use `Skeleton` instead. */
export const Preview = Skeleton;

export default Skeleton;
