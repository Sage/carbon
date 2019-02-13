import React from 'react';
import filterChildren from '.';
import AppWrapper from '../../components/app-wrapper';
import Button from '../../components/button';

const customFilter = (text, value) => {
  return text.length === value.length;
};

const onNoResults = jasmine.createSpy('onNoResult');

const callback = child => (
  <AppWrapper>
    { child }
  </AppWrapper>
);

const makeChildArray = (total, text) => {
  const arr = [];
  for (let i = 0; i < total; i++) arr.push(<Button text={ text }>foo</Button>);
  return arr;
};

const value = 'foo';

/* NEED TO TEST WHEN NO CALLBACK IS PASSED */
describe('filterChildren', () => {
  describe('filteredChildren', () => {
    it('returns the children when no text prop exists', () => {
      const filter = filterChildren({ value, onNoResults });
      const children = filter(makeChildArray(2), callback);
      expect(React.Children.count(children)).toEqual(2);
    });

    it('renders child when no value passed', () => {
      const filter = filterChildren({ onNoResults });
      const children = filter(makeChildArray(3), callback);
      expect(React.Children.count(children)).toEqual(3);
    });

    it('renders the child components when the custom filter returns true', () => {
      const filter = filterChildren({ value, filter: customFilter, onNoResults });
      const children = filter(makeChildArray(4, 'bar'), callback);
      expect(React.Children.count(children)).toEqual(4);
    });

    it('renders the child components when no filter param is passed and the default filter returns true', () => {

    });

    it('returns the result of the callback when the filter returns false', () => {
      const filter = filterChildren({ value, onNoResults });
      filter([<Button text='oof'>foo</Button>], callback);
      expect(onNoResults).toHaveBeenCalled();
    });
  });

  it('returns the result of the filteredChildren function when the children count is defined', () => {

  });

  it('returns the onNoResult callback if one was passed and children count is undefined', () => {
    // use a spyOn here
  });

  it('returns null if children count is undefined and there is no onNoResult callback', () => {
    const filter = filterChildren({ value });
    const children = filter([<Button text='oof'>foo</Button>]);
    expect(children).toEqual(null);
  });
});
