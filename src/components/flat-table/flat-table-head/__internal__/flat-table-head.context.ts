import React from "react";

interface FlatTableHeadContextProps {
  stickyOffsets: Record<string, number>;
}

export default React.createContext<FlatTableHeadContextProps>({
  stickyOffsets: {},
});
