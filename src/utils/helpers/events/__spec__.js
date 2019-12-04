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
          expect(Events.isValidKeypress({ type: 'keyup', which: 223, key: '`' })).toBeFalsy();
        });
      });

      describe('key is a valid number or letter', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 48, key: 'Delete' })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 66, key: 'b' })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 90, key: 'z'})).toBeTruthy();
        });
      });

      describe('key is a valid numpad number', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 96, key: '0' })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 100, key: '4'})).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 111, key: 'divide'})).toBeTruthy();
        });
      });

      describe('key is a valid symbol', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 186, key: ';'})).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 190, key: '.'})).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 192, key: '`' })).toBeTruthy();

          expect(Events.isValidKeypress({ type: 'keyup', which: 219, key: '[' })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 220, key: '\\'})).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 222, key: '\''})).toBeTruthy();
        });
      });

      describe('key is space, delete or backspace', () => {
        it('returns true', () => {
          expect(Events.isValidKeypress({ type: 'keyup', which: 32, key: ' '})).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 46, key: 'Delete' })).toBeTruthy();
          expect(Events.isValidKeypress({ type: 'keyup', which: 8, key: 'Backspace' })).toBeTruthy();
        });
      });
    });
  });

  describe('isNumberKey', () => {
    it('returns false when a non number key is pressed', () => {
      expect(Events.isNumberKey({ key: 'a' })).toBeFalsy();
    });

    it.each([
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ])('returns true when a number is pressed (%s)', key => {
      expect(Events.isNumberKey({ key })).toBeTruthy();
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
      expect(Events.isBackspaceKey({ key: ' ' })).toBeFalsy();
    });

    it('returns true when the Backspace key is pressed', () => {
      expect(Events.isBackspaceKey({ key: 'Backspace' })).toBeTruthy();
    });
  });

  describe('isDeleteKey', () => {
    it('returns false when the Delete key is not pressed', () => {
      expect(Events.isDeleteKey({ key: ' ' })).toBeFalsy();
    });

    it('returns true when the Delete key is pressed', () => {
      expect(Events.isDeleteKey({ key: 'Delete' })).toBeTruthy();
    });
  });

  describe('isDeletingKey', () => {
    it('returns false when a deleting key is not pressed', () => {
      expect(Events.isDeletingKey({ key: ' '})).toBeFalsy();
    });

    it('returns true when the Delete key is pressed', () => {
      expect(Events.isDeletingKey({ key: 'Delete' })).toBeTruthy();
    });

    it('returns true when the Backspace key is pressed', () => {
      expect(Events.isDeletingKey({ key: 'Backspace' })).toBeTruthy();
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
      expect(Events.isMinusKey({ key: ' ' })).toBeFalsy();
    });

    it('returns true when the minus key is pressed', () => {
      expect(Events.isMinusKey({ key: '-' })).toBeTruthy();
    });

    it('returns true when the numpad minus key is pressed (IE)', () => {
      expect(Events.isMinusKey({ key: 'Subtract' })).toBeTruthy();
    });
  });

  describe('isHomeKey', () => {
    it('returns false when the home key is not pressed', () => {
      expect(Events.isHomeKey({ which: 190 })).toBeFalsy();
    });

    it('returns true when the home key is pressed', () => {
      expect(Events.isHomeKey({ which: 36 })).toBeTruthy();
    });
  });

  describe('isEndKey', () => {
    it('returns false when the end key is not pressed', () => {
      expect(Events.isEndKey({ which: 190 })).toBeFalsy();
    });

    it('returns true when the end key is pressed', () => {
      expect(Events.isEndKey({ which: 35 })).toBeTruthy();
    });
  });

  describe('composedPath', () => {
    it('returns the path from event.path if it is available', () => {
      const path = Symbol('path');
      const ev = new CustomEvent('click');
      ev.path = path;
      expect(Events.composedPath(ev)).toBe(path);
    });

    it('returns an empty array if there is no target', () => {
      expect(Events.composedPath(new CustomEvent('click'))).toEqual([]);
    });

    it('returns an empty array if there is no parent element', () => {
      const ev = {
        target: document
      };
      
      expect(Events.composedPath(ev)).toEqual([]);
    });

    it('returns the path from event.composedPath() if it is available', () => {
      const path = Symbol('path');
      const composedPath = jest.fn();
      composedPath.mockReturnValue(path);
      const ev = new CustomEvent('click');
      ev.composedPath = composedPath;
      expect(Events.composedPath(ev)).toBe(path);
    });

    it.each([
      ['a DOMElement', (path, li) => {
        const ev = {
          target: li
        }
        
        expect(Events.composedPath(ev)).toEqual(path);
      }],
      ['an Enzyme ReactWrapper', (path, li) => {
        const ev = new CustomEvent('click', {
          detail : {
            enzymeTestingTarget: li
          }
        })
        
        expect(Events.composedPath(ev)).toEqual(path);
      }],
    ])('builds the path if it is not avaiable on the element from %s', (str, assertion) => {
      const div = document.createElement('div');
      const ul = document.createElement('ul');
      const li = document.createElement('li');

      ul.appendChild(li);
      div.appendChild(ul);

      const path = [div, ul, li];

      assertion(path, li);
    });
  });
});
