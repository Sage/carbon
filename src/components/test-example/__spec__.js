import React from 'react';
import { shallow } from 'enzyme';
import TestExample from './test-example';

import { _ } from 'lodash';

import initialState from './state--initial';
import hiddenButtons from './state--hide-buttons';

let testStructure = (wrapper, comp) => {
  let components = wrapper.find(comp.component);

  let expectedInstances = comp.instances.reduce((a, b) => a + b.expectedInstances, 0),
      instanceArray = comp.instances,
      wrapperNodes = components.nodes.map(n => n.props);

  // correct number of elements are rendered
  describe(`${expectedInstances} ${comp.component.displayName}${expectedInstances > 1 ? 's' : ''}`, () => {
    it(``, () => {
      expect(components.length).toEqual(expectedInstances);
    });

    // check we can find all this elements instances in the wrapper nodes
    describe(`where`, () => {
      instanceArray.forEach((instance) => {
        it(`${instance.expectedInstances} ${instance.expectedInstances > 1 ? 'have' : 'has'} props: ${JSON.stringify(instance.props)}`, () => {
          expect(_.filter(wrapperNodes, instance.props).length).toEqual(instance.expectedInstances);
        });
      });
    });
  });
};

fdescribe('TestExample', () => {
  describe('default render', () => {
    let wrapper = shallow(
      <TestExample
        heading='Test'
        url='http://test.com'
        showButtons={ true }
        startCount='10'
      />
    );
    initialState.forEach(testStructure.bind(this, wrapper));
  });

  describe("rendered without buttons", () => {
    let wrapper = shallow(
      <TestExample
        heading='Test'
        url='http://test.com'
        showButtons={ false }
        startCount='10'
      />
    );
    hiddenButtons.forEach(testStructure.bind(this, wrapper));
  });
});

// Now test interactions
