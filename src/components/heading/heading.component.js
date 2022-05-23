import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  StyledHeading,
  StyledHeadingIcon,
  StyledSubHeader,
  StyledHeader,
  StyledSeparator,
  StyledHeaderHelp,
  StyledHeadingTitle,
  StyledDivider,
  StyledHeaderContent,
  StyledHeadingBackButton,
  StyledHeadingPills,
} from "./heading.style";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

class Heading extends React.Component {
  get help() {
    if (!this.props.help && !this.props.helpLink) {
      return null;
    }

    return (
      <StyledHeaderHelp
        data-element="help"
        tooltipPosition="right"
        href={this.props.helpLink}
        ariaLabel={this.props.helpAriaLabel}
      >
        {this.props.help}
      </StyledHeaderHelp>
    );
  }

  get back() {
    if (!this.props.backLink) {
      return null;
    }

    let props;

    if (typeof this.props.backLink === "string") {
      props = { href: this.props.backLink };
    } else {
      props = { onClick: this.props.backLink };
    }

    return (
      <StyledHeadingBackButton
        // this event allows an element to be focusable on click event on IE
        onMouseDown={(e) => e.currentTarget.focus()}
        data-element="back"
        {...props}
      >
        <StyledHeadingIcon type="chevron_left" divider={this.props.divider} />
      </StyledHeadingBackButton>
    );
  }

  get subheader() {
    if (!this.props.subheader) {
      return null;
    }

    return (
      <StyledSubHeader
        data-element="subtitle"
        id={this.props.subtitleId}
        hasBackLink={!!this.props.backLink}
        hasSeparator={this.props.separator}
      >
        {this.props.subheader}
      </StyledSubHeader>
    );
  }

  get separator() {
    return this.props.separator ? <StyledSeparator /> : null;
  }

  get divider() {
    return this.props.divider ? <StyledDivider data-element="divider" /> : null;
  }

  get pills() {
    return this.props.pills ? (
      <StyledHeadingPills data-element="pills">
        {this.props.pills}
      </StyledHeadingPills>
    ) : null;
  }

  render() {
    if (!this.props.title) {
      return null;
    }

    const marginProps = filterStyledSystemMarginProps(this.props);

    return (
      <StyledHeading {...tagComponent("heading", this.props)} {...marginProps}>
        <StyledHeader
          data-element="header-container"
          divider={this.props.divider}
          subheader={this.props.subheader}
          hasBackLink={!!this.props.backLink}
        >
          {this.back}
          <StyledHeaderContent>
            <StyledHeadingTitle
              withMargin={this.props.pills || this.props.help}
              variant="h1"
              data-element="title"
              id={this.props.titleId}
            >
              {this.props.title}
            </StyledHeadingTitle>
            {this.help}
            {this.pills}
          </StyledHeaderContent>
          {this.separator}
          {this.subheader}
        </StyledHeader>
        {this.divider}
        {this.props.children}
      </StyledHeading>
    );
  }
}

Heading.propTypes = {
  ...marginPropTypes,
  /**
   * Children elements
   */
  children: PropTypes.node,

  /**
   * Defines the title for the heading.
   */
  title: PropTypes.node,

  /**
   * Defines the title id for the heading.
   */
  titleId: PropTypes.string,

  /**
   * Defines the subheader for the heading.
   */
  subheader: PropTypes.node,

  /**
   * Defines the subtitle id for the heading.
   */
  subtitleId: PropTypes.string,

  /**
   * Defines the help text for the heading.
   */
  help: PropTypes.string,

  /**
   * Defines the help link for the heading.
   */
  helpLink: PropTypes.string,

  /**
   * Defines the a href for the back link.
   */
  backLink: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * Adds a divider below the heading and the content.
   */
  divider: PropTypes.bool,

  /**
   * Adds a separator between the title and the subheader.
   */
  separator: PropTypes.bool,

  /**
   * Pills that will be added after the title.
   */
  pills: PropTypes.node,

  /**
   * Aria label for rendered help component
   */
  helpAriaLabel: PropTypes.string,
};

Heading.defaultProps = {
  divider: true,
  separator: false,
};

export default Heading;
