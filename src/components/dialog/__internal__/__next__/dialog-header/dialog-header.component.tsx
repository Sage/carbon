import React, { forwardRef, useRef, useContext } from "react";
import { StyledSubtitle } from "../dialog.style";
import Box from "../../../../box";
import Icon, { IconColor } from "../../../../icon";
import { IconType } from "../../../../icon/icon-type";
import Typography from "../../../../typography";
import createGuid from "../../../../../__internal__/utils/helpers/guid";

/** @internal Context for passing IDs from Dialog to DialogHeader */
export const DialogHeadingStatusContext = React.createContext<{
  titleId?: string;
  subtitleId?: string;
} | null>(null);

/** Allowed status variants for the dialog heading icon. */
export type DialogHeadingStatus =
  | "subtle"
  | "positive"
  | "negative"
  | "caution"
  | "info";

const STATUS_CONFIG: Record<
  DialogHeadingStatus,
  { iconType: IconType; color: IconColor }
> = {
  subtle: {
    iconType: "info",
    color: "subtle",
  },
  positive: {
    iconType: "tick_circle",
    color: "positive",
  },
  negative: {
    iconType: "error",
    color: "negative",
  },
  caution: {
    iconType: "warning",
    color: "caution",
  },
  info: {
    iconType: "info",
    color: "info",
  },
};

export interface DialogHeadingStatusProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  status: DialogHeadingStatus;
}

const DialogHeadingStatus = forwardRef<
  HTMLDivElement,
  DialogHeadingStatusProps
>(({ title, subtitle, status }, ref) => {
  const { iconType, color } = STATUS_CONFIG[status];
  const context = useContext(DialogHeadingStatusContext);

  // Always call hooks unconditionally at the top level
  const generatedTitleId = useRef(context?.titleId || createGuid()).current;
  const generatedSubtitleId = useRef(createGuid()).current;

  // Use context IDs if available, otherwise use generated ones
  const titleId = context?.titleId || generatedTitleId;
  const subtitleId = context?.subtitleId || generatedSubtitleId;

  return (
    <Box
      ref={ref}
      data-role="status-heading"
      display="flex"
      flexWrap="wrap"
      alignItems="center"
    >
      <Icon
        type={iconType}
        color={color}
        fontSize="medium"
        aria-hidden
        ml="-4px"
      />
      <Typography
        variant="h1"
        ml="var(--global-space-comp-l)"
        data-element="dialog-title"
        id={titleId}
      >
        {title}
      </Typography>
      {subtitle && (
        <StyledSubtitle
          data-element="subtitle"
          data-role="subtitle"
          id={subtitleId}
          mb="0"
        >
          {subtitle}
        </StyledSubtitle>
      )}
    </Box>
  );
});

DialogHeadingStatus.displayName = "DialogHeadingStatus";

export default DialogHeadingStatus;
