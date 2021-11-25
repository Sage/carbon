import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  StyledDetail,
  StyledDetailContent,
  StyledDetailIcon,
  StyledDetailFootnote,
} from "./detail.style";

const marginPropTypes = filterStyledSystemMarginProps(styledSystemPropTypes);

const Detail = ({ className, icon, footnote, children, ...rest }) => {
  const marginProps = filterStyledSystemMarginProps(rest);

  return (
    <StyledDetail
      className={classNames("carbon-detail", className)}
      hasIcon={icon}
      {...tagComponent("detail", rest)}
      {...marginProps}
    >
      {icon && <StyledDetailIcon type={icon} data-element="icon" />}
      <StyledDetailContent data-element="detail-content" hasIcon={icon}>
        {children}
      </StyledDetailContent>

      {footnote && (
        <StyledDetailFootnote data-element="footnote" hasIcon={icon}>
          {footnote}
        </StyledDetailFootnote>
      )}
    </StyledDetail>
  );
};

Detail.propTypes = {
  ...marginPropTypes,
  /**
   * Custom className
   */
  className: PropTypes.string,

  /**
   * <a href="https://carbon.sage.com/?path=/docs/icon--list-of-icons#list-of-icons" target="_blank">List of supported icons</a>
   *
   * The type of icon to use.
   */
  icon: PropTypes.string,

  /**
   * A small detail to display under the main content.
   */
  footnote: PropTypes.string,

  /**
   * The rendered children of the component.
   */
  children: PropTypes.node,
};

export default Detail;
