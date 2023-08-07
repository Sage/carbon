import React from "react";
import { MarginProps } from "styled-system";
import Heading, { HeadingType } from "../heading";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";

import {
  StyledSettingsRow,
  StyledSettingsRowHeader,
  StyledSettingsRowInput,
} from "./settings-row.style";

export interface SettingsRowProps extends MarginProps {
  /**  A title for this group of settings. */
  title?: string;
  /** Defines the HTML heading element of the `title` within the component. */
  headingType?: HeadingType;
  /** Content to be rendered inside the component. */
  children?: React.ReactNode;
  /**  A string or JSX object that provides a short description about the group of settings. */
  description?: React.ReactNode;
  /** Shows a divider below the component. */
  divider?: boolean;
  /**  The CSS classes to apply to the component. */
  className?: string;
}

export const SettingsRow = ({
  title,
  headingType = "h3",
  children,
  description,
  divider = true,
  className,
  ...rest
}: SettingsRowProps) => {
  const heading = () => {
    if (!title) return null;

    return (
      <Heading
        headingType={headingType}
        title={title}
        subheader={description}
        separator={description !== undefined}
        divider={false}
      />
    );
  };

  return (
    <StyledSettingsRow
      className={className}
      hasDivider={divider}
      {...tagComponent("settings-row", rest)}
      m={0}
      {...filterStyledSystemMarginProps(rest)}
    >
      <StyledSettingsRowHeader>{heading()}</StyledSettingsRowHeader>
      <StyledSettingsRowInput>{children}</StyledSettingsRowInput>
    </StyledSettingsRow>
  );
};

SettingsRow.displayName = "SettingsRow";

export default SettingsRow;
