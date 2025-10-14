import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import type {
  TabsContextProps,
  TabContextProps,
} from "../../../components/tabs/__next__/tabs.types";
import { TabsContext } from "../../../components/tabs/__next__/tabs.context";
import { TabContext } from "../../../components/tabs/__next__/tab.context";

const useRegisterValidationToTabs = (
  error: boolean,
  warning: boolean,
  uniqueId: string,
) => {
  const isMounted = useRef(false);

  const { setErrors, setWarnings } = useContext<TabsContextProps>(TabsContext);
  const { tabId } = useContext<TabContextProps>(TabContext);

  useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    /* istanbul ignore else */
    if (setErrors) {
      setErrors(uniqueId, tabId || "", !!error);
    }
    /* istanbul ignore else */
    if (setWarnings) {
      setWarnings(uniqueId, tabId || "", !!warning);
    }

    return () => {
      if (isMounted.current) return;

      /* istanbul ignore else */
      if (setErrors) {
        setErrors(uniqueId, tabId || "", false);
      }
      /* istanbul ignore else */
      if (setWarnings) {
        setWarnings(uniqueId, tabId || "", false);
      }
    };
  }, [error, warning, setErrors, setWarnings, uniqueId, tabId]);
};

export default useRegisterValidationToTabs;
