import Events from "./events";

describe("isEventType", () => {
  it("returns true when the event type and passed type match", () => {
    const event = { type: "click" } as Event;
    const result = Events.isEventType(event, "click");

    expect(result).toBeTruthy();
  });

  it("returns false when the event type and passed type do not match", () => {
    const event = { type: "click" } as Event;
    const result = Events.isEventType(event, "keyUp");

    expect(result).toBeFalsy();
  });
});

describe("isKeyboardEvent", () => {
  test.each(["keyup", "keydown", "keypress"])(
    "returns true when the event type is a keyboard event type (%s)",
    (type) => {
      const event = { type } as Event;
      const result = Events.isKeyboardEvent(event);

      expect(result).toBeTruthy();
    },
  );

  it("returns false when the event type is not a keyboard event type", () => {
    const event = { type: "click" } as Event;
    const result = Events.isKeyboardEvent(event);

    expect(result).toBeFalsy();
  });
});

describe("isEnterOrSpaceKey", () => {
  it("returns true when the event type is a keyup event, and the key is the Enter key", () => {
    const event = { type: "keyup", key: "Enter" } as KeyboardEvent;
    const result = Events.isEnterOrSpaceKey(event);

    expect(result).toBeTruthy();
  });

  it("returns true when the event type is a keyup event, and the key is the Space key", () => {
    const event = { type: "keyup", key: " " } as KeyboardEvent;
    const result = Events.isEnterOrSpaceKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is a keyup event, but the key is not the Enter key or the Space key", () => {
    const event = { type: "keyup", key: "Backspace" } as KeyboardEvent;
    const result = Events.isEnterOrSpaceKey(event);

    expect(result).toBeFalsy();
  });

  it("returns false when the event type is not a keyup event", () => {
    const event = { type: "keydown" } as KeyboardEvent;
    const result = Events.isEnterOrSpaceKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isNumberKey", () => {
  test.each(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])(
    "returns true when the event type is a number key event (%s)",
    (key) => {
      const event = { key } as KeyboardEvent;
      const result = Events.isNumberKey(event);

      expect(result).toBeTruthy();
    },
  );

  it("returns false when the event type is not a number key event", () => {
    const event = { key: "a" } as KeyboardEvent;
    const result = Events.isNumberKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isLeftKey", () => {
  it("returns false when the event type is not a left key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isLeftKey(event);

    expect(result).toBeFalsy();
  });

  it("returns true when the event type is a left key event", () => {
    const event = { key: "ArrowLeft" } as KeyboardEvent;
    const result = Events.isLeftKey(event);

    expect(result).toBeTruthy();
  });
});

describe("isUpKey", () => {
  it("returns true when the event type is an up key event", () => {
    const event = { key: "ArrowUp" } as KeyboardEvent;
    const result = Events.isUpKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not an up key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isUpKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isRightKey", () => {
  it("returns true when the event type is a right key event", () => {
    const event = { key: "ArrowRight" } as KeyboardEvent;
    const result = Events.isRightKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not a right key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isRightKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isDownKey", () => {
  it("returns true when the event type is a down key event", () => {
    const event = { key: "ArrowDown" } as KeyboardEvent;
    const result = Events.isDownKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not a down key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isDownKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isEscKey", () => {
  it("returns true when the event type is an Escape key event", () => {
    const event = { key: "Escape" } as KeyboardEvent;
    const result = Events.isEscKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not an Escape key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isEscKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isEnterKey", () => {
  it("returns true when the event type is an Enter key event", () => {
    const event = { key: "Enter" } as KeyboardEvent;
    const result = Events.isEnterKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not an Enter key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isEnterKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isTabKey", () => {
  it("returns true when the event type is a Tab key event", () => {
    const event = { key: "Tab" } as KeyboardEvent;
    const result = Events.isTabKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not a Tab key event", () => {
    const event = { key: "Backspace" } as KeyboardEvent;
    const result = Events.isTabKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isShiftKey", () => {
  it("returns true when the event type is a Shift key event", () => {
    const event = { shiftKey: true } as KeyboardEvent;
    const result = Events.isShiftKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not a Shift key event", () => {
    const event = { key: "Tab" } as KeyboardEvent;
    const result = Events.isShiftKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isSpaceKey", () => {
  it("returns true when the event type is a Space key event", () => {
    const event = { key: " " } as KeyboardEvent;
    const result = Events.isSpaceKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not a Space key event", () => {
    const event = { key: "Tab" } as KeyboardEvent;
    const result = Events.isSpaceKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isHomeKey", () => {
  it("returns true when the event type is a Home key event", () => {
    const event = { key: "Home" } as KeyboardEvent;
    const result = Events.isHomeKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not a Home key event", () => {
    const event = { key: "End" } as KeyboardEvent;
    const result = Events.isHomeKey(event);

    expect(result).toBeFalsy();
  });
});

describe("isEndKey", () => {
  it("returns true when the event type is an End key event", () => {
    const event = { key: "End" } as KeyboardEvent;
    const result = Events.isEndKey(event);

    expect(result).toBeTruthy();
  });

  it("returns false when the event type is not an End key event", () => {
    const event = { key: "Home" } as KeyboardEvent;
    const result = Events.isEndKey(event);

    expect(result).toBeFalsy();
  });
});

describe("composedPath", () => {
  it("returns an empty array if there is no target", () => {
    const event = new CustomEvent("click");
    const result = Events.composedPath(event);

    expect(result).toEqual([]);
  });

  it("returns an empty array if target is null", () => {
    const event = { target: null } as CustomEvent;
    const result = Events.composedPath(event);

    expect(result).toEqual([]);
  });

  it("returns an empty array if there is no parent element", () => {
    const event = { target: document as EventTarget } as CustomEvent;
    const result = Events.composedPath(event);

    expect(result).toEqual([]);
  });

  it("returns the path from event.composedPath() if it is available", () => {
    const path = Symbol("path");
    const composedPath = jest.fn();
    composedPath.mockReturnValue(path);

    const event = new CustomEvent("click");
    event.composedPath = composedPath;
    const result = Events.composedPath(event);

    expect(result).toBe(path);
  });

  it("builds path from DOM elements if event.composedPath is unavailable", () => {
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");

    ul.appendChild(li);
    div.appendChild(ul);

    const path = [div, ul, li];
    const event = { target: li } as unknown as CustomEvent;
    const result = Events.composedPath(event);

    expect(result).toEqual(path);
  });
});
