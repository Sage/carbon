import focusNextAction from ".";

const flushRafs = async () => {
  jest.advanceTimersByTime(20);
  jest.advanceTimersByTime(20);
};

const renderActionList = (...ids: string[]) => {
  const list = document.createElement("div");
  list.setAttribute("role", "list");
  const buttons = ids.map((id) => {
    const button = document.createElement("button");
    button.id = id;
    button.textContent = id;
    list.appendChild(button);
    return button;
  });
  document.body.appendChild(list);
  return buttons;
};

const appendButton = (id: string) => {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = id;
  document.body.appendChild(button);
  return button;
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  document.body.textContent = "";
});

describe("focusNextAction", () => {
  it("focuses the next action within the same list", () => {
    const [first, second] = renderActionList("first", "second");

    focusNextAction(first, () => null);
    first.remove();
    flushRafs();

    expect(second).toHaveFocus();
  });

  it("falls back to the previous action when there is no next one", () => {
    const [first, second] = renderActionList("first", "second");

    focusNextAction(second, () => null);
    second.remove();
    flushRafs();

    expect(first).toHaveFocus();
  });

  it("falls back to the given element when it was the only action in the list", () => {
    const [only] = renderActionList("only");
    const fallback = appendButton("fallback");

    focusNextAction(only, () => fallback);
    only.remove();
    flushRafs();

    expect(fallback).toHaveFocus();
  });

  it("does nothing when there is no list, no sibling action, and no fallback", () => {
    const lonely = appendButton("lonely");
    lonely.focus();

    focusNextAction(lonely, () => null);
    flushRafs();

    expect(lonely).toHaveFocus();
  });

  it("resolves the fallback after the next render", () => {
    const [only] = renderActionList("only");
    let fallback: HTMLElement | null = null;

    focusNextAction(only, () => fallback);
    only.remove();
    fallback = appendButton("fallback");
    flushRafs();

    expect(fallback).toHaveFocus();
  });

  it("skips a secondary action that was removed with the focused card", () => {
    const list = document.createElement("div");
    list.setAttribute("role", "list");
    const firstCard = document.createElement("div");
    const remove = document.createElement("button");
    const retry = document.createElement("button");
    const nextCardAction = document.createElement("button");
    firstCard.append(remove, retry);
    list.append(firstCard, nextCardAction);
    document.body.appendChild(list);

    focusNextAction(remove, () => null);
    firstCard.remove();
    flushRafs();

    expect(nextCardAction).toHaveFocus();
  });
});

it("does not move focus when the element is still in the document when the frame fires", () => {
  const [first, second] = renderActionList("first", "second");

  focusNextAction(first, () => null);

  //'first' is never removed, so the guard should leave focus alone
  first.focus();
  flushRafs();

  expect(first).toHaveFocus();
  expect(second).not.toHaveFocus();
});
