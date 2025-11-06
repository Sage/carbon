import React from "react";
import { MarginProps } from "styled-system";
import { IconType } from "../icon";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import {
  StyledDetail,
  StyledDetailContent,
  StyledDetailIcon,
  StyledDetailFootnote,
} from "./detail.style";

/**
 * @deprecated `Detail` has been deprecated. See the Carbon documentation for migration details.
 */
export interface DetailProps extends MarginProps, TagProps {
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** The type of icon to use. */
  icon?: IconType;
  /** A small detail to display under the main content. */
  footnote?: string;
  /** The rendered children of the component. */
  children?: React.ReactNode;
}

/**
 * @deprecated `Detail` has been deprecated. See the Carbon documentation for migration details.
 */
export const Detail = ({
  className,
  icon,
  footnote,
  children,
  ...rest
}: DetailProps) => {
  return (
    <StyledDetail
      className={`carbon-detail ${className}`}
      {...tagComponent("detail", rest)}
      {...filterStyledSystemMarginProps(rest)}
    >
      {icon && <StyledDetailIcon type={icon} data-element="icon" />}
      <StyledDetailContent data-element="detail-content" hasIcon={!!icon}>
        {children}
      </StyledDetailContent>

      {footnote && (
        <StyledDetailFootnote
          data-element="footnote"
          data-role="footnote"
          hasIcon={!!icon}
        >
          {footnote}
        </StyledDetailFootnote>
      )}
    </StyledDetail>
  );
};

Detail.displayName = "Detail";

export default Detail;
