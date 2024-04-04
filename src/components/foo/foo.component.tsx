import React from "react";
import Btn from "./foo.style";

const Foo = ({
  children,
  prop1,
}: {
  children: React.ReactNode;
  prop1?: boolean;
}) => {
  if (prop1) {
    return null;
  }
  const callback1 = () => console.log("clicked, prop1 set");
  const handleClick = () => {
    callback1();
  };

  return (
    <Btn type="button" onClick={handleClick}>
      {children}
    </Btn>
  );
};

Foo.displayName = "Foo";

export default Foo;
