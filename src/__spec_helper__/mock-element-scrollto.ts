const setupScrollToMock = () => {
  // need to mock the `scrollTo` method, which is undefined in JSDOM. As we're not actually testing this behaviour, just make it
  // do nothing.
  HTMLElement.prototype.scrollTo = () => {};
};

export default setupScrollToMock;
