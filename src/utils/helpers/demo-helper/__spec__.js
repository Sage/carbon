import React from 'react';
import { shallow } from 'enzyme';
import DemoHelper from './demo-helper';

describe('DemoHelper', () => {
  describe(".elemArray()", () => {
    let array,
        count = 2,
        stubbedDefinition;

    beforeAll(() => {
      stubbedDefinition = {
        demoProps: { title: 'Title' },
        text: { name: 'test' }
      }
    });

    it("returns a single element (not an array) if count === 1", () => {
      let elem = DemoHelper.elemArray(stubbedDefinition, 1);
      expect(typeof elem).not.toEqual('array');
    });

    it("returns an array with count elements", () => {
      array = DemoHelper.elemArray(stubbedDefinition, count);
      expect(array.length).toEqual(count);
    });

    it("will add a unique prop of the given value to each component", () => {
      array = DemoHelper.elemArray(stubbedDefinition, count, 'addition');
      array.map((comp, i) => {
        expect(comp.props.addition).toEqual(`test-${i+1}`);
      });
    });
  });
});
