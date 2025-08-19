import React from "react";

import { FormattingButton } from "../toolbar.style";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { FormattingButtonProps } from "../../../__utils__/interfaces.types";

type HyperlinkButtonProps = Pick<
  FormattingButtonProps,
  "namespace" | "isFirstButton" | "size"
> & {
  setDialogOpen: (open: boolean) => void;
};

const HyperlinkButton = React.forwardRef<
  HTMLButtonElement,
  HyperlinkButtonProps
>(
  (
    {
      isFirstButton,
      namespace,
      size = "medium",
      setDialogOpen,
    }: HyperlinkButtonProps,
    ref,
  ) => {
    // Get the locale to enable translations
    const locale = useLocale();

    return (
      <FormattingButton
        size={size}
        aria-label={locale.textEditor.hyperlink.buttonAria()}
        onClick={() => {
          setDialogOpen(true);
        }}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) =>
          e.preventDefault()
        }
        iconType="link_on"
        buttonType={"tertiary"}
        data-role={`${namespace}-hyperlink-button`}
        id={`${namespace}-hyperlink-button`}
        tabIndex={isFirstButton ? 0 : -1}
        className="toolbar-button"
        ref={ref}
      />
    );
  },
);

export default HyperlinkButton;
