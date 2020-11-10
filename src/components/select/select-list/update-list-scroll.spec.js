import updateListScrollTop from "./update-list-scroll";

describe("updateListScrollTop", () => {
  describe("when called with a HTML list in the second argument", () => {
    const numOfItems = 20;
    const listHeight = 100;
    const itemHeight = 30;
    let list;

    beforeEach(() => {
      list = {
        offsetHeight: listHeight,
        children: [...Array(numOfItems).keys()].map((item, index) => {
          return { offsetHeight: itemHeight, offsetTop: index * itemHeight };
        }),
        scrollTop: 0,
      };
    });

    describe("and the index is -1", () => {
      it("should change the scrollTop property of that list to 0", () => {
        const itemIndex = -1;

        list.scrollTop = 500;
        updateListScrollTop(itemIndex, list);

        expect(list.scrollTop).toBe(0);
      });
    });

    describe("and the combined items height is less than the list height", () => {
      it("should change the scrollTop property of that list to 0", () => {
        const itemIndex = 2;

        updateListScrollTop(itemIndex, list);

        expect(list.scrollTop).toBe(0);
      });
    });

    describe("when called with a HTML list in the second argument", () => {
      it("should change the scrollTop property of that list to combined height of items below passed index", () => {
        const itemIndex = 15;
        updateListScrollTop(itemIndex, list);

        expect(list.scrollTop).toBe((itemIndex + 1) * itemHeight - listHeight);
      });
    });
  });
});
