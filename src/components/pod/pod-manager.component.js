import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import PodContext from "./pod-context";

const PodManager = ({ children }) => {
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
