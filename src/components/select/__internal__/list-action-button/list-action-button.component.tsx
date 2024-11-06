import React from "react";
import StyledListActionButtonWrapper from "./list-action-button.style";
import useLocale from "../../../../hooks/__internal__/useLocale";
import Button from "../../../button";

export interface ListActionButtonProps {
  listActionButton?: boolean | React.ReactNode;
  onListAction?: (
    ev: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
}

const ListActionButton = React.forwardRef(
  (
    { listActionButton, onListAction }: ListActionButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const l = useLocale();

    function renderListActionButton() {
      if (!listActionButton || listActionButton === true) {
        return (
          <Button
            ref={ref}
            onClick={onListAction}
            iconType="add"
            iconPosition="after"
          >
            {l.select.actionButtonText()}
          </Button>
        );
      }

      // istanbul ignore if
      if (!React.isValidElement(listActionButton)) {
        return listActionButton;
      }

      return React.cloneElement(
        listActionButton as React.ReactElement<
          React.ComponentPropsWithRef<typeof Button>
        >,
        {
          ref,
          onClick: onListAction,
        },
      );
    }

    return (
      <StyledListActionButtonWrapper>
        {renderListActionButton()}
      </StyledListActionButtonWrapper>
    );
  },
);

ListActionButton.displayName = "ListActionButton";

export default ListActionButton;
