import React from "react";
import { useDragItem } from "../..";

export type DemoProps = Parameters<typeof useDragItem>[0];

export const Demo = (props: DemoProps) => {
  const output = useDragItem(props);
  return (
    <pre>
      <code>{JSON.stringify(output)}</code>
    </pre>
  );
};

export default Demo;
