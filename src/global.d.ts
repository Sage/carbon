import { type ModalList } from "./__internal__/modal/modal-manager";
import { type QueryEntry } from "./hooks/useMediaQuery/useMediaQuery";

declare global {
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
    __CARBON_INTERNALS_MEDIA_QUERY_CACHE?: Map<string, QueryEntry>;
  }
}
