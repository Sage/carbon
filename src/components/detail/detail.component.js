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

class Detail extends React.Component {
  /**
   * Returns the markup for the icon if one if specified.
   *
   * @method icon
   * @return {Object} JSX
   */
  icon = () => {
    if (!this.props.icon) {
      return null;
    }

    return <StyledDetailIcon type={this.props.icon} data-element="icon" />;
  };

  /**
   * Returns the markup for the footnote if one if specified.
   *
   * @method footnote
   * @return {Object} JSX
   */
  footnote = () => {
    if (!this.props.footnote) {
      return null;
    }

    return (
      <StyledDetailFootnote data-element="footnote" hasIcon={this.props.icon}>
        {this.props.footnote}
      </StyledDetailFootnote>
    );
  };

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    const marginProps = filterStyledSystemMarginProps(this.props);

    return (
      <StyledDetail
        className={classNames("carbon-detail", this.props.className)}
        hasIcon={this.props.icon}
        {...tagComponent("detail", this.props)}
        {...marginProps}
      >
        {this.icon()}

        <StyledDetailContent
          data-element="detail-content"
          hasIcon={this.props.icon}
        >
          {this.props.children}
        </StyledDetailContent>

        {this.footnote()}
      </StyledDetail>
    );
  }
}

Detail.propTypes = {
  ...marginPropTypes,
  /**
   * Custom className
   */
  className: PropTypes.string,

  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
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
