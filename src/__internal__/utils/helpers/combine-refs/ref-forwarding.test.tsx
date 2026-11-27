import React from "react";
import { render } from "@testing-library/react";
import Button from "../../../../components/button";
import NextButton from "../../../../components/button/__next__";
import IconButton from "../../../../components/icon-button";
import Link from "../../../../components/link";
import { Checkbox } from "../../../../components/checkbox";
import Textbox from "../../../../components/textbox";
import Textarea from "../../../../components/textarea";
import DateInput from "../../../../components/date";
import Sidebar from "../../../../components/sidebar";
import Toast from "../../../../components/toast";
import SimpleSelect from "../../../../components/select/simple-select";
import FilterableSelect from "../../../../components/select/filterable-select";
import MultiSelect from "../../../../components/select/multi-select";
import Option from "../../../../components/select/option";

type Example = [
  string,
  (ref: React.RefCallback<HTMLElement>) => React.ReactElement,
];

const examples: Example[] = [
  ["Button", (ref) => <Button ref={ref}>Action</Button>],
  ["NextButton", (ref) => <NextButton ref={ref}>Action</NextButton>],
  [
    "IconButton",
    (ref) => (
      <IconButton ref={ref} aria-label="Action">
        <span>Icon</span>
      </IconButton>
    ),
  ],
  [
    "Link",
    (ref) => (
      <Link ref={ref} href="#target">
        Target
      </Link>
    ),
  ],
  [
    "Checkbox",
    (ref) => (
      <Checkbox ref={ref} label="Agree" checked={false} onChange={() => {}} />
    ),
  ],
  [
    "Textbox",
    (ref) => <Textbox ref={ref} label="Name" value="" onChange={() => {}} />,
  ],
  [
    "Textarea",
    (ref) => (
      <Textarea ref={ref} label="Message" value="" onChange={() => {}} />
    ),
  ],
  ["Date", (ref) => <DateInput ref={ref} value="" onChange={() => {}} />],
  ["Sidebar", (ref) => <Sidebar ref={ref} open header="Details" />],
  [
    "Toast",
    (ref) => (
      <Toast ref={ref} open timeout={0}>
        Saved
      </Toast>
    ),
  ],
  [
    "SimpleSelect",
    (ref) => (
      <SimpleSelect ref={ref} value="" onChange={() => {}}>
        <Option value="one">One</Option>
      </SimpleSelect>
    ),
  ],
  [
    "FilterableSelect",
    (ref) => (
      <FilterableSelect ref={ref} value="" onChange={() => {}}>
        <Option value="one">One</Option>
      </FilterableSelect>
    ),
  ],
  [
    "MultiSelect",
    (ref) => (
      <MultiSelect ref={ref} value={[]} onChange={() => {}}>
        <Option value="one">One</Option>
      </MultiSelect>
    ),
  ],
];

describe.each(examples)("%s ref contract", (_name, example) => {
  test("runs every consumer cleanup once without sending a null callback", () => {
    const cleanups: jest.Mock[] = [];
    const callback = jest.fn((node: HTMLElement | null) => {
      if (node === null) return;
      const cleanup = jest.fn();
      cleanups.push(cleanup);
      return cleanup;
    });
    const { unmount } = render(example(callback));

    expect(cleanups.length).toBeGreaterThan(0);
    expect(callback.mock.calls.some(([node]) => node?.isConnected)).toBe(true);
    unmount();

    expect(
      callback.mock.calls.every(([node]) => node instanceof HTMLElement),
    ).toBe(true);
    cleanups.forEach((cleanup) => expect(cleanup).toHaveBeenCalledTimes(1));
  });

  test("continues to notify void-returning callback refs when detached", () => {
    const callback = jest.fn<void, [HTMLElement | null]>();
    const { unmount } = render(example(callback));

    expect(
      callback.mock.calls.some(([node]) => node instanceof HTMLElement),
    ).toBe(true);
    unmount();

    expect(callback).toHaveBeenLastCalledWith(null);
  });
});
