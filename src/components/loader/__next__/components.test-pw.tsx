import React, { useState } from "react";

import Loader from ".";

const MotionToggle = () => {
  const [hasMotion, setHasMotion] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setHasMotion(false)}>
        Disable motion
      </button>
      <Loader loaderType="star" hasMotion={hasMotion} showLabel={false} />
    </>
  );
};

export default MotionToggle;
