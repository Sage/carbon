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

export interface DetailProps extends MarginProps, TagProps {
  /** Custom className. */
  className?: string;
  /** The type of icon to use. */
  icon?: IconType;
  /** A small detail to display under the main content. */
  footnote?: string;
  /** The rendered children of the component. */
  children?: React.ReactNode;
}

export const Detail = ({
  className,
  icon,
  footnote,
  children,
  ...rest
}: DetailProps) => (
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
      <StyledDetailFootnote data-element="footnote" hasIcon={!!icon}>
        {footnote}
      </StyledDetailFootnote>
    )}
  </StyledDetail>
);

Detail.displayName = "Detail";

export default Detail;
