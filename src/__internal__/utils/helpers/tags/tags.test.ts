import tagComponent from "./tags";

test("tagProps object should only return a data-component tag populated with the component name, when no additional tag props are set", () => {
  const tag = tagComponent("my-component", {});

  expect(tag).toEqual({
    "data-component": "my-component",
  });
});

test("tagProps object should return data-element and data-role tags if provided", () => {
  const attributes = {
    "data-element": "my-component",
    "data-role": "contacts",
  };
  const tag = tagComponent("my-component", attributes);

  expect(tag).toEqual({
    "data-component": "my-component",
    "data-element": "my-component",
    "data-role": "contacts",
  });
});
