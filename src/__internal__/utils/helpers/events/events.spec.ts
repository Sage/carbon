import Events from "./events";

describe("Events", () => {
  describe("isEventType", () => {
    describe("when event type matches passed type", () => {
      it("returns true", () => {
        expect(
          Events.isEventType({ type: "click" } as Event, "click")
        ).toBeTruthy();
      });
    });

    describe("when event type does NOT match passed type", () => {
      it("returns false", () => {
        expect(
          Events.isEventType({ type: "click" } as Event, "keyUp")
        ).toBeFalsy();
      });
    });
  });

  describe("isKeyboardEvent", () => {
    it.each(["keyup", "keydown", "keypress"])(
      "returns true when event type is %s",
      (type) => {
        expect(Events.isKeyboardEvent({ type } as Event)).toBeTruthy();
      }
    );

    it("returns false when event type is not a keyboard event type", () => {
      expect(Events.isKeyboardEvent({ type: "click" } as Event)).toBeFalsy();
    });
  });

  describe("isEnterOrSpaceKey", () => {
    describe("when event is not a key up event", () => {
      it("returns false", () => {
        expect(
          Events.isEnterOrSpaceKey({ type: "click" } as KeyboardEvent)
        ).toBeFalsy();
      });
    });

    describe("when event is a keyup event", () => {
      describe("when key is not the enter key", () => {
        it("returns false", () => {
          expect(
            Events.isEnterOrSpaceKey({
              type: "keyup",
              key: "Backspace",
            } as KeyboardEvent)
          ).toBeFalsy();
        });
      });

      describe("key is the enter key", () => {
        it("returns true", () => {
          expect(
            Events.isEnterOrSpaceKey({
              type: "keyup",
              key: "Enter",
            } as KeyboardEvent)
          ).toBeTruthy();
        });
      });

      describe("key is the space key", () => {
        it("returns true", () => {
          expect(
            Events.isEnterOrSpaceKey({
              type: "keyup",
              key: " ",
            } as KeyboardEvent)
          ).toBeTruthy();
        });
      });
    });
  });

  describe("isNumberKey", () => {
    it("returns false when a non number key is pressed", () => {
      expect(Events.isNumberKey({ key: "a" } as KeyboardEvent)).toBeFalsy();
    });

    it.each(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])(
      "returns true when a number is pressed (%s)",
      (key) => {
        expect(Events.isNumberKey({ key } as KeyboardEvent)).toBeTruthy();
      }
    );
  });

  describe("isLeftKey", () => {
    it("returns false when the left key is not pressed", () => {
      expect(
        Events.isLeftKey({ key: "Backspace" } as KeyboardEvent)
      ).toBeFalsy();
    });

    it("returns true when the left key is pressed", () => {
      expect(
        Events.isLeftKey({ key: "ArrowLeft" } as KeyboardEvent)
      ).toBeTruthy();
    });
  });

  describe("isUpKey", () => {
    it("returns false when the up key is not pressed", () => {
      expect(Events.isUpKey({ key: "Backspace" } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the up key is pressed", () => {
      expect(Events.isUpKey({ key: "ArrowUp" } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isRightKey", () => {
    it("returns false when the right key is not pressed", () => {
      expect(
        Events.isRightKey({ key: "Backspace" } as KeyboardEvent)
      ).toBeFalsy();
    });

    it("returns true when the right key is pressed", () => {
      expect(
        Events.isRightKey({ key: "ArrowRight" } as KeyboardEvent)
      ).toBeTruthy();
    });
  });

  describe("isDownKey", () => {
    it("returns false when the down key is not pressed", () => {
      expect(
        Events.isDownKey({ key: "Backspace" } as KeyboardEvent)
      ).toBeFalsy();
    });

    it("returns true when the down key is pressed", () => {
      expect(
        Events.isDownKey({ key: "ArrowDown" } as KeyboardEvent)
      ).toBeTruthy();
    });
  });

  describe("isEscKey", () => {
    it("returns false when the ESC key is not pressed", () => {
      expect(
        Events.isEscKey({ key: "Backspace" } as KeyboardEvent)
      ).toBeFalsy();
    });

    it("returns true when the ESC key is pressed", () => {
      expect(Events.isEscKey({ key: "Escape" } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isEnterKey", () => {
    it("returns false when the Enter key is not pressed", () => {
      expect(
        Events.isEnterKey({ key: "Backspace" } as KeyboardEvent)
      ).toBeFalsy();
    });

    it("returns true when the Enter key is pressed", () => {
      expect(Events.isEnterKey({ key: "Enter" } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isTabKey", () => {
    it("returns false when the Tab key is not pressed", () => {
      expect(
        Events.isTabKey({ key: "Backspace" } as KeyboardEvent)
      ).toBeFalsy();
    });

    it("returns true when the Tab key is pressed", () => {
      expect(Events.isTabKey({ key: "Tab" } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isShiftKey", () => {
    it("returns false when a Shift key is not pressed", () => {
      expect(Events.isShiftKey({ key: "Tab" } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the Shift key is pressed", () => {
      expect(
        Events.isShiftKey({ shiftKey: true } as KeyboardEvent)
      ).toBeTruthy();
    });
  });

  describe("isSpaceKey", () => {
    it("returns false when a Space key is not pressed", () => {
      expect(Events.isSpaceKey({ key: "Tab" } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the Space key is pressed", () => {
      expect(Events.isSpaceKey({ key: " " } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isHomeKey", () => {
    it("returns false when the home key is not pressed", () => {
      expect(Events.isHomeKey({ key: "End" } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the home key is pressed", () => {
      expect(Events.isHomeKey({ key: "Home" } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isEndKey", () => {
    it("returns false when the end key is not pressed", () => {
      expect(Events.isEndKey({ key: "Home" } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the end key is pressed", () => {
      expect(Events.isEndKey({ key: "End" } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("composedPath", () => {
    it("returns an empty array if there is no target", () => {
      expect(Events.composedPath(new CustomEvent("click"))).toEqual([]);
    });

    it("returns an empty array if target is null", () => {
      const ev = {
        target: null,
      };

      expect(Events.composedPath(ev as CustomEvent)).toEqual([]);
    });

    it("returns an empty array if there is no parent element", () => {
      const ev = {
        target: document as EventTarget,
      };

      expect(Events.composedPath(ev as CustomEvent)).toEqual([]);
    });

    it("returns the path from event.composedPath() if it is available", () => {
      const path = Symbol("path");
      const composedPath = jest.fn();
      composedPath.mockReturnValue(path);
      const ev = new CustomEvent("click");
      ev.composedPath = composedPath;
      expect(Events.composedPath(ev)).toBe(path);
    });

    it.each([
      [
        "a DOMElement",
        (path: EventTarget[], li: EventTarget) => {
          const ev = {
            target: li,
          };

          expect(Events.composedPath(ev as CustomEvent)).toEqual(path);
        },
      ],
      [
        "an Enzyme ReactWrapper",
        (path: EventTarget[], li: HTMLElement) => {
          const ev = new CustomEvent("click", {
            detail: {
              enzymeTestingTarget: li,
            },
          });

          expect(Events.composedPath(ev)).toEqual(path);
        },
      ],
    ])(
      "builds the path if it is not available on the element from %s",
      (str, assertion) => {
        const div = document.createElement("div");
        const ul = document.createElement("ul");
        const li = document.createElement("li");

        ul.appendChild(li);
        div.appendChild(ul);

        const path = [div, ul, li];

        assertion(path, li);
      }
    );
  });
});
