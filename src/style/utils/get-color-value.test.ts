import getColorValue from "./get-color-value";

const colors: string[][] = [
  ["red", "red"],
  ["rgb(0,123,100)", "rgb(0,123,100)"],
  ["hsl(0,100%,50%)", "hsl(0,100%,50%)"],
  ["#123456", "#123456"],
  ["var(--colorsYang100)", "#ffffffff"],
];

it.each(colors)(
  "for the color `%s` return the correct value `%s`",
  (color, expectedColor) => {
    expect(getColorValue(color)).toEqual(expectedColor);
  }
);
