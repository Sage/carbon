import React from "react";
import { useDropContainer } from "../..";

export type DemoProps = Parameters<typeof useDropContainer>[0];

export const Demo = (props: DemoProps) => {
  const output = useDropContainer(props);
  return (
    <pre>
      <code>{JSON.stringify(output)}</code>
    </pre>
  );
};

export default Demo;
