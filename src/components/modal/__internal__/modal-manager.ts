type SetTriggerRefocusFlag = (boolean: boolean) => void;

type ModalList = {
  modal: HTMLElement;
  setTriggerRefocusFlag?: SetTriggerRefocusFlag;
}[];

declare global {
  interface Window {
    __CARBON_INTERNALS_MODAL_LIST?: ModalList;
    __CARBON_INTERNALS_MODAL_SETTER_LIST?: ((
      topModal: HTMLElement | null
    ) => void)[];
  }
}
class ModalManagerInstance {
  private modalList: ModalList;

  constructor() {
    // Due to possibility of multiple carbon versions using it
    // it is necessary to maintain same structure in this global variable
    if (!window.__CARBON_INTERNALS_MODAL_LIST) {
      window.__CARBON_INTERNALS_MODAL_LIST = [];
    }
    this.modalList = window.__CARBON_INTERNALS_MODAL_LIST;
  }

  private getTopModal(): Record<string, never> | ModalList[number] {
    if (!this.modalList.length) {
      return {};
    }

    return this.modalList[this.modalList.length - 1];
  }

  addModal = (
    modal: HTMLElement | null,
    setTriggerRefocusFlag?: SetTriggerRefocusFlag
  ) => {
    if (!modal) {
      return;
    }

    const {
      modal: topModal,
      setTriggerRefocusFlag: setTrapFlag,
    } = this.getTopModal();

    if (topModal && setTrapFlag) {
      setTrapFlag(false);
    }

    this.modalList.push({ modal, setTriggerRefocusFlag });
    this.callTopModalSetters();
  };

  isTopmost(modal: HTMLElement | null) {
    const { modal: topModal } = this.getTopModal();

    if (!modal || !topModal) {
      return false;
    }

    return modal === topModal;
  }

  removeModal(modal: HTMLElement | null) {
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

    if (setTriggerRefocusFlag) {
      setTriggerRefocusFlag(true);
    }
  }

  clearList() {
    window.__CARBON_INTERNALS_MODAL_LIST = [];
    this.modalList = window.__CARBON_INTERNALS_MODAL_LIST;
    this.callTopModalSetters();
  }

  callTopModalSetters() {
    if (window.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
      const topModal = this.getTopModal()?.modal || null;
      for (const setTopModal of window.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
        setTopModal(topModal);
      }
    }
  }
}

const ModalManager = new ModalManagerInstance();

export { ModalManagerInstance };

export default ModalManager;
