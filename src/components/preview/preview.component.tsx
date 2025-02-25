import React from "react";
import { MarginProps } from "styled-system";
import { StyledPreview, StyledPreviewPlaceholder } from "./preview.style";
import { filterStyledSystemMarginProps } from "../../style/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";

export type Shapes = "text" | "rectangle" | "rectangle-round" | "circle";

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

  const isLastLine = (index: number) => {
    return lines > 1 && lines === index + 1;
  };

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
          height={height}
          width={width}
          isLastLine={isLastLine(i)}
          shape={shape}
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

export default Preview;
