import React from "react";

const DeprecationWarning = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: "red",
      textAlign: "center",
      color: "white",
      padding: 20,
      fontWeight: "bold",
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

export default DeprecationWarning;
