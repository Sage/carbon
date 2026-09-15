import React from "react";

import { StyledToolbarButton } from "../toolbar.style";

import useLocale from "../../../../../../hooks/__internal__/useLocale";
import { FormattingButtonProps } from "../../../__utils__/interfaces.types";

type HyperlinkButtonProps = Pick<
  FormattingButtonProps,
  "namespace" | "isFirstButton" | "size"
> & {
  setDialogOpen: (open: boolean) => void;
};

const HyperlinkButton = ({
  isFirstButton,
  namespace,
  size = "medium",
  setDialogOpen,
}: HyperlinkButtonProps) => {
  // Get the locale to enable translations
  const locale = useLocale();

  return (
    <StyledToolbarButton
      size={size}
      aria-label={locale.textEditor.hyperlink.buttonAria()}
      type="button"
      onClick={() => {
        setDialogOpen(true);
      }}
      onMouseDown={(e) => e.preventDefault()}
      iconType="link_on"
      variantType="tertiary"
      data-role={`${namespace}-hyperlink-button`}
      id={`${namespace}-hyperlink-button`}
      tabIndex={isFirstButton ? 0 : -1}
      className="toolbar-button"
    />
  );
};

export default HyperlinkButton;
