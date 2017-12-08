import React from 'react';
import { shallow, ReactWrapper } from 'enzyme';
import ReactPortal from 'react-portal';
import Textbox from './textbox';

describe('Textbox', () => {
  let wrapper;
  let spy = jasmine.createSpy('spy')

  beforeEach(() => {
    wrapper = shallow(
      <Textbox
        name='my-textbox-name'
        id='my-unique-textbox'
        value={ 'foo' }
        label={ 'Label' }
        data-element='bar'
        data-role='baz'
        onChange={ spy }
      />
    );
  });

  describe('render', () => {
    it('renders correctly ', () => {
      expect(wrapper.nodes).toMatchSnapshot();
    });

    it('is decorated with a validation if a error is present', () => {
      wrapper.instance().setState({errorMessage: 'Error', valid: false});
      const portalContent = new ReactWrapper(
        wrapper.find(ReactPortal).prop('children')
      );
      expect(portalContent.find('.common-input__message--error').text())
        .toEqual('Error');
    });
  });

  describe('Passing a custom onChange', () => {
    it('triggers the custom function', () => {
      wrapper.find('input').simulate('change');
      expect(spy).toHaveBeenCalled();
    });
  });
});
