import React from "react";

import useLocale from "../../hooks/__internal__/useLocale";
import {
  StyledBatchSelection,
  StyledWrapper,
  StyledContent,
  StyledHeaderWrapper,
} from "./batch-selection.style";
import Typography from "../typography";
import { Tile } from "../tile";
import Button from "../button/__next__";
import Icon from "../icon";
import Divider from "../divider";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface BatchSelectionProps extends TagProps {
  /** Content to be rendered after selected count. */
  children: React.ReactNode;
  /**
   * @deprecated Changing the color theme of this component is no longer supported.
   */
  colorTheme?: "dark" | "light" | "white" | "transparent";
  /**
   * @deprecated Disabling this component is no longer supported.
   */
  disabled?: boolean;
  /** If true, the component is hidden. */
  hidden?: boolean;
  /** Number of selected items */
  selectedCount: number;
  /** Total number of items */
  totalItems?: number;
  /** Flag to adjust layout for small screens */
  smallScreen?: boolean;
  /** Callback called when the close button is clicked. Renders the close button when provided. */
  onDismiss?: () => void;
}

export const BatchSelection = ({
  disabled,
  children,
  colorTheme,
  selectedCount,
  // TODO: Make totalItems required and remove default value
  totalItems = 0,
  hidden,
  smallScreen,
  onDismiss,
  ...rest
}: BatchSelectionProps) => {
  const l = useLocale();

  const content = (
    <StyledContent $smallScreen={smallScreen}>{children}</StyledContent>
  );

  const selectedLabel = (
    <Typography weight="medium" m={0}>
      {l.batchSelection.selected(selectedCount, totalItems)}
    </Typography>
  );

  const closeButton = onDismiss && (
    <Button
      aria-label={l.batchSelection.ariaLabels.close()}
      onClick={onDismiss}
      variantType="subtle"
      size={smallScreen ? "small" : "medium"}
    >
      <Icon type="cross" />
    </Button>
  );

  const smallScreenContent = (
    <>
      <StyledHeaderWrapper>
        {selectedLabel}
        {closeButton}
      </StyledHeaderWrapper>
      <Divider m={0} type="horizontal" />
      {content}
    </>
  );

  return (
    <StyledBatchSelection
      $hidden={hidden}
      {...tagComponent("batch-selection", rest)}
    >
      <Tile p={0}>
        <StyledWrapper $smallScreen={smallScreen}>
          {smallScreen ? (
            smallScreenContent
          ) : (
            <>
              {selectedLabel}
              {content}
              {closeButton}
            </>
          )}
        </StyledWrapper>
      </Tile>
    </StyledBatchSelection>
  );
};

export default BatchSelection;
