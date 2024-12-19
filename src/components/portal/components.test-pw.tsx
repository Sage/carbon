import React from "react";

import Portal from ".";
import Button from "../button";
import Sidebar from "../sidebar";

export default () => {
  return (
    <>
      <Portal inertOptOut>
        <Button>Test for inertOptOut</Button>
      </Portal>
      <Sidebar open>Sidebar content</Sidebar>
    </>
  );
};
