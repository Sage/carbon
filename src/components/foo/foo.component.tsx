import React from "react";
import Btn from "./foo.style";

const Foo = ({
  children,
  prop1,
}: {
  children: React.ReactNode;
  prop1?: boolean;
}) => {
  const callback1 = () => console.log("clicked, prop1 set");
  const callback2 = () => console.log("clicked, prop1 not set");
  const handleClick = () => {
    if (prop1) {
      callback1();
    } else {
      callback2();
    }
  };

  return (
    <Btn type="button" isRed={!!prop1} onClick={handleClick}>
      {children}
    </Btn>
  );
};

Foo.displayName = "Foo";

export default Foo;
