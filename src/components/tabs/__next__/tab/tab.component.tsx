import React, { useEffect, useState } from "react";
import tagComponent, {
  TagProps,
} from "../../../../__internal__/utils/helpers/tags";
import Logger from "../../../../__internal__/utils/logger";
import useLocale from "../../../../hooks/__internal__/useLocale";
import extractTextFromNode from "../../../../__internal__/utils/helpers/extract-text";
import Icon from "../../../icon";
import { useTabs } from "../__internal__/contexts/tabs.context";
import { TabProvider } from "../__internal__/contexts/tab.context";
import StyledTab from "./tab.style";

export interface TabProps extends TagProps {
  /** The tab panel that this tab controls */
  controls: string;
  /** The ID of the tab */
  id: string;
  /** The error state of the tab */
  error?: boolean | string;
  /** The label shown on the tab */
  label: React.ReactNode;
  /** The item shown to the left of the label */
  leftSlot?: React.ReactNode;
  /** The item shown to the right of the label */
  rightSlot?: React.ReactNode;
  /** The warning state of the tab */
  warning?: boolean | string;
  /**
   * The info state of the tab
   * @deprecated to be removed when legacy `Tabs` and `Tab` are removed
   * */
  info?: boolean | string;

  /**
   * @internal @private @ignore
   */
  hasCustomLayout?: boolean;

  /** @private @ignore @internal */
  headerWidth?: string;

  /** @private @ignore @internal */
  href?: string;
}

let unsupportedSlotConfigurationWarningTriggered = false;

export const Tab = ({
  controls,
  error = false,
  id,
  label,
  leftSlot,
  rightSlot,
  warning = false,
  info = false,
  hasCustomLayout,
  headerWidth,
  href,
  ...rest
}: TabProps) => {
  const locale = useLocale();
  const [internalError, setInternalError] = useState<boolean | string>(error);
  const [internalWarning, setInternalWarning] = useState<boolean | string>(
    warning,
  );
  const [internalInfo, setInternalInfo] = useState<boolean | string>(info);

  const {
    activeTab,
    focusIndex,
    orientation,
    setActiveTab,
    setCurrentTabId,
    setFocusIndex,
    size,
    errors,
    warnings,
    infos,
  } = useTabs();
  const selected = activeTab === id;

  useEffect(() => {
    if (selected) setCurrentTabId(id);
  }, [id, selected, setCurrentTabId]);

  if (
    (leftSlot || rightSlot) &&
    typeof label !== "string" &&
    !unsupportedSlotConfigurationWarningTriggered
  ) {
    Logger.warn(
      "[WARNING] Using `leftSlot` and/or `rightSlot` is not supported when `label` is not a string. Please use `leftSlot` and/or `rightSlot` alongside a string `label`, or use the `label` prop exclusively.",
    );
    unsupportedSlotConfigurationWarningTriggered = true;
  }

  useEffect(() => {
    if (focusIndex === id) {
      const tabElement = document.getElementById(id);
      tabElement?.focus();
      tabElement?.scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }
  }, [focusIndex, id, setCurrentTabId]);

  /** Can't be unit-tested; controlled by form tests */
  /* istanbul ignore next */
  useEffect(() => {
    let tabErrorEntries = errors[id];
    let tabWarningEntries = warnings[id];
    let tabInfoEntries = infos[id];

    if (error && !tabErrorEntries) {
      tabErrorEntries = { static: error };
    }

    if (warning && !tabWarningEntries) {
      tabWarningEntries = { static: warning };
    }

    if (info && !tabInfoEntries) {
      tabInfoEntries = { static: info };
    }

    if (!tabErrorEntries) {
      setInternalError(false);
      return;
    }
    const currentTabErrors = Object.keys(tabErrorEntries)
      .map((k) => tabErrorEntries[k])
      .filter((v) => v !== false);

    const tabHasErrors = error || !!currentTabErrors.length;
    setInternalError(tabHasErrors);

    if (!tabWarningEntries) {
      setInternalWarning(false);
      return;
    }

    const currentTabWarnings = Object.keys(tabWarningEntries)
      .map((k) => tabWarningEntries[k])
      .filter((v) => v !== false);

    const tabHasWarnings = warning || !!currentTabWarnings.length;
    setInternalWarning(tabHasWarnings);

    if (!tabInfoEntries) {
      setInternalInfo(false);
      return;
    }
    const currentTabInfos = Object.keys(tabInfoEntries)
      .map((k) => tabInfoEntries[k])
      .filter((v) => v !== false);

    const tabHasInfo = info || !!currentTabInfos.length;
    setInternalInfo(tabHasInfo);
  }, [error, id, errors, warnings, warning, infos, info]);

  const validationIcon = () => {
    const labelText = extractTextFromNode(label);

    if (internalError || internalWarning || internalInfo) {
      if (internalError) {
        return (
          <Icon
            data-role="icon-error"
            type="error"
            ariaLabel={locale.tabs.error(labelText)}
            color="negative"
          />
        );
      }

      /* istanbul ignore else */
      if (internalWarning) {
        return (
          <Icon
            data-role="icon-warning"
            type="warning"
            ariaLabel={locale.tabs.warning(labelText)}
            color="caution"
          />
        );
      }

      /* istanbul ignore else */
      if (internalInfo) {
        return (
          <Icon
            data-role="icon-info"
            type="info"
            ariaLabel={locale.tabs.info(labelText)}
            color="info"
          />
        );
      }
    }

    return null;
  };

  return (
    <TabProvider tabId={id} visible>
      <StyledTab
        activeTab={activeTab === id}
        className={activeTab === id ? "active-tab" : ""}
        aria-controls={controls}
        aria-selected={selected ? "true" : "false"}
        error={internalError}
        warning={internalWarning}
        info={internalInfo}
        id={id}
        onClick={() => {
          setActiveTab(id);
          setFocusIndex(id);
        }}
        $orientation={orientation}
        role="tab"
        $size={size}
        type={!href ? "button" : undefined}
        tabIndex={activeTab === id ? 0 : -1}
        // below props can be removed when legacy support is dropped
        $hasCustomLayout={hasCustomLayout}
        $headerWidth={headerWidth}
        {...tagComponent("tab", rest)}
        data-tabid={id}
        as={href ? "a" : undefined}
        {...(href && {
          href,
          target: "_blank",
          style: {
            textDecoration: "none",
            display: "block",
            boxSizing: "border-box",
          },
        })}
      >
        {typeof label === "string" ? (
          <span className="tab-title-content-wrapper">
            {leftSlot}
            {label}
            {rightSlot}
            {validationIcon()}
          </span>
        ) : (
          <span className="tab-title-content-wrapper">
            {label}
            {validationIcon()}
          </span>
        )}
      </StyledTab>
    </TabProvider>
  );
};

export default Tab;
