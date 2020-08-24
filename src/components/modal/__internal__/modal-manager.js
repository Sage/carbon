class ModalManagerInstance {
  #modalList = [];

  addModal = (modal) => {
    this.#modalList.push(modal);
  };

  isTopmost(modal) {
    if (!modal || !this.#modalList.length) {
      return false;
    }

    return this.#modalList.indexOf(modal) === this.#modalList.length - 1;
  }

  removeModal(modal) {
    const modalIndex = this.#modalList.indexOf(modal);

    if (modalIndex === -1) {
      return;
    }

    this.#modalList.splice(modalIndex, 1);
  }

  clearList() {
    this.#modalList = [];
  }
}

const ModalManager = new ModalManagerInstance();

export default ModalManager;
