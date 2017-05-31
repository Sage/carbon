import Text from './text'
import Browser from '../browser';

describe('Text', () => {
  describe('clearSelection', () => {
    describe('when document.body.createTextRange is defined', () => {
      it('calls collapse and select on the text range', () => {
        const mockTextRange = {
          collapse() {
            console.log('range.collapse()');
          },
          select() {
            console.log('range.select()');
          }
        };

        const mockDocument = {
          body: {
            createTextRange() {
              console.log('createTextRange called');
              return mockTextRange;
            }
          }
        };

        spyOn(mockTextRange, 'collapse');
        spyOn(mockTextRange, 'select');

        spyOn(Browser, 'getDocument').and.returnValue(mockDocument);

        Text.clearSelection();

        expect(mockTextRange.collapse).toHaveBeenCalled();
        expect(mockTextRange.select).toHaveBeenCalled();
      });
    });

    describe('when window.getSelection is defined', () => {
      it('calls removeAllRanges on the selection', () => {
        const mockSelection = {
          removeAllRanges() {
            console.log('removeAllRanges');
          }
        };

        const mockWindow = {
          getSelection() {
            return mockSelection;
          }
        };

        spyOn(mockSelection, 'removeAllRanges');

        spyOn(Browser, 'getWindow').and.returnValue(mockWindow);

        Text.clearSelection();

        expect(mockSelection.removeAllRanges).toHaveBeenCalled();
      });
    });
  });
});
