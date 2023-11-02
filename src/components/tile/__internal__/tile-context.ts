import { createContext } from "react";
import { PaddingProps } from "styled-system";

interface TileContextProps {
  isHorizontal?: boolean;
  paddingPropsFromTile: PaddingProps;
}

export default createContext<TileContextProps>({
  paddingPropsFromTile: {},
});
