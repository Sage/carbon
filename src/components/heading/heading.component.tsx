import React from "react";
import { MarginProps } from "styled-system";
import { useTheme } from "styled-components";

import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
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
  styledHeadingBackButton,
  StyledHeadingPills,
} from "./heading.style";
import useLocale from "../../hooks/__internal__/useLocale";
import { BaseLink } from "../link/__internal__";
import addLinkStyles from "../link/link.style";
import { ThemeObject } from "../../style/themes";

export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5";
export interface HeadingProps extends MarginProps, TagProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Defines the title for the heading. */
  title?: React.ReactNode;
  /** Defines the title id for the heading. */
  titleId?: string;
  /** Defines the subheader for the heading. */
  subheader?: React.ReactNode;
  /** Defines the subtitle id for the heading. */
  subtitleId?: string;
  /** Defines the HTML heading element of the title. */
  headingType?: HeadingType;
  /** Defines the help text for the heading. */
  help?: string;
  /** Defines the help link for the heading. */
  helpLink?: string;
  /** Defines the a href for the back link. */
  backLink?:
    | string
    | ((
        ev:
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLButtonElement>
          | React.KeyboardEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLButtonElement>,
      ) => void);
  /** Adds a divider below the heading and the content. */
  divider?: boolean;
  /** Adds a separator between the title and the subheader. */
  separator?: boolean;
  /** Pills that will be added after the title. */
  pills?: React.ReactNode;
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

export const Heading = ({
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
  headingType = "h1",
  title,
  titleId,
  ...rest
}: HeadingProps) => {
  const theme = useTheme();

  const baseStyles = addLinkStyles({
    theme: theme as ThemeObject,

    hasContent: !!children,
  });

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

  const l = useLocale();
  const getBackButton = () => {
    const backButtonProps =
      typeof backLink === "string" ? { href: backLink } : { onClick: backLink };

    const styles = styledHeadingBackButton(baseStyles);

    return (
      <BaseLink
        styles={styles}
        // this event allows an element to be focusable on click event on IE
        aria-label={l.heading.backLinkAriaLabel()}
        data-element="back"
        data-role="heading-back-button"
        onMouseDown={(e) => e.currentTarget.focus({ preventScroll: true })}
        {...backButtonProps}
      >
        <StyledHeadingIcon type="chevron_left" />
      </BaseLink>
    );
  };

  const getSubheader = () => {
    return (
      <StyledSubHeader
        data-element="subtitle"
        data-role="subtitle"
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
      <StyledHeadingPills
        data-element="pills"
        data-role="heading-pills-container"
      >
        {pills}
      </StyledHeadingPills>
    );
  };

  const marginProps = filterStyledSystemMarginProps(rest);

  return title ? (
    <StyledHeading {...tagComponent("heading", rest)} {...marginProps}>
      <StyledHeader
        data-element="header-container"
        divider={divider}
        subheader={!!subheader}
        hasBackLink={!!backLink}
      >
        {backLink && getBackButton()}
        <StyledHeaderContent>
          <StyledHeadingTitle
            withMargin={!!pills || !!help}
            variant={headingType}
            data-element="title"
            id={titleId}
          >
            {title}
          </StyledHeadingTitle>
          {(help || helpLink) && getHelp()}
          {pills && getPills()}
        </StyledHeaderContent>
        {separator && <StyledSeparator data-role="heading-separator" />}
        {subheader && getSubheader()}
      </StyledHeader>
      {divider && (
        <StyledDivider data-element="divider" data-role="heading-divider" />
      )}
      {children}
    </StyledHeading>
  ) : null;
};

export default Heading;
