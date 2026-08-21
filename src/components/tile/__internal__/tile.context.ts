import { PaddingProps } from "styled-system";
import createStrictContext from "../../../__internal__/utils/createStrictContext";

interface TileContextType {
  paddingPropsFromTile: PaddingProps;
  hasFooter?: boolean;
  setHasFooter: (hasFooter: boolean) => void;
  footerVariant?: "selected" | "active";
  setFooterVariant: (footerVariant: "selected" | "active" | undefined) => void;
}

const [TileProvider, useTileContext] = createStrictContext<TileContextType>({
  name: "TileContext",
  errorMessage:
    "Carbon Tile: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  defaultValue: {
    paddingPropsFromTile: {},
    hasFooter: false,
    setHasFooter: () => {},
    footerVariant: undefined,
    setFooterVariant: () => {},
  },
});

export { TileProvider, useTileContext };
