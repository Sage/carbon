import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import I18n from "i18n-js";
import { withTheme } from "styled-components";
import tagComponent from "../../utils/helpers/tags/tags";
import { DraggableContext } from "../drag-and-drop";
import Button from "../button";
import {
  ConfigurableItemsStyle,
  ConfigurableItemsWrapper,
  ConfigurableItemsButtonReset,
} from "./configurable-items.style";
import Form from "../form";
import baseTheme from "../../style/themes/base";

class ConfigurableItems extends React.Component {
  onReset = (event) => {
    event.preventDefault();
    this.props.onReset();
  };

  additionalActions = () => {
    if (!this.props.onReset) return null;

    return (
      <ConfigurableItemsButtonReset
        data-element="configurable-items-reset-button"
        as={Button}
        buttonType="tertiary"
        onClick={this.onReset}
      >
        {I18n.t("actions.reset", { defaultValue: "Reset Columns" })}
      </ConfigurableItemsButtonReset>
    );
  };

  rows = () => {
    return (
      <ConfigurableItemsWrapper data-element="configurable-items-wrapper">
        {this.props.children}
      </ConfigurableItemsWrapper>
    );
  };

  get classes() {
    return classNames(this.props.className);
  }

  render() {
    return (
      <ConfigurableItemsStyle
        className={this.classes}
        {...tagComponent("configurable-items", this.props)}
      >
        <DraggableContext onDrag={this.props.onDrag}>
          <Form
            leftSideButtons={this.additionalActions()}
            onSubmit={this.props.onSave}
            saveButton={
              <Button buttonType="primary" type="submit">
                Done
              </Button>
            }
          >
            {this.rows()}
          </Form>
        </DraggableContext>
      </ConfigurableItemsStyle>
    );
  }
}

ConfigurableItems.propTypes = {
  /** Children elements. */
  children: PropTypes.node,
  /** A custom class name for the component. */
  className: PropTypes.string,
  /** Callback triggered when an item is dragged. */
  onDrag: PropTypes.func.isRequired,
  /** Callback triggered when when the reset button is pressed. */
  onReset: PropTypes.func,
  /** Callback triggered when the form is saved. */
  onSave: PropTypes.func.isRequired,
  /** An internal prop. Helpful to detect which component should be rendered */
  theme: PropTypes.object,
};

ConfigurableItems.defaultProps = {
  theme: baseTheme,
};

export default withTheme(ConfigurableItems);
