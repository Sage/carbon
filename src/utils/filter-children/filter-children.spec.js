import React from "react";
import filterChildren from ".";
import { Option } from "../../__experimental__/components/select";

const makeChildArray = (children) =>
  children.map((child) => <div text={child} />);

const optionsWithValueObject = [
  {
    value: { name: "Orange", id: "7486" },
    text: "Orange",
  },
  {
    value: { name: "Blue", id: "0815" },
    text: "Blue",
  },
  {
    value: { name: "red", id: "0120" },
    text: "Red",
  },
];
const childrenWithValueObject = optionsWithValueObject.map(
  ({ value, text }) => <Option key={text} text={text} value={value} />
);

describe("filterChildren", () => {
  describe("when required values are not given", () => {
    const runTest = ({ value, text }) => {
      const callback = jest.fn((child) => child);
      const customFilter = jest.fn();
      const children = makeChildArray([text]);
      const filter = filterChildren({ value, filter: customFilter });
      const result = filter(children, callback);

      children.forEach((child) => expect(callback).toHaveBeenCalledWith(child));
      expect(customFilter).not.toHaveBeenCalled();
      expect(result.length).toEqual(children.length);
    };

    it("returns all children when no childen have props.text", () =>
      runTest({ value: "foo" }));

    it("returns all children when no filter value is passed", () =>
      runTest({ text: "foo" }));

    it("returns children through a callback if one is passed", () => {
      const children = makeChildArray(["aaa"]);
      const filter = filterChildren();
      const result = filter(children, (child) => (
        <div className="wrapper">{child}</div>
      ));
      expect(result).toMatchSnapshot();
    });
  });

  describe("when required values are given", () => {
    it("returns the correct number of children for a custom filter that checks value length is 4", () => {
      const customFilter = (text, value) => text.length === value.length;
      const children = makeChildArray(["aaaa", "aaa", "aaaa"]);
      const filter = filterChildren({ value: "xxxx", filter: customFilter });
      expect(filter(children)).toMatchSnapshot();
    });

    it("returns all children containing the letter a when filter value is a", () => {
      const children = makeChildArray(["aaa", "bbb", "cca"]);
      const filter = filterChildren({ value: "a" });
      expect(filter(children)).toMatchSnapshot();
    });

    it("returns all children containing the letters xyz when filter value is xyz", () => {
      const children = makeChildArray(["xyz", "xy z", "xyaz", "abcxyzqwe"]);
      const filter = filterChildren({ value: "xyz" });
      expect(filter(children)).toMatchSnapshot();
    });

    it("returns children through a callback if one is passed and there is a filter value", () => {
      const children = makeChildArray(["aaa"]);
      const filter = filterChildren({ value: "a" });
      const result = filter(children, (child) => (
        <div className="wrapper">{child}</div>
      ));
      expect(result).toMatchSnapshot();
    });

    it("returns null when filter removes all children", () => {
      const children = makeChildArray(["aaa", "bbb", "ccc"]);
      const filter = filterChildren({ value: "z" });
      expect(filter(children)).toEqual(null);
    });

    it("calls the onNoResult callback if one was passed and all children are filtered", () => {
      const onNoResults = () => "no results!";
      const children = makeChildArray(["aaa", "bbb", "ccc"]);
      const filter = filterChildren({ value: "z", onNoResults });
      expect(filter(children)).toEqual("no results!");
    });

    it("calls the filter with the correct arguments", () => {
      const customFilter = jest.fn();
      const onNoResults = jest.fn();
      const filter = filterChildren({
        value: "ora",
        filter: customFilter,
        onNoResults,
      });
      filter(childrenWithValueObject);
      expect(customFilter).toBeCalledWith(
        "orange",
        "ora",
        optionsWithValueObject[0].value
      );
    });
  });
});
