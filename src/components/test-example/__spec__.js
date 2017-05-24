import React from 'react';
import { shallow } from 'enzyme';
import TestExample from './test-example';

import Button from 'components/button';
import Heading from 'components/heading';
import Link from 'components/link';

fdescribe('TestExample', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <TestExample
        heading='Test'
        url='http://test.com'
      />
    );
  });

  describe('structure', () => {
    it("is rendered", () => {
      [
        { component: Button,  instances: [ { as: 'primary',   children: 'Click me', theme: 'blue' },
                                           { as: 'secondary', children: 'Go back',  theme: 'grey' } ] },
        { component: Heading, instances: [ { divider: true, title: wrapper.props('heading') } ] },
        { component: Link,    instances: [ { href: wrapper.props('url') } ] }
      ].forEach((elem) => {
        // element exists
        let elemSet = wrapper.find(elem.component);

        // correct number of elements are rendered
        expect(elemSet.length).toEqual(elem.instances.length);

        // an element is returned with the props as defined in instances
        // (a subset of props, rather than exact equivalence)
        elem.instances.forEach((instance) => {
          // code to be written
        });
      });
    });
  });
});
