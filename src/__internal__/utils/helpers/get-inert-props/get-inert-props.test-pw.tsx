import React, { useState } from "react";
import getInertProps from ".";

const InertExample = () => {
  const [inert, setInert] = useState(true);
  return (
    <>
      <button onClick={() => setInert((value) => !value)}>Toggle inert</button>
      <div {...getInertProps(inert)}>
        <button>Guarded action</button>
      </div>
      <button>After</button>
    </>
  );
};

export default InertExample;
