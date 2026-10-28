import React from "react";
import { MarginProps } from "styled-system";
import {
  StyledSkeleton as StyledPreview,
  StyledSkeletonPlaceholder as StyledPreviewPlaceholder,
} from "../skeleton/skeleton.style";
import type { SkeletonShape } from "../skeleton/skeleton.component";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

/** @deprecated Use `SkeletonShape` from `components/skeleton` instead. `text` and `rectangle` map to `rectangle-moderate`; `rectangle-round` maps to `rectangle-curved`. */
export type Shapes = "text" | "rectangle" | "rectangle-round" | "circle";

/** @deprecated Use `SkeletonProps` from `components/skeleton` instead. */
export interface PreviewProps extends MarginProps, TagProps {
  /** Children content to render in the component. */
  children?: React.ReactNode;
  /** Sets loading state. */
  loading?: boolean;
  /** Sets the height of the Preview. */
  height?: string;
  /** Sets the width of the Preview. */
  width?: string;
  /** The number of placeholder shapes to render. */
  lines?: number;
  /** Sets the preview's shape. */
  shape?: Shapes;
  /** Removes Preview's animation, is true when prefer reduce-motion is on. */
  disableAnimation?: boolean;
}

/** @deprecated Use `Skeleton` instead. */
export const Preview = ({
  children,
  loading,
  lines = 1,
  height,
  width,
  shape = "text",
  disableAnimation,
  ...props
}: PreviewProps) => {
  const marginProps = filterStyledSystemMarginProps(props);
  const hasPlaceholder = loading ?? !children;
  const isText = shape === "text";
  const skeletonShape: SkeletonShape =
    shape === "circle"
      ? "circle"
      : shape === "rectangle-round"
        ? "rectangle-curved"
        : "rectangle-moderate";
  const legacyHeight =
    height ||
    (isText
      ? "var(--sizing175)"
      : shape === "circle"
        ? "var(--sizing700)"
        : "var(--sizing400)");
  const legacyWidth =
    shape === "circle"
      ? legacyHeight
      : width || (isText ? "100%" : "var(--sizing1500)");
  const legacyBorderRadius =
    shape === "rectangle-round"
      ? "var(--global-radius-container-2-xl)"
      : isText || shape === "rectangle"
        ? "var(--global-radius-container-m)"
        : undefined;

  const reduceMotion = !useMediaQuery(
    "screen and (prefers-reduced-motion: no-preference)",
  );

  if (hasPlaceholder) {
    const placeholders = [];

    for (let i = 0; i < lines; i++) {
      placeholders.push(
        <StyledPreviewPlaceholder
          data-role="preview-placeholder"
          key={i}
          height={legacyHeight}
          width={legacyWidth}
          shape={skeletonShape}
          borderRadius={legacyBorderRadius}
          isLastLine={isText && lines > 1 && i === lines - 1}
          legacyAnimation
          disableAnimation={disableAnimation || reduceMotion}
          {...props}
          {...tagComponent("preview", props)}
        />,
      );
    }

    return (
      <StyledPreview data-role="preview-wrapper" {...marginProps}>
        {placeholders}
      </StyledPreview>
    );
  }

  return (
    <StyledPreview data-role="preview-wrapper" {...marginProps}>
      {children}
    </StyledPreview>
  );
};

Preview.displayName = "Preview";

export default Preview;
