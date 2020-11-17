import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyledTab from "./tab.style";
import tagComponent from "../../../../utils/helpers/tags/tags";

const TabContext = React.createContext({});

const Tab = ({
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
  ...rest
}) => {
  const [tabErrors, setTabErrors] = useState({});
  const [tabWarnings, setTabWarnings] = useState({});
  const [tabInfos, setTabInfos] = useState({});

  const setError = useCallback(
    (childId, hasError) => {
      if (tabErrors[childId] !== hasError) {
        setTabErrors({ ...tabErrors, [childId]: hasError });
      }
    },
    [tabErrors]
  );

  const setWarning = useCallback(
    (childId, hasWarning) => {
      if (tabWarnings[childId] !== hasWarning) {
        setTabWarnings({ ...tabWarnings, [childId]: hasWarning });
      }
    },
    [tabWarnings]
  );

  const setInfo = useCallback(
    (childId, hasInfo) => {
      if (tabInfos[childId] !== hasInfo) {
        setTabInfos({ ...tabInfos, [childId]: hasInfo });
      }
    },
    [tabInfos]
  );

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
      >
        {children}
      </StyledTab>
    </TabContext.Provider>
  );
};

Tab.propTypes = {
  title: PropTypes.string,
  /** A unique ID to identify this specific tab. */
  tabId: PropTypes.string.isRequired,
  /** @ignore @private */
  className: PropTypes.string,
  /** The child elements of Tab component. */
  children: PropTypes.node,
  /** Boolean indicating selected state of Tab. */
  isTabSelected: PropTypes.bool,
  /** The position of the Tab. */
  position: PropTypes.oneOf(["top", "left"]),
  /** @ignore @private */
  role: PropTypes.string,
  /** @ignore @private */
  ariaLabelledby: PropTypes.string,
  /** @ignore @private */
  updateErrors: PropTypes.func,
  /** @ignore @private */
  updateWarnings: PropTypes.func,
  /** @ignore @private */
  updateInfos: PropTypes.func,
  /** Message displayed when Tab has error */
  errorMessage: PropTypes.string.isRequired,
  /** Message displayed when Tab has warning */
  warningMessage: PropTypes.string.isRequired,
  /** Message displayed when Tab has warning */
  infoMessage: PropTypes.string.isRequired,
  /** Additional content to display with title */
  siblings: PropTypes.arrayOf(PropTypes.node),
  /** Position title before or after siblings */
  titlePosition: PropTypes.oneOf(["before", "after"]),
};

export { TabContext };
export default Tab;
