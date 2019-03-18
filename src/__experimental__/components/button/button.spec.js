import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Icon from 'components/icon';
import Button from '.';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import BaseTheme from '../../../style/themes/base';
import baseTheme from '../../../style/themes/base';

function render(props, renderer = shallow) {
  return renderer(
    <Button { ...props } />
  );
}

describe('Button', () => {
  describe('when setting the "as" prop', () => {
    it('sets the color variant to "secondary" when nothing is passed', () => {

    });

    it('sets the color variant to "primary"', () => {

    });

    it('sets the color variant to "secondary"', () => {

    });

    it('sets the color variant to "tertiary"', () => {

    });

    it('sets the color variant to "destructive"', () => {

    });

    it('sets the color variant to "darkBackground"', () => {

    });
  });

  describe('when the "disabled" prop is passed and "as" is not set', () => {
    it('sets the color variant to "secondary/disabled"', () => {

    });
  });

  describe('when the no props are passed except children', () => {
    // it('"', () => {
    //   const wrapper = render({ children: 'Foo' });
    //   console.log(wrapper.debug());
    //   expect(wrapper
    //     .contains(
    //       <Button
    //         renderAs='secondary'
    //         size='medium'
    //         disabled={ false }
    //         role='button'
    //         onClick={ undefined }
    //         iconPosition=''
    //         medium
    //       >
    //         Foo
    //       </Button>
    //     )).toBeTruthy();

    it('sets the default variants to "secondary" and "medium"', () => {
      // const wrapper = render({ children: 'foo' }, TestRenderer.create).toJSON();
      // console.log(wrapper);
      // assertStyleMatch({
      //   background: 'transparent',
      //   borderColor: baseTheme.colors.primary,
      //   color: baseTheme.colors.primary,
      //   fontSize: '14px',
      //   height: '40px',
      //   paddingLeft: '24px',
      //   paddingRight: '24px'
      // }, wrapper);
      expect(render({ children: 'mock content' }, TestRenderer.create)).toMatchSnapshot();
    });
  });
});
