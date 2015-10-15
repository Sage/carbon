import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Textbox from './index';

describe('Textbox', () => {
  var instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Textbox
      name="Dummy Box"
      value={ 'foo' }
      label={ 'Label' }
      onchange={ jasmine.createSpy('dummy') }
      />);
  });

  describe('render', () => {
    it('renders with a visible input', () => {
      var input = instance.refs.visible;
      expect(input.tagName).toEqual("INPUT");
      expect(input.label).toBe('Label');
    });
  });
});
