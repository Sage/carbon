import React, { useState } from "react";

import Portal from ".";
import Button from "../button";
import Sidebar from "../sidebar";

export default ({ inertOptOut }: { inertOptOut?: boolean }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setSidebarOpen(true)}>Open sidebar</Button>
      <Portal inertOptOut={inertOptOut}>
        <Button>Test for inertOptOut</Button>
      </Portal>
      <Sidebar open={sidebarOpen} onCancel={() => setSidebarOpen(false)}>
        Sidebar content
      </Sidebar>
    </>
  );
};
