import { PaddingProps } from "styled-system";
import createStrictContext from "../../../__internal__/utils/createStrictContext";

interface TileContextType {
  isHorizontal: boolean;
  paddingPropsFromTile: PaddingProps;
}

const [TileProvider, useTileContext] = createStrictContext<TileContextType>({
  name: "TileContext",
  errorMessage:
    "Carbon Tile: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  defaultValue: {
    paddingPropsFromTile: {},
    isHorizontal: false,
  },
});

export { TileProvider, useTileContext };
