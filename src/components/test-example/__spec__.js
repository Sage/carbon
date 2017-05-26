import React from 'react';
import { shallow } from 'enzyme';
import TestExample from './test-example';

import Button from 'components/button';
import Content from 'components/content';
import Heading from 'components/heading';
import Link from 'components/link';

import { _ } from 'lodash';

let specDefinition = [
  {
    component: Button,
    instances: [ {
      expectedInstances: 1,
      props: { as: 'primary',   children: 'Click me', theme: 'blue' }
    }, {
      expectedInstances: 1,
      props: { as: 'secondary', children: 'Go back',  theme: 'grey' }
    } ]
  }, {
    component: Heading,
    instances: [ {
      expectedInstances: 1,
      props: { divider: true, title: 'Test' }
    } ]
  }, {
    component: Link,
    instances: [ {
      expectedInstances: 1,
      props: { href: 'http://test.com' }
    } ]
  }, {
    component: Content,
    instances: [ {
      expectedInstances: 3,
      props: { title: 'Counter', children: 11 }
    } ]
  }
];

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
  describe('renders', () => {
    let wrapper = shallow(
      <TestExample
        heading='Test'
        url='http://test.com'
        startCount='10'
      />
    );
    specDefinition.forEach(testStructure.bind(this, wrapper));
  });
});

// Now test interactions
