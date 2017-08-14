import Events from './events';

describe('Events', () => {
  describe('isEventType', () => {
    describe('when event type matches passed type', () => {
      it('returns true', () => {
        expect(Events.isEventType({ type: 'click' }, 'click')).toBeTruthy();
      });
    });

    describe('when event type does NOT match passed type', () => {
      it('returns false', () => {
        expect(Events.isEventType({ type: 'click' }, 'keyUp')).toBeFalsy();
      });
    });
  });

  describe('isNavigationKeyup', () => {
    describe('when event is not a key up event', () => {
      it('returns false', () => {
        expect(Events.isNavigationKeyup({ type: 'click' })).toBeFalsy();
      });
    });

    describe('when event is a keyup event', () => {
      describe('when key is not a navigation key', () => {
        it('returns false', () => {
          expect(Events.isNavigationKeyup({ type: 'keyup', which: 8 })).toBeFalsy();
        });
      });

      describe('key is a navigation key', () => {
        it('returns true', () => {
          expect(Events.isNavigationKeyup({ type: 'keyup', which: 38 })).toBeTruthy();
        });
      });
    });
  });

  describe('isEnterKeyup', () => {
    describe('when event is not a key up event', () => {
      it('returns false', () => {
        expect(Events.isEnterKeyup({ type: 'click' })).toBeFalsy();
      });
    });

    describe('when event is a keyup event', () => {
      describe('when key is not the enter key', () => {
        it('returns false', () => {
          expect(Events.isEnterKeyup({ type: 'keyup', which: 8 })).toBeFalsy();
        });
      });

      describe('key is the enter key', () => {
        it('returns true', () => {
          expect(Events.isEnterKeyup({ type: 'keyup', which: 13 })).toBeTruthy();
        });
      });
    });
  });

  describe('isValidKeyPress', () => {
    describe('when event is not a key up event', () => {
      it('returns false', () => {
        expect(Events.isValidKeypress({ type: 'click' })).toBeFalsy();
      });
    });

    describe('when event is a keyup event', () => {
      describe('when key is not valid', () => {
        it('returns false', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 223 })).toBeFalsy();
        });
      });

      describe('key is a valid number or letter', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 48 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 66 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 90 })).toBeTruthy();
        });
      });

      describe('key is a valid numpad number', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 96 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 100 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 111 })).toBeTruthy();
        });
      });

      describe('key is a valid symbol', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 186 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 190 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 192 })).toBeTruthy();

          expect(Events.isValidKeypress({ type: 'keyup', which: 219 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 220 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 222 })).toBeTruthy();
        });
      });

      describe('key is space, delete or backspace', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 32 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 46 })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 8 })).toBeTruthy();
        });
      });
    });
  });

  describe('isNumberKey', () => {
    it('returns false when a non number key is pressed', () => {
      expect(Events.isNumberKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when a top row number is pressed', () => {
      expect(Events.isNumberKey({ which: 49 })).toBeTruthy();
    });

    it('returns true when a numpad number is pressed', () => {
      expect(Events.isNumberKey({ which: 97 })).toBeTruthy();
    });
  });

  describe('isNumpadKey', () => {
    it('returns false when a non numpad key is pressed', () => {
      expect(Events.isNumpadKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when a numpad number is pressed', () => {
      expect(Events.isNumpadKey({ which: 97 })).toBeTruthy();
    });

    it('returns true when a numpad symbol is pressed', () => {
      expect(Events.isNumpadKey({ which: 107 })).toBeTruthy();
    });
  });

  describe('isAlphabet', () => {
    it('returns false when a non alphabet key is pressed', () => {
      expect(Events.isAlphabetKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when a alphabet is pressed', () => {
      expect(Events.isAlphabetKey({ which: 66 })).toBeTruthy();
    });
  });

  describe('isSymbolKey', () => {
    it('returns false when a non symbol key is pressed', () => {
      expect(Events.isSymbolKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when a symbol key is pressed', () => {
      expect(Events.isSymbolKey({ which: 59 })).toBeTruthy();
    });

    it('returns true when a numpad symbol is pressed', () => {
      expect(Events.isSymbolKey({ which: 107 })).toBeTruthy();
    });
  });

  describe('isNavigationKey', () => {
    it('returns false when a non navigation key is pressed', () => {
      expect(Events.isNavigationKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when one of the 4 navigation keys is pressed', () => {
      expect(Events.isNavigationKey({ which: 37 })).toBeTruthy();
    });
  });

  describe('isLeftKey', () => {
    it('returns false when the left key is not pressed', () => {
      expect(Events.isLeftKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the left key is pressed', () => {
      expect(Events.isLeftKey({ which: 37 })).toBeTruthy();
    });
  });

  describe('isUpKey', () => {
    it('returns false when the up key is not pressed', () => {
      expect(Events.isUpKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the up key is pressed', () => {
      expect(Events.isUpKey({ which: 38 })).toBeTruthy();
    });
  });

  describe('isRightKey', () => {
    it('returns false when the right key is not pressed', () => {
      expect(Events.isRightKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the right key is pressed', () => {
      expect(Events.isRightKey({ which: 39 })).toBeTruthy();
    });
  });

  describe('isDownKey', () => {
    it('returns false when the down key is not pressed', () => {
      expect(Events.isDownKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the down key is pressed', () => {
      expect(Events.isDownKey({ which: 40 })).toBeTruthy();
    });
  });

  describe('isMetaKey', () => {
    it('returns false when the event is not a meta key', () => {
      expect(Events.isMetaKey({ metaKey: false })).toBeFalsy();
    });

    it('returns true when the event is a meta key', () => {
      expect(Events.isMetaKey({ metaKey: true })).toBeTruthy();
    });
  });

  describe('isEscKey', () => {
    it('returns false when the ESC key is not pressed', () => {
      expect(Events.isEscKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the ESC key is pressed', () => {
      expect(Events.isEscKey({ which: 27 })).toBeTruthy();
    });
  });

  describe('isEnterKey', () => {
    it('returns false when the Enter key is not pressed', () => {
      expect(Events.isEnterKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the Enter key is pressed', () => {
      expect(Events.isEnterKey({ which: 13 })).toBeTruthy();
    });
  });

  describe('isTabKey', () => {
    it('returns false when the Tab key is not pressed', () => {
      expect(Events.isTabKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the Tab key is pressed', () => {
      expect(Events.isTabKey({ which: 9 })).toBeTruthy();
    });
  });

  describe('isBackspaceKey', () => {
    it('returns false when the Backspace key is not pressed', () => {
      expect(Events.isBackspaceKey({ which: 9 })).toBeFalsy();
    });

    it('returns true when the Backspace key is pressed', () => {
      expect(Events.isBackspaceKey({ which: 8 })).toBeTruthy();
    });
  });

  describe('isDeleteKey', () => {
    it('returns false when the Delete key is not pressed', () => {
      expect(Events.isDeleteKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the Delete key is pressed', () => {
      expect(Events.isDeleteKey({ which: 46 })).toBeTruthy();
    });
  });

  describe('isDeletingKey', () => {
    it('returns false when a deleting key is not pressed', () => {
      expect(Events.isDeletingKey({ which: 9 })).toBeFalsy();
    });

    it('returns true when the Delete key is pressed', () => {
      expect(Events.isDeletingKey({ which: 46 })).toBeTruthy();
    });

    it('returns true when the Backspace key is pressed', () => {
      expect(Events.isDeletingKey({ which: 8 })).toBeTruthy();
    });
  });

  describe('isShiftKey', () => {
    it('returns false when a Shift key is not pressed', () => {
      expect(Events.isShiftKey({ which: 9 })).toBeFalsy();
    });

    it('returns true when the Shift key is pressed', () => {
      expect(Events.isShiftKey({ which: 16 })).toBeTruthy();
    });
  });

  describe('isSpaceKey', () => {
    it('returns false when a Space key is not pressed', () => {
      expect(Events.isSpaceKey({ which: 9 })).toBeFalsy();
    });

    it('returns true when the Space key is pressed', () => {
      expect(Events.isSpaceKey({ which: 32 })).toBeTruthy();
    });
  });

  describe('isPeriodKey', () => {
    it('returns false when a Period key is not pressed', () => {
      expect(Events.isPeriodKey({ which: 9 })).toBeFalsy();
    });

    it('returns true when the Period key is pressed', () => {
      expect(Events.isPeriodKey({ which: 190 })).toBeTruthy();
    });
  });

  describe('isCommaKey', () => {
    it('returns false when a Comma key is not pressed', () => {
      expect(Events.isCommaKey({ which: 8 })).toBeFalsy();
    });

    it('returns true when the Comma key is pressed', () => {
      expect(Events.isCommaKey({ which: 188 })).toBeTruthy();
    });
  });

  describe('isMinusKey', () => {
    it('returns false when a minus key is not pressed', () => {
      expect(Events.isMinusKey({ which: 190 })).toBeFalsy();
    });

    it('returns true when the minus key is pressed', () => {
      expect(Events.isMinusKey({ which: 189 })).toBeTruthy();
    });
  });
});
