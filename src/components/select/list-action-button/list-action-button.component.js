import React from "react";
import PropTypes from "prop-types";
import I18n from "i18n-js";
import StyledListActionButtonWrapper from "./list-action-button.style";
import Button from "../../button";

const ListActionButton = React.forwardRef(
  ({ listActionButton, onListAction }, ref) => {
    const listActionButtonDefaultText = I18n.t("select.action_button_text", {
      defaultValue: "Add New Item",
    });

    function renderListActionButton() {
      if (!listActionButton || listActionButton === true) {
        return (
          <Button
            forwardRef={ref}
            onClick={onListAction}
            iconType="add"
            iconPosition="after"
          >
            {listActionButtonDefaultText}
          </Button>
        );
      }

      return React.cloneElement(listActionButton, {
        forwardRef: ref,
        onClick: onListAction,
      });
    }

    return (
      <StyledListActionButtonWrapper>
        {renderListActionButton()}
      </StyledListActionButtonWrapper>
    );
  }
);

ListActionButton.propTypes = {
  /** True for default text button or a Button Component to be rendered */
  listActionButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  /** A callback for when the Action Button is triggered */
  onListAction: PropTypes.func.isRequired,
};

export default ListActionButton;
