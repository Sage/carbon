import React, { forwardRef, useRef } from "react";
import { DialogProps, DialogHandle } from "../dialog.component";
import { StyledSubtitle } from "../dialog.style";
import Box from "../../../../box";
import Icon from "../../../../icon";
import { IconType } from "../../../../icon/icon-type";
import Typography from "../../../../typography";
import createGuid from "../../../../../__internal__/utils/helpers/guid";

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
    (
      {
        renderHeading,
        statusIcon,
        title,
        subtitle,
        "aria-labelledby": propAriaLabelledBy,
        "aria-describedby": propAriaDescribedBy,
        "aria-label": propAriaLabel,
        ...rest
      },
      ref,
    ) => {
      const statusTitleId = useRef(createGuid()).current;
      const statusSubtitleId = useRef(createGuid()).current;

      let resolvedTitle: React.ReactNode = title;
      let passSubtitle = true;
      let ariaLabelledBy: string | undefined = propAriaLabelledBy;
      let ariaDescribedBy: string | undefined = propAriaDescribedBy;
      let ariaLabel: string | undefined = propAriaLabel;

      if (renderHeading) {
        resolvedTitle = renderHeading(title, subtitle);
        passSubtitle = false;

        // istanbul ignore next: This is a dev-time warning to encourage accessibility best practices.
        if (!propAriaLabelledBy && !propAriaLabel) {
          // eslint-disable-next-line no-console
          console.warn(
            "Dialog withDialogHeader: When using `renderHeading`, you must provide " +
              "`aria-labelledby` or `aria-label` so the dialog has an accessible name.",
          );
        }
      } else if (statusIcon) {
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
              id={statusTitleId}
            >
              {title}
            </Typography>
            {subtitle && (
              <StyledSubtitle
                data-element="subtitle"
                data-role="subtitle"
                id={statusSubtitleId}
                mb="0"
              >
                {subtitle}
              </StyledSubtitle>
            )}
          </Box>
        );
        passSubtitle = false;

        // Point aria-labelledby at the id we generated
        ariaLabelledBy = statusTitleId;
        // Also set aria-label as a belt-and-suspenders fallback
        // (aria-labelledby takes precedence when both are present,
        // but aria-label alone satisfies axe if the id ref fails)
        // istanbul ignore else
        if (typeof title === "string") {
          ariaLabel = ariaLabel ?? title;
        }
        if (subtitle) {
          ariaDescribedBy = statusSubtitleId;
        }
      }

      return (
        <WrappedDialog
          {...rest}
          title={resolvedTitle}
          {...(passSubtitle ? { subtitle } : {})}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
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
