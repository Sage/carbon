import React from 'react';
import { mount } from 'enzyme';
import { getNextChildByKey } from './get-next-child-by-key';

describe('getNextChildByKey', () => {
  let wrapper;
  let children;
  let arrayOfChildren;
  const homeKey = 'Home';
  const endKey = 'End';
  const upKey = 'ArrowUp';
  const downKey = 'ArrowDown';

  beforeEach(() => {
    wrapper = renderList();
    children = wrapper.find('li').props().children;
    arrayOfChildren = React.Children.toArray(children);
  });

  describe('when the homeKey is passed as the first attribute', () => {
    it('then the first child should be returned', () => {
      expect(getNextChildByKey(homeKey, children)).toStrictEqual(arrayOfChildren[0]);
    });
  });

  describe('when the endKey is passed as the first attribute', () => {
    it('then the last child should be returned', () => {
      expect(getNextChildByKey(endKey, children)).toStrictEqual(arrayOfChildren[5]);
    });
  });

  describe('when the upKey is passed as the first attribute', () => {
    it('then the last child should be returned', () => {
      expect(getNextChildByKey(upKey, children)).toStrictEqual(arrayOfChildren[5]);
    });

    describe('with value of one of elements passed as third attribute', () => {
      it('then the previous child before that element should be returned', () => {
        expect(getNextChildByKey(upKey, children, 'white')).toStrictEqual(arrayOfChildren[1]);
      });
    });

    describe('with value of the first element passed as third attribute', () => {
      it('then the last child should be returned', () => {
        expect(getNextChildByKey(upKey, children, 'amber')).toStrictEqual(arrayOfChildren[5]);
      });
    });
  });

  describe('when the downKey is passed as the first attribute', () => {
    it('then the first child should be returned', () => {
      expect(getNextChildByKey(downKey, children)).toStrictEqual(arrayOfChildren[0]);
    });

    describe('with value of one of elements passed as third attribute', () => {
      it('then next child after the position stated by that integer should be returned', () => {
        expect(getNextChildByKey(downKey, children, 'white')).toStrictEqual(arrayOfChildren[3]);
      });
    });

    describe('with value of the last element passed as third attribute', () => {
      it('then the first child should be returned', () => {
        expect(getNextChildByKey(downKey, children, 'brown')).toStrictEqual(arrayOfChildren[0]);
      });
    });
  });

  describe('when a non navigation key is passed as the first attribute', () => {
    it('then undefined should be returned', () => {
      expect(getNextChildByKey(18, children)).toBe(undefined);
    });
  });
});

function renderList(renderer = mount) {
  return renderer(
    <li>
      <span text='amber' value='amber' />
      <span text='blue' value='blue' />
      <span text='white' value='white' />
      <span text='black' value='black' />
      <span text='purple' value='purple' />
      <span text='brown' value='brown' />
    </li>
  );
}
