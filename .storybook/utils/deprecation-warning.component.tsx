import { Unstyled } from "@storybook/addon-docs/blocks";
import React from "react";

const DeprecationWarning = ({ children }: { children: React.ReactNode }) => (
  <Unstyled
    style={{
      backgroundColor: "#cb374a",
      textAlign: "center",
      color: "white",
      padding: 20,
      fontWeight: "bold",
      marginBottom: 10,
    }}
  >
    {children}
  </Unstyled>
);

export default DeprecationWarning;
