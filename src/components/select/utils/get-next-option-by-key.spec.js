import React from "react";
import { mount } from "enzyme";
import { getNextOptionByKey } from "./get-next-option-by-key";
import Option from "../option/option.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";

describe("getNextOptionByKey", () => {
  let wrapper;
  let children;
  let arrayOfChildren;
  const homeKey = "Home";
  const endKey = "End";
  const upKey = "ArrowUp";
  const downKey = "ArrowDown";

  beforeEach(() => {
    wrapper = renderList();
    children = wrapper.find("ul").props().children;
    arrayOfChildren = React.Children.toArray(children);
  });

  describe("when the homeKey is passed as the first attribute", () => {
    it("then the first child should be returned", () => {
      expect(getNextOptionByKey(homeKey, arrayOfChildren)).toStrictEqual(
        arrayOfChildren[0]
      );
    });
  });

  describe("when the endKey is passed as the first attribute", () => {
    it("then the last child should be returned", () => {
      expect(getNextOptionByKey(endKey, arrayOfChildren)).toStrictEqual(
        arrayOfChildren[5]
      );
    });
  });

  describe("when the upKey is passed as the first attribute", () => {
    it("then the last child should be returned", () => {
      expect(getNextOptionByKey(upKey, arrayOfChildren, -1)).toStrictEqual(
        arrayOfChildren[5]
      );
    });

    describe("with value of one of elements passed as third attribute", () => {
      it("then the previous child before that element should be returned", () => {
        expect(getNextOptionByKey(upKey, arrayOfChildren, 2)).toStrictEqual(
          arrayOfChildren[1]
        );
      });
    });

    describe("with value of the first element passed as third attribute", () => {
      it("then the last child should be returned", () => {
        expect(getNextOptionByKey(upKey, arrayOfChildren, 0)).toStrictEqual(
          arrayOfChildren[5]
        );
      });
    });
  });

  describe("when the downKey is passed as the first attribute", () => {
    it("then the first child should be returned", () => {
      expect(getNextOptionByKey(downKey, arrayOfChildren, -1)).toStrictEqual(
        arrayOfChildren[0]
      );
    });

    describe("with value of one of elements passed as third attribute", () => {
      it("then next child after the position stated by that integer should be returned", () => {
        expect(getNextOptionByKey(downKey, arrayOfChildren, 2)).toStrictEqual(
          arrayOfChildren[3]
        );
      });
    });

    describe("with value of the last element passed as third attribute", () => {
      it("then the first child should be returned", () => {
        expect(getNextOptionByKey(downKey, arrayOfChildren, 5)).toStrictEqual(
          arrayOfChildren[0]
        );
      });
    });
  });

  describe("when a non navigation key is passed as the first attribute", () => {
    it("then undefined should be returned", () => {
      expect(getNextOptionByKey(18, arrayOfChildren)).toBe(undefined);
    });
  });

  describe("when the next child is not an option", () => {
    beforeEach(() => {
      wrapper = renderListWithHeaders();
      children = wrapper.find("ul").props().children;
      arrayOfChildren = React.Children.toArray(children);
    });

    describe("when no option selected", () => {
      it("should select the first option on down key press", () => {
        expect(getNextOptionByKey(downKey, arrayOfChildren, -1)).toStrictEqual(
          arrayOfChildren[1]
        );
      });
    });

    it("should select the next option on down key press", () => {
      expect(getNextOptionByKey(downKey, arrayOfChildren, 3)).toStrictEqual(
        arrayOfChildren[5]
      );
    });

    it("should select the next option on up key press", () => {
      expect(getNextOptionByKey(upKey, arrayOfChildren, 5)).toStrictEqual(
        arrayOfChildren[3]
      );
    });
  });
});

function renderList(renderer = mount) {
  return renderer(
    <ul>
      <Option text="amber" value="amber" />
      <Option text="blue" value="blue" />
      <Option text="white" value="white" />
      <Option text="black" value="black" />
      <Option text="purple" value="purple" />
      <Option text="brown" value="brown" />
    </ul>
  );
}

function renderListWithHeaders(renderer = mount) {
  return renderer(
    <ul>
      <OptionGroupHeader label="Heading one" />
      <Option text="amber" value="amber" />
      <Option text="blue" value="blue" />
      <Option text="white" value="white" />
      <OptionGroupHeader label="Heading two" />
      <Option text="black" value="black" />
      <Option text="purple" value="purple" />
      <Option text="brown" value="brown" />
    </ul>
  );
}
