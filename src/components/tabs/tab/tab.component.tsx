import React, { useCallback, useEffect, useState } from "react";
import { PaddingProps } from "styled-system";
import StyledTab from "./tab.style";
import tagComponent from "../../../__internal__/utils/helpers/tags/tags";

export interface TabContextProps {
  setError?: (childId: string, error?: boolean | string) => void;
  setWarning?: (childId: string, warning?: boolean | string) => void;
  setInfo?: (childId: string, info?: boolean | string) => void;
}

export interface TabProps extends PaddingProps {
  title?: string;
  /** A unique ID to identify this specific tab. */
  tabId: string;
  /** @ignore @private */
  className?: string;
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
  /** Allows Tab to be a link */
  href?: string;
  /** Overrides default layout with a one defined in this prop */
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
  updateErrors?: (id: string, errors: Record<string, string | boolean>) => void;
  /** @private @ignore */
  updateWarnings?: (
    id: string,
    warnings: Record<string, string | boolean>
  ) => void;
  /** @private @ignore */
  updateInfos?: (id: string, infos: Record<string, string | boolean>) => void;
}

const TabContext = React.createContext<TabContextProps>({});

export const Tab = ({
  ariaLabelledby,
  className,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  titleProps,
  ...rest
}: TabProps) => {
  const [tabErrors, setTabErrors] = useState<Record<string, string>>({});
  const [tabWarnings, setTabWarnings] = useState<Record<string, string>>({});
  const [tabInfos, setTabInfos] = useState<Record<string, string>>({});

  const setError = useCallback((childId, error) => {
    setTabErrors((state) =>
      state[childId] !== error ? { ...state, [childId]: error } : state
    );
  }, []);

  const setWarning = useCallback((childId, warning) => {
    setTabWarnings((state) =>
      state[childId] !== warning ? { ...state, [childId]: warning } : state
    );
  }, []);

  const setInfo = useCallback((childId, info) => {
    setTabInfos((state) =>
      state[childId] !== info ? { ...state, [childId]: info } : state
    );
  }, []);

  useEffect(() => {
    if (updateErrors) {
      updateErrors(tabId, tabErrors);
    }
  }, [tabId, tabErrors, updateErrors]);

  useEffect(() => {
    if (updateWarnings) {
      updateWarnings(tabId, tabWarnings);
    }
  }, [tabId, tabWarnings, updateWarnings]);

  useEffect(() => {
    if (updateInfos) {
      updateInfos(tabId, tabInfos);
    }
  }, [tabId, tabInfos, updateInfos]);

  return (
    <TabContext.Provider value={{ setError, setWarning, setInfo }}>
      <StyledTab
        className={className}
        role={role}
        isTabSelected={isTabSelected}
        aria-labelledby={ariaLabelledby}
        position={position}
        {...tagComponent("tab", rest)}
        {...rest}
      >
        {!href && children}
      </StyledTab>
    </TabContext.Provider>
  );
};

export { TabContext };
export default Tab;
