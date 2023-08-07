import React from "react";
import { mount } from "enzyme";
import getNextChildByText from "./get-next-child-by-text";
import Option from "../option";

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

describe("getNextChildByText", () => {
  let wrapper;
  let children;
  let arrayOfChildren: React.ReactElement[];

  beforeEach(() => {
    wrapper = renderList();
    children = wrapper.find("ul").props().children;
    arrayOfChildren = React.Children.toArray(children) as React.ReactElement[];
  });

  describe("when there is only one character passed in textToMatch", () => {
    it("then the first element that has the text prop starting with that letter should be returned", () => {
      expect(getNextChildByText("a", arrayOfChildren)).toStrictEqual(
        arrayOfChildren[0]
      );
      expect(getNextChildByText("b", arrayOfChildren)).toStrictEqual(
        arrayOfChildren[1]
      );
      expect(getNextChildByText("w", arrayOfChildren)).toStrictEqual(
        arrayOfChildren[2]
      );
    });

    describe("and that character does not match the first letter in text of any element", () => {
      it("then undefined should be returned", () => {
        expect(getNextChildByText("x", arrayOfChildren)).toBe(undefined);
      });
    });
  });

  describe("when there are multiple characters passed in textToMatch", () => {
    describe("and the characters are the same", () => {
      it("then the first element that has the text prop starting with that letter should be returned", () => {
        expect(getNextChildByText("bb", arrayOfChildren)).toStrictEqual(
          arrayOfChildren[1]
        );
      });

      describe("with the previousIndex argument is set to correspond to the first match", () => {
        it("then the second element that has the text prop starting with that letter should be returned", () => {
          expect(getNextChildByText("bb", arrayOfChildren, 1)).toStrictEqual(
            arrayOfChildren[3]
          );
        });
      });

      describe("with the previousIndex argument is set to correspond to the last match", () => {
        it("then the first element that has the text prop starting with that letter should be returned", () => {
          expect(getNextChildByText("bb", arrayOfChildren, 5)).toStrictEqual(
            arrayOfChildren[1]
          );
        });
      });
    });

    describe("and the characters are different", () => {
      it("then the first element has the text prop starting with these characters should be returned", () => {
        expect(getNextChildByText("br", arrayOfChildren)).toStrictEqual(
          arrayOfChildren[5]
        );
        expect(getNextChildByText("bla", arrayOfChildren)).toStrictEqual(
          arrayOfChildren[3]
        );
      });
    });
  });
});
