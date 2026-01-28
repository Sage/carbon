import React, { useCallback, useEffect, useState } from "react";
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
  /** The position of the Tab. */
  position?: "top" | "left";
  /** Message displayed when Tab has error */
  errorMessage?: string;
  /** Message displayed when Tab has warning */
  warningMessage?: string;
  /** Message displayed when Tab has warning */
  infoMessage?: string;
  /** Additional content to display with title */
  siblings?: React.ReactNode;
  /** Position title before or after siblings */
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
  /** @private @ignore */
  updateErrors?: (
    id: string,
    errors: Record<string, undefined | string | boolean>,
  ) => void;
  /** @private @ignore */
  updateWarnings?: (
    id: string,
    warnings: Record<string, undefined | string | boolean>,
  ) => void;
  /** @private @ignore */
  updateInfos?: (
    id: string,
    infos: Record<string, undefined | string | boolean>,
  ) => void;
}

let deprecateHrefWarningTriggered = false;

export const Tab = ({
  ariaLabelledby,
  children,
  isTabSelected,
  position = "top",
  role = "tabpanel",
  tabId,
  updateErrors,
  updateWarnings,
  updateInfos,
  href,
  // title is destructured purely to NOT spread it as part of rest to the underlying HTML element.
  // Both this and titleProps are used as part of child.props inside Tabs component
  title,
  titleProps,
  controls,
  id,
  label,
  error,
  warning,
  info,
  ...rest
}: TabProps) => {
  if (href !== undefined && !deprecateHrefWarningTriggered) {
    Logger.deprecate(
      "The `href` prop is deprecated in the `Tab` component and will be removed in a future release.",
    );
    deprecateHrefWarningTriggered = true;
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

export default Tab;
