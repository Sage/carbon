import React from 'react';
import { shallow, mount } from 'enzyme';
import Textbox from '.';
import InputIconToggle from '../input-icon-toggle';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import FormField from '../form-field';
import InputPresentation from '../input/input-presentation.component';
import { StyledLabelContainer } from '../label/label.style';
import StyledValidationIcon from '../../../components/validations/validation-icon.style';

jest.mock('../../../utils/helpers/guid', () => () => 'mocked-guid');

describe('Textbox', () => {
  it('renders with InputPresentation and Input and correct props passed to Input', () => {
    const wrapper = shallow(
      <Textbox value='foobar' leftChildren='southpaw children'>
        normal children
      </Textbox>
    ).dive().dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('supports a separate onClick handler passing for the icon', () => {
    const onClick = jest.fn();
    const iconOnClick = jest.fn();

    const wrapper = mount(
      <Textbox
        value='foobar'
        inputIcon='search'
        onClick={ onClick }
        iconOnClick={ iconOnClick }
      >
        normal children
      </Textbox>
    );
    const icon = wrapper.find(InputIconToggle);
    icon.simulate('click');
    expect(iconOnClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  describe('validation icon', () => {
    const validationTypes = ['error', 'warning', 'info'];
    it.each(validationTypes)('when %s prop passed as string render proper validation icon by the input', (type) => {
      const wrapper = mount(
        <Textbox label='Label' { ...{ [type]: 'Message' } } />
      );
      expect(wrapper.find(InputPresentation).find(StyledValidationIcon).exists()).toBe(true);
    });
    it.each(validationTypes)(`when %s prop passed as string and validationOnLabel
     as true render proper validation icon on the label`, (type) => {
      const wrapper = mount(
        <Textbox
          label='Label'
          { ...{ [type]: 'Message' } }
          validationOnLabel
        />
      );
      expect(wrapper.find(FormField).find(StyledValidationIcon).exists()).toBe(true);
    });
  });

  describe('style overrides', () => {
    let wrapper;
    const randomStyleObject = {
      backgroundColor: 'red',
      display: 'flex',
      fontSize: '200px'
    };
    const styleOverride = {
      root: randomStyleObject,
      input: randomStyleObject,
      label: randomStyleObject
    };

    beforeEach(() => {
      wrapper = mount(
        <Textbox label='test label' styleOverride={ styleOverride }>
          normal children
        </Textbox>
      );
    });

    it('renders root element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(FormField));
    });

    it('renders input element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(InputPresentation));
    });

    it('renders label element with properly assigned styles', () => {
      assertStyleMatch(randomStyleObject, wrapper.find(StyledLabelContainer));
    });
  });
});
