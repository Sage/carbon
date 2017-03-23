import PropTypesHelper from './';

const propName = 'value';
const componentName = 'Component';

describe('PropTypesHelper', () => {
  describe('inValidRange', () => {
    describe('when prop falls in valid range', () => {
      const inRange = [0, 1, 5, 9, 10];
      inRange.forEach((value) => {
        it('does not throw an error', () => {
          const props = { value: value }
          let result = PropTypesHelper.inValidRange(
            props, propName, componentName, 0, 10
          );

          expect(result).toBeNull();
        });
      });
    });

    describe('when props falls out of valid range', () => {
      const outOfRange = [-2, -1, 11, 12];
      outOfRange.forEach((value) => {
        it('throws a out of range error', () => {
          const props = { value: value }

          let result = PropTypesHelper.inValidRange(
            props, propName, componentName, 0, 10
          )
          expect(result).toEqual(new Error('value in Component must be between 0 and 10'));
        });
      });
    });

    describe('when prop is not a string or integer', () => {
      it('throws a type error', () => {
        const props = { value: ['foo'] }

        let result = PropTypesHelper.inValidRange(
          props, propName, componentName, 0, 10
        )

        expect(result).toEqual(new Error('value in Component must be a String or Integer'));
      });
    });
  });
});
