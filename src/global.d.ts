import { type ModalList } from "./__internal__/modal/modal-manager";

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

declare module "react" {
  interface HTMLAttributes {
    inert?: "" | "true" | string;
  }
}
