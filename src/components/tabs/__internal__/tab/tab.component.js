import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import StyledTab from './tab.style';
import tagComponent from '../../../../utils/helpers/tags/tags';

const TabContext = React.createContext({});

const Tab = ({
  ariaLabelledby,
  className,
  children,
  isTabSelected,
  position = 'top',
  role = 'tabpanel',
  tabId,
  updateErrors,
  updateWarnings,
  ...rest
}) => {
  const [tabErrors, setBarErrors] = useState({});
  const [tabWarnings, setBarWarnings] = useState({});

  const setError = useCallback(
    (childId, hasError) => {
      if (tabErrors[childId] !== hasError) {
        setBarErrors({ ...tabErrors, [childId]: hasError });
      }
    },
    [tabErrors]
  );

  const setWarning = useCallback(
    (childId, hasWarning) => {
      if (tabWarnings[childId] !== hasWarning) {
        setBarWarnings({ ...tabWarnings, [childId]: hasWarning });
      }
    },
    [tabWarnings]
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

  return (
    <TabContext.Provider value={ { setError, setWarning } }>
      <StyledTab
        className={ className }
        role={ role }
        isTabSelected={ isTabSelected }
        aria-labelledby={ ariaLabelledby }
        position={ position }
        { ...tagComponent('tab', rest) }
      >
        { children }
      </StyledTab>
    </TabContext.Provider>
  );
};

Tab.propTypes = {
  /** A unique ID to identify this specific tab. */
  tabId: PropTypes.string.isRequired,
  /** @ignore */
  className: PropTypes.string,
  /** The child elements of Tab component. */
  children: PropTypes.node,
  /** Boolean indicating selected state of Tab. */
  isTabSelected: PropTypes.bool,
  /** The position of the Tab. */
  position: PropTypes.oneOf(['top', 'left']),
  /** @ignore */
  role: PropTypes.string,
  /** @ignore */
  ariaLabelledby: PropTypes.string,
  /** @ignore */
  updateErrors: PropTypes.func,
  /** @ignore */
  updateWarnings: PropTypes.func
};

export { TabContext };
export default Tab;
