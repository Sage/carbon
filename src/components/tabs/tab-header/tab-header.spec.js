import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import TabHeader from './tab-header.component';
import { elementsTagTest } from '../../../utils/helpers/tags/tags-specs/tags-specs';

function render(props) {
  return TestRenderer.create(
    <TabHeader title='Tab Title 1' id='uniqueid1' {...props}/>
  );
}

describe('TabHeader', () => {
  let wrapper;
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });
});
