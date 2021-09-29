import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import Heading from "../heading";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";

import {
  StyledSettingsRow,
  StyledSettingsRowHeader,
  StyledSettingsRowInput,
} from "./settings-row.style";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const SettingsRow = ({
  title,
  description,
  children,
  className,
  divider = true,
  ...rest
}) => {
  const heading = () => {
    if (!title) return null;

    return (
      <Heading
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

SettingsRow.propTypes = {
  ...marginPropTypes,
  /**  This component supports children. */
  children: PropTypes.node,
  /**  The CSS classes to apply to the component. */
  className: PropTypes.string,
  /**  A title for this group of settings. */
  title: PropTypes.string,
  /**  A string or JSX object that provides a short description about the group of settings. */
  description: PropTypes.node,
  /** Shows a divider below the component. */
  divider: PropTypes.bool,
};

export default SettingsRow;
