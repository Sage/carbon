class ModalManagerInstance {
  #modalList = [];

  #getTopModal() {
    if (!this.#modalList.length) {
      return {};
    }

    return this.#modalList[this.#modalList.length - 1];
  }

  addModal = (modal, setTriggerRefocusFlag) => {
    const { modal: topModal, setTriggerRefocusFlag: setTrapFlag } =
      this.#getTopModal();

    if (topModal && setTrapFlag) {
      setTrapFlag(false);
    }

    this.#modalList.push({ modal, setTriggerRefocusFlag });
  };

  isTopmost(modal) {
    const { modal: topModal } = this.#getTopModal();

    if (!modal || !topModal) {
      return false;
    }

    return modal === topModal;
  }

  removeModal(modal) {
    const modalIndex = this.#modalList.findIndex(({ modal: m }) => m === modal);

    if (modalIndex === -1) {
      return;
    }

    this.#modalList.splice(modalIndex, 1);

    if (!this.#modalList.length) {
      return;
    }

    const { setTriggerRefocusFlag } = this.#getTopModal();

    if (setTriggerRefocusFlag) {
      setTriggerRefocusFlag(true);
    }
  }

  clearList() {
    this.#modalList = [];
  }
}

const ModalManager = new ModalManagerInstance();

export default ModalManager;
