/* eslint-disable react/prop-types */
import React from "react";
import Btn from "./foo.style";

function Foo({ children, prop1, prop2 }) {
  if (prop1) {
    return null;
  }
  const callback1 = () => console.log("clicked, prop1 set");
  const handleClick = () => {
    callback1();
  };

  return (
    <>
      {prop2 ? <input value="input" onChange={() => {}} /> : null}
      <Btn type="button" onClick={handleClick}>
        {children}
      </Btn>
    </>
  );
}

Foo.displayName = "Foo";

export default Foo;
