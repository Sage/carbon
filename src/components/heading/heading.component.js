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

const Heading = ({
  children,
  backLink,
  divider = true,
  help,
  helpAriaLabel,
  helpLink,
  pills,
  separator = false,
  subheader,
  subtitleId,
  title,
  titleId,
  ...rest
}) => {
  const getHelp = () => {
    return (
      <StyledHeaderHelp
        data-element="help"
        tooltipPosition="right"
        href={helpLink}
        ariaLabel={helpAriaLabel}
      >
        {help}
      </StyledHeaderHelp>
    );
  };

  const getBackButton = () => {
    const backButtonProps =
      typeof backLink === "string" ? { href: backLink } : { onClick: backLink };

    return (
      <StyledHeadingBackButton
        // this event allows an element to be focusable on click event on IE
        onMouseDown={(e) => e.currentTarget.focus()}
        data-element="back"
        {...backButtonProps}
      >
        <StyledHeadingIcon type="chevron_left" divider={divider} />
      </StyledHeadingBackButton>
    );
  };

  const getSubheader = () => {
    return (
      <StyledSubHeader
        data-element="subtitle"
        id={subtitleId}
        hasBackLink={!!backLink}
        hasSeparator={separator}
      >
        {subheader}
      </StyledSubHeader>
    );
  };

  const getPills = () => {
    return (
      <StyledHeadingPills data-element="pills">{pills}</StyledHeadingPills>
    );
  };

  const marginProps = filterStyledSystemMarginProps(rest);
  const dataAttributes = {
    "data-element": rest["data-element"],
    "data-role": rest["data-role"],
  };

  return title ? (
    <StyledHeading
      {...tagComponent("heading", dataAttributes)}
      {...marginProps}
    >
      <StyledHeader
        data-element="header-container"
        divider={divider}
        subheader={subheader}
        hasBackLink={!!backLink}
      >
        {backLink && getBackButton()}
        <StyledHeaderContent>
          <StyledHeadingTitle
            withMargin={pills || help}
            variant="h1"
            data-element="title"
            id={titleId}
          >
            {title}
          </StyledHeadingTitle>
          {(help || helpLink) && getHelp()}
          {pills && getPills()}
        </StyledHeaderContent>
        {separator && <StyledSeparator />}
        {subheader && getSubheader()}
      </StyledHeader>
      {divider && <StyledDivider data-element="divider" />}
      {children}
    </StyledHeading>
  ) : null;
};

Heading.propTypes = {
  ...marginPropTypes,

  /** Child elements */
  children: PropTypes.node,

  /** Defines the title for the heading. */
  title: PropTypes.node,

  /** Defines the title id for the heading. */
  titleId: PropTypes.string,

  /** Defines the subheader for the heading. */
  subheader: PropTypes.node,

  /** Defines the subtitle id for the heading. */
  subtitleId: PropTypes.string,

  /** Defines the help text for the heading. */
  help: PropTypes.string,

  /** Defines the help link for the heading. */
  helpLink: PropTypes.string,

  /** Defines the a href for the back link. */
  backLink: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /** Adds a divider below the heading and the content. */
  divider: PropTypes.bool,

  /** Adds a separator between the title and the subheader. */
  separator: PropTypes.bool,

  /** Pills that will be added after the title. */
  pills: PropTypes.node,

  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

export default Heading;
