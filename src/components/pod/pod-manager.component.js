import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import PodContext from "./pod-context";
import Logger from "../../utils/logger/logger";

let deprecatedWarnTriggered = false;

const PodManager = ({ children }) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`PodManager` component is deprecated and will soon be removed."
    );
  }
  const podManagerRef = useRef();
  const [heightOfTheLongestPod, setHeightOfTheLongestPod] = useState();

  useEffect(() => {
    const allHeights = [];
    const allPodNodeList = podManagerRef.current.querySelectorAll(
      `[data-component="pod"]`
    );
    const allPodsArray = Array.from(allPodNodeList);

    allPodsArray.map((el) => allHeights.push(el.scrollHeight));

    const tallerValue = Math.max(...allHeights);
    setHeightOfTheLongestPod(tallerValue);
  }, []);

  return (
    <PodContext.Provider value={{ heightOfTheLongestPod }}>
      <div ref={podManagerRef}>{children}</div>
    </PodContext.Provider>
  );
};

PodManager.propTypes = {
  children: PropTypes.node,
};

export default PodManager;
