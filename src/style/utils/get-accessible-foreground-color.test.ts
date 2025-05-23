import getAccessibleForegroundColor from "./get-accessible-foreground-color";

test("returns white color token when white contrast is highest, `largeText` is true and `strict` is true", () => {
  const color = getAccessibleForegroundColor("#0000FF", true, true);

  expect(color).toBe("var(--colorsUtilityYang100)");
});

test("returns white color token when white contrast is highest, `largeText` is true and `strict` is false", () => {
  const color = getAccessibleForegroundColor("#0000FF", true, false);

  expect(color).toBe("var(--colorsUtilityYang100)");
});

test("returns white color token when white contrast is highest, `largeText` is false and `strict` is true", () => {
  const color = getAccessibleForegroundColor("#0000FF", false, true);

  expect(color).toBe("var(--colorsUtilityYang100)");
});

test("returns white color token when white contrast is highest, `largeText` is false and `strict` is false", () => {
  const color = getAccessibleForegroundColor("#0000FF", false, false);

  expect(color).toBe("var(--colorsUtilityYang100)");
});

test("returns black color token when black contrast is highest, `largeText` is true and `strict` is true", () => {
  const color = getAccessibleForegroundColor("#FF0000", true, true);

  expect(color).toBe("var(--colorsUtilityYin090)");
});

test("returns black color token when black contrast is highest, `largeText` is true and `strict` is false", () => {
  const color = getAccessibleForegroundColor("#FF0000", true, false);

  expect(color).toBe("var(--colorsUtilityYin090)");
});

test("returns black color token when black contrast is highest, `largeText` is false and `strict` is true", () => {
  const color = getAccessibleForegroundColor("#FF0000", false, true);

  expect(color).toBe("var(--colorsUtilityYin090)");
});

test("returns black color token when black contrast is highest, `largeText` is false and `strict` is false", () => {
  const color = getAccessibleForegroundColor("#FF0000", false, false);

  expect(color).toBe("var(--colorsUtilityYin090)");
});
