import focusNextAction from ".";

const flushRaf = () => new Promise((resolve) => requestAnimationFrame(resolve));
const flushTwoRafs = async () => {
  await flushRaf();
  await flushRaf();
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

afterEach(() => {
  document.body.textContent = "";
});

describe("focusNextAction", () => {
  it("focuses the next action within the same list", async () => {
    const [first, second] = renderActionList("first", "second");

    focusNextAction(first, () => null);
    first.remove();
    await flushTwoRafs();

    expect(second).toHaveFocus();
  });

  it("falls back to the previous action when there is no next one", async () => {
    const [first, second] = renderActionList("first", "second");

    focusNextAction(second, () => null);
    second.remove();
    await flushTwoRafs();

    expect(first).toHaveFocus();
  });

  it("falls back to the given element when it was the only action in the list", async () => {
    const [only] = renderActionList("only");
    const fallback = appendButton("fallback");

    focusNextAction(only, () => fallback);
    only.remove();
    await flushTwoRafs();

    expect(fallback).toHaveFocus();
  });

  it("does nothing when there is no list, no sibling action, and no fallback", async () => {
    const lonely = appendButton("lonely");
    lonely.focus();

    focusNextAction(lonely, () => null);
    await flushTwoRafs();

    expect(lonely).toHaveFocus();
  });

  it("resolves the fallback after the next render", async () => {
    const [only] = renderActionList("only");
    let fallback: HTMLElement | null = null;

    focusNextAction(only, () => fallback);
    only.remove();
    fallback = appendButton("fallback");
    await flushTwoRafs();

    expect(fallback).toHaveFocus();
  });

  it("skips a secondary action that was removed with the focused card", async () => {
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
    await flushTwoRafs();

    expect(nextCardAction).toHaveFocus();
  });
});
