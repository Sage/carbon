const getDOMRect = (width: number, height: number): DOMRect => ({
  width,
  height,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
});

const mockDOMRect = (
  width: number,
  height: number,
  elementIdentifier: string,
) => {
  Element.prototype.getBoundingClientRect = jest.fn(function (
    this: HTMLElement,
  ) {
    if (this.getAttribute("data-component") === elementIdentifier) {
      return getDOMRect(width, height);
    }
    return getDOMRect(0, 0);
  });
};

export default mockDOMRect;
