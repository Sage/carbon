import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import FieldHelp from './field-help.component';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

function render(props) {
  return TestRenderer.create(<FieldHelp { ...props }>help text</FieldHelp>);
}

describe('FieldHelp', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  describe('when initiated with labelInline prop set to true and inputWidth prop with a custom value', () => {
    it('has "margin-left" style set to width and both sides of margin', () => {
      const wrapper = render({
        labelInline: true,
        inputWidth: 50,
        theme: {
          input: {
            fieldHelp: {
              marginSide: '5px'
            }
          }
        }
      });

      assertStyleMatch({
        alignSelf: 'center',
        marginLeft: 'calc(50% + 5px + 5px)',
        paddingLeft: '0'
      }, wrapper.toJSON());
    });
  });
});
