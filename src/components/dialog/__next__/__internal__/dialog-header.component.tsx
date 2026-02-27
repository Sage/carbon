import React, { forwardRef } from "react";
import { DialogProps, DialogHandle } from "../dialog.component";
import { StyledSubtitle } from "../dialog.style";
import Box from "../../../box";
import Icon from "../../../icon";
import { IconType } from "../../../icon/icon-type";
import Typography from "../../../typography";

/** Allowed status variants for the dialog heading icon. */
export type DialogHeadingStatus =
  | "subtle"
  | "positive"
  | "negative"
  | "caution"
  | "info";

/** Map each status to its icon type and colour token. */
const STATUS_CONFIG: Record<
  DialogHeadingStatus,
  { iconType: IconType; color: string }
> = {
  subtle: {
    iconType: "info",
    color: "var(--colorsUtilityMajor400)",
  },
  positive: {
    iconType: "tick_circle",
    color: "var(--colorsSemanticPositive500)",
  },
  negative: {
    iconType: "error",
    color: "var(--colorsSemanticNegative500)",
  },
  caution: {
    iconType: "warning",
    color: "var(--colorsSemanticCaution500)",
  },
  info: {
    iconType: "info",
    color: "var(--colorsSemanticInfo500)",
  },
};

// Define the extra props the HOC injects
interface WithCustomHeadingProps {
  /** Custom heading renderer — receives the original title and subtitle */
  renderHeading?: (
    title: React.ReactNode,
    subtitle: React.ReactNode,
  ) => React.ReactNode;
  /** Renders a status icon to the left of the title */
  statusIcon?: DialogHeadingStatus;
}

type EnhancedDialogProps = Omit<DialogProps, "title" | "subtitle"> &
  WithCustomHeadingProps & {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
  };

function withDialogHeader(
  WrappedDialog: React.ForwardRefExoticComponent<
    DialogProps & React.RefAttributes<DialogHandle>
  >,
) {
  const Enhanced = forwardRef<DialogHandle, EnhancedDialogProps>(
    ({ renderHeading, statusIcon, title, subtitle, ...rest }, ref) => {
      let resolvedTitle: React.ReactNode = title;
      let passSubtitle = true;

      if (renderHeading) {
        // If a custom renderer is provided, use it to build the title node.
        // Subtitle is already composed inside the rendered output.
        resolvedTitle = renderHeading(title, subtitle);
        passSubtitle = false;
      } else if (statusIcon) {
        // Build a status-icon heading: icon + title inline, subtitle below
        const { iconType, color } = STATUS_CONFIG[statusIcon];

        resolvedTitle = (
          <Box
            data-role="status-heading"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
          >
            <Icon
              type={iconType}
              color={color}
              fontSize="medium"
              aria-hidden={true}
              ml="-4px"
            />
            <Typography
              variant="h1"
              ml="var(--global-space-comp-L, 16px)"
              data-element="dialog-title"
            >
              {title}
            </Typography>
            {subtitle && (
              <StyledSubtitle
                data-element="subtitle"
                data-role="subtitle"
                mb="0"
              >
                {subtitle}
              </StyledSubtitle>
            )}
          </Box>
        );
        passSubtitle = false;
      }

      return (
        <WrappedDialog
          {...rest}
          title={resolvedTitle}
          {...(passSubtitle ? { subtitle } : {})}
          ref={ref}
        />
      );
    },
  );

  Enhanced.displayName = `withDialogHeader(${
    WrappedDialog.displayName || WrappedDialog.name || "Component"
  })`;

  return Enhanced;
}

export default withDialogHeader;
export type { EnhancedDialogProps };
