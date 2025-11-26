import { getWindow } from "../dom/globals";

type SetTriggerRefocusFlag = (boolean: boolean) => void;

export type ModalList = {
  modal: HTMLElement;
  setTriggerRefocusFlag?: SetTriggerRefocusFlag;
  topModalOverride?: boolean;
}[];

class ModalManagerInstance {
  private modalList: ModalList;

  constructor() {
    const safeWindow = getWindow();
    if (!safeWindow) {
      this.modalList = [];
      return;
    }
    // Due to possibility of multiple carbon versions using it
    // it is necessary to maintain same structure in this global variable
    if (!safeWindow.__CARBON_INTERNALS_MODAL_LIST) {
      safeWindow.__CARBON_INTERNALS_MODAL_LIST = [];
    }
    this.modalList = safeWindow.__CARBON_INTERNALS_MODAL_LIST;
  }

  private getTopModal(): Record<string, never> | ModalList[number] {
    if (!this.modalList.length) {
      return {};
    }

    const topModalOverride = this.modalList
      .slice()
      .reverse()
      .find((modal) => modal.topModalOverride);

    return topModalOverride || this.modalList[this.modalList.length - 1];
  }

  addModal = (
    modal: HTMLElement | null,
    setTriggerRefocusFlag?: SetTriggerRefocusFlag,
    topModalOverride?: boolean,
  ) => {
    if (!modal) {
      return;
    }

    const {
      modal: topModal,
      setTriggerRefocusFlag: setTrapFlag,
      topModalOverride: topOverridden,
    } = this.getTopModal();

    if (!topOverridden && topModal && setTrapFlag) {
      setTrapFlag(false);
    }

    this.modalList.push({ modal, setTriggerRefocusFlag, topModalOverride });

    this.callTopModalSetters();
  };

  isTopmost(modal: HTMLElement | null) {
    const { modal: topModal } = this.getTopModal();

    if (!modal || !topModal) {
      return false;
    }

    return modal === topModal;
  }

  removeModal(modal: HTMLElement | null, triggerRefocusOnClose = true) {
    const modalIndex = this.modalList.findIndex(({ modal: m }) => m === modal);

    if (modalIndex === -1) {
      return;
    }

    this.modalList.splice(modalIndex, 1);
    this.callTopModalSetters();

    if (!this.modalList.length) {
      return;
    }

    const { setTriggerRefocusFlag } = this.getTopModal();

    if (setTriggerRefocusFlag && triggerRefocusOnClose) {
      setTriggerRefocusFlag(true);
    }
  }

  clearList() {
    const safeWindow = getWindow();
    const cleared: ModalList = [];
    if (safeWindow) {
      safeWindow.__CARBON_INTERNALS_MODAL_LIST = cleared;
    }
    this.modalList = cleared;
    this.callTopModalSetters();
  }

  callTopModalSetters() {
    const safeWindow = getWindow();
    if (safeWindow?.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
      const topModal = this.getTopModal()?.modal || null;
      for (const setTopModal of safeWindow.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
        setTopModal(topModal);
      }
    }
  }
}

const ModalManager = new ModalManagerInstance();

export { ModalManagerInstance };

export default ModalManager;
