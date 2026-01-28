import React from "react";
import { PaddingProps } from "styled-system";
import { TagProps } from "../../../__internal__/utils/helpers/tags/tags";
import { Tab as NextTab } from "../__next__/tabs.component";
import type { TabProps as NextTabProps } from "../__next__";
import Logger from "../../../__internal__/utils/logger";

export type TabsHandle = {
  /** Programmatically focus on a specific tab.
   * @param tabId - The ID of the tab to focus. Must match the `tabId` prop of the target `Tab` component.
   */
  focusTab: (tabId: string) => void;
} | null;

export interface TabProps
  extends PaddingProps,
    TagProps,
    Partial<NextTabProps> {
  /**
   * The title of the Tab.
   * @deprecated Support will be removed in a future release, it is recommended to use `label` prop instead.
   */
  title?: string;
  /**
   * A unique ID to identify this specific tab.
   * @deprecated Support will be removed in a future release, it is recommended to use `id` instead.
   * */
  tabId?: string;
  /** The child elements of Tab component. */
  children?: React.ReactNode;
  /** @ignore @private Boolean indicating selected state of Tab. */
  isTabSelected?: boolean;
  /**
   * The position of the Tab.
   * @deprecated Support will be removed in a future release.
   * */
  position?: "top" | "left";
  /**
   * @deprecated
   * Message displayed when Tab has error
   * The legacy validation pattern is being removed in a future release.
   * */
  errorMessage?: string;
  /**
   * @deprecated
   * Message displayed when Tab has warning
   * The legacy validation pattern is being removed in a future release.
   * */
  warningMessage?: string;
  /**
   * @deprecated
   * Message displayed when Tab has info
   * The legacy validation pattern is being removed in a future release.
   * */
  infoMessage?: string;
  /**
   * Additional content to display with title
   * @deprecated Support for siblings will be removed in a future release.
   * It is recommended to use `label` prop to compose what you want.
   * */
  siblings?: React.ReactNode;
  /**
   * Position title before or after siblings
   * @deprecated Support for titlePosition will be removed in a future release.
   * It is recommended to use `label` prop to compose what you want.
   * */
  titlePosition?: "before" | "after";
  /**
   * Allows Tab to be a link
   * @deprecated Using tabs as links is inaccessible; this prop will be deprecated in a future release.
   * */
  href?: string;
  /**
   * Overrides default layout with a one defined in this prop
   * @deprecated Support for customLayout will be removed in a future release, it is recommended to use the `label` prop instead.
   * */
  customLayout?: React.ReactNode;
  /** Additional props to be passed to the Tab's corresponding title. */
  titleProps?: {
    /** Identifier used for testing purposes */
    "data-role"?: string;
  };
  /** @private @ignore */
  role?: string;
  /** @private @ignore */
  ariaLabelledby?: string;
  /** @private @ignore @internal */
  validationStatusOverride?: {
    error?: boolean;
    warning?: boolean;
    info?: boolean;
  };
  /** @private @ignore @internal */
  headerWidth?: string;
}

let tabLegacyWarned = false;

export const Tab = ({
  tabId,
  title,
  customLayout,
  siblings,
  titlePosition,
  validationStatusOverride,
  errorMessage,
  warningMessage,
  infoMessage,
  titleProps,
  controls,
  id,
  label,
  error,
  warning,
  info,
  ...rest
}: TabProps) => {
  if (!tabLegacyWarned) {
    Logger.warn(
      "Warning: This version of the `Tab` component is intended to help migration to the `next` version and will be removed in a future release.",
    );
    tabLegacyWarned = true;
  }

  let labelContent: React.ReactNode = "";

  if (label) {
    labelContent = label;
  } else if (customLayout) {
    labelContent = customLayout;
  } else {
    labelContent = title;
    if (siblings) {
      const titleNode = <span>{label || title}</span>;
      labelContent =
        titlePosition === "after" ? (
          <>
            {siblings}
            {titleNode}
          </>
        ) : (
          <>
            {titleNode}
            {siblings}
          </>
        );
    }
  }

  const {
    error: errorOverride,
    warning: warningOverride,
    info: infoOverride,
  } = validationStatusOverride || {};
  const idToUse = id || tabId;

  /* istanbul ignore if */
  if (!idToUse) {
    return null;
  }

  return (
    <NextTab
      id={idToUse}
      controls={controls || `${idToUse}-panel`}
      label={labelContent}
      error={error || errorOverride}
      warning={warning || warningOverride}
      info={info || infoOverride}
      hasCustomLayout={!!customLayout}
      data-role={titleProps?.["data-role"]}
      {...rest}
    />
  );
};
Tab.displayName = "Tab";

export default Tab;
