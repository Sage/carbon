import { ThemeObject } from "style/themes";
import { ModalList } from "./components/modal/__internal__/modal-manager";
import 'styled-components';

declare global {
  module "*.png";
  module "*.svg";
  module "*.txt";
  interface Window {
    __CARBON_INTERNALS_MODAL_LIST?: ModalList;
    __CARBON_INTERNALS_MODAL_SETTER_LIST?: ((
      topModal: HTMLElement | null,
    ) => void)[];
    __CARBON_INTERNALS_SCROLL_BLOCKERS?: {
      components: {
        [key: string]: boolean;
      };
      originalValues: string[];
      restoreValues?: (() => void) | null;
    };
  }
}

// Module augmentations should be outside the global block
declare module 'styled-components' {
  export type DefaultTheme = ThemeObject
  
  // This helps with circular references in nested css calls
  export function css(
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation;
}
