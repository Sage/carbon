import React from 'react';
import DemoHelper from './demo-helper';

describe('definition', () => {
  describe("prepare demo props", () => {
    let stubbedDefaultProps = { a: 1 },
        stubbedDemoProps =    { b: 2 };

    it("uses the definition props in the demo props, setting them as empty strings as default", () => {
      let stubbedDefinition = {
        props: { a: null }
      };

      expect(DemoHelper.prepareDemoProps(stubbedDefinition)).toEqual({ a: '' });
    });

    it("over-rides the definition props with any default props handed in (replaces or adds)", () => {
      let stubbedDefinition = {
            props: { a: null, b: null, c: null }
          },
          stubbedDefaultProps = {
            a: 1,
            b: 2
          };

      expect(DemoHelper.prepareDemoProps(stubbedDefinition, stubbedDefaultProps)).toEqual({ a: 1, b: 2, c: '' });
    });
  });
});
