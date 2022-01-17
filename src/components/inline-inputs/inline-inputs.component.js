import React, { useRef } from "react";
import PropTypes from "prop-types";
import Label from "../../__internal__/label";
import StyledInlineInputs, {
  StyledContentContainer,
  StyledInlineInput,
} from "./inline-inputs.style";
import createGuid from "../../__internal__/utils/helpers/guid";

const columnWrapper = (children, gutter) => {
  let inputs = children;

  if (!Array.isArray(inputs)) {
    inputs = [children];
  }

  return inputs.map((input, index) => {
    // Input is never going to be re-ordered so we don't require a defined key
    /* eslint-disable react/no-array-index-key */
    return (
      <StyledInlineInput
        key={index}
        gutter={gutter}
        data-element="inline-input"
      >
        {input}
      </StyledInlineInput>
    );
  });
};

const InlineInputs = (props) => {
  const {
    label,
    htmlFor,
    children,
    className,
    gutter,
    inputWidth,
    labelWidth,
  } = props;

  const labelId = useRef(createGuid());

  function renderLabel() {
    if (!label) return null;

    return (
      <Label labelId={labelId.current} inline htmlFor={htmlFor}>
        {label}
      </Label>
    );
  }

  function renderChildren() {
    if (!label) return children;

    return React.Children.map(children, (child) =>
      React.cloneElement(child, { "aria-labelledby": labelId.current })
    );
  }

  return (
    <StyledInlineInputs
      gutter={gutter}
      data-component="inline-inputs"
      className={className}
      labelWidth={labelWidth}
    >
      {renderLabel()}
      <StyledContentContainer
        gutter={gutter}
        data-element="inline-inputs-container"
        inputWidth={inputWidth}
      >
        {columnWrapper(renderChildren(), gutter)}
      </StyledContentContainer>
    </StyledInlineInputs>
  );
};

// Assign props over for demo site
InlineInputs.propTypes = {
  /** Children elements */
  children: PropTypes.node,
  /** [Legacy prop] A custom class name for the component. */
  className: PropTypes.string,
  /** Defines the label text for the heading. */
  label: PropTypes.string,
  /** The id of the corresponding input control for the label */
  htmlFor: PropTypes.string,
  /** Gutter prop gets passed down to Row component if false gutter value is "none" */
  gutter: PropTypes.oneOf([
    "none",
    "extra-small",
    "small",
    "medium-small",
    "medium",
    "medium-large",
    "large",
    "extra-large",
  ]),
  /** Width of the inline inputs container in percentage */
  inputWidth: PropTypes.number,
  /** Width of a label in percentage */
  labelWidth: PropTypes.number,
};

InlineInputs.defaultProps = {
  children: null,
  className: "",
  gutter: "none",
};

export default InlineInputs;
