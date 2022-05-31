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
              which: 8,
            } as KeyboardEvent)
          ).toBeFalsy();
        });
      });

      describe("key is the enter key", () => {
        it("returns true", () => {
          expect(
            Events.isEnterOrSpaceKey({
              type: "keyup",
              which: 13,
            } as KeyboardEvent)
          ).toBeTruthy();
        });
      });

      describe("key is the space key", () => {
        it("returns true", () => {
          expect(
            Events.isEnterOrSpaceKey({
              type: "keyup",
              which: 32,
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
      expect(Events.isLeftKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the left key is pressed", () => {
      expect(Events.isLeftKey({ which: 37 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isUpKey", () => {
    it("returns false when the up key is not pressed", () => {
      expect(Events.isUpKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the up key is pressed", () => {
      expect(Events.isUpKey({ which: 38 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isRightKey", () => {
    it("returns false when the right key is not pressed", () => {
      expect(Events.isRightKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the right key is pressed", () => {
      expect(Events.isRightKey({ which: 39 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isDownKey", () => {
    it("returns false when the down key is not pressed", () => {
      expect(Events.isDownKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the down key is pressed", () => {
      expect(Events.isDownKey({ which: 40 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isEscKey", () => {
    it("returns false when the ESC key is not pressed", () => {
      expect(Events.isEscKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the ESC key is pressed", () => {
      expect(Events.isEscKey({ which: 27 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isEnterKey", () => {
    it("returns false when the Enter key is not pressed", () => {
      expect(Events.isEnterKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the Enter key is pressed", () => {
      expect(Events.isEnterKey({ which: 13 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isTabKey", () => {
    it("returns false when the Tab key is not pressed", () => {
      expect(Events.isTabKey({ which: 8 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the Tab key is pressed", () => {
      expect(Events.isTabKey({ which: 9 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isShiftKey", () => {
    it("returns false when a Shift key is not pressed", () => {
      expect(Events.isShiftKey({ which: 9 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the Shift key is pressed", () => {
      expect(Events.isShiftKey({ which: 16 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isSpaceKey", () => {
    it("returns false when a Space key is not pressed", () => {
      expect(Events.isSpaceKey({ which: 9 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the Space key is pressed", () => {
      expect(Events.isSpaceKey({ which: 32 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isHomeKey", () => {
    it("returns false when the home key is not pressed", () => {
      expect(Events.isHomeKey({ which: 190 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the home key is pressed", () => {
      expect(Events.isHomeKey({ which: 36 } as KeyboardEvent)).toBeTruthy();
    });
  });

  describe("isEndKey", () => {
    it("returns false when the end key is not pressed", () => {
      expect(Events.isEndKey({ which: 190 } as KeyboardEvent)).toBeFalsy();
    });

    it("returns true when the end key is pressed", () => {
      expect(Events.isEndKey({ which: 35 } as KeyboardEvent)).toBeTruthy();
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
