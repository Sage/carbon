import React from "react";
import PropTypes from "prop-types";
import StyledListActionButtonWrapper from "./list-action-button.style";
import useLocale from "../../../hooks/__internal__/useLocale";
import Button from "../../button";

const ListActionButton = React.forwardRef(
  ({ listActionButton, onListAction }, ref) => {
    const l = useLocale();

    function renderListActionButton() {
      if (!listActionButton || listActionButton === true) {
        return (
          <Button
            forwardRef={ref}
            onClick={onListAction}
            iconType="add"
            iconPosition="after"
          >
            {l.select.actionButtonText}
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
