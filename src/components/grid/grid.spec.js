import React from 'react';
import { mount as enzymeMount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { GridContainer, GridItem } from '.';

const item1900 = {
  colStart: 1,
  colEnd: 9,
  maxWidth: '900px',
  rowStart: 2,
  rowEnd: 2
};

const item11300 = {
  alignSelf: 'stretch',
  colStart: 1,
  colEnd: 13,
  justifySelf: 'stretch',
  maxWidth: '1300px',
  rowStart: 1,
  rowEnd: 1
};

const item11500 = {
  alignSelf: 'stretch',
  colStart: 1,
  colEnd: 7,
  justifySelf: 'stretch',
  maxWidth: '1500px',
  rowStart: 1,
  rowEnd: 1
};

const item2900 = {
  alignSelf: 'stretch',
  colStart: 1,
  colEnd: 9,
  justifySelf: 'stretch',
  maxWidth: '900px',
  rowStart: 3,
  rowEnd: 3
};

const item21300 = {
  colStart: 1,
  colEnd: 13,
  maxWidth: '1300px',
  rowStart: 2,
  rowEnd: 2
};

const item21500 = {
  alignSelf: 'stretch',
  colStart: 7,
  colEnd: 13,
  justifySelf: 'stretch',
  maxWidth: '1500px',
  rowStart: 1,
  rowEnd: 1
};

const item3900 = {
  alignSelf: 'stretch',
  colStart: 1,
  colEnd: 9,
  justifySelf: 'stretch',
  maxWidth: '900px',
  rowStart: 1,
  rowEnd: 1
};

const item31300 = {
  alignSelf: 'stretch',
  colStart: 1,
  colEnd: 13,
  justifySelf: 'stretch',
  maxWidth: '1300px',
  rowStart: 3,
  rowEnd: 3
};

const item31500 = {
  colStart: 1,
  colEnd: 13,
  maxWidth: '1500px',
  rowStart: 2,
  rowEnd: 2
};

const mount = (attachTo) => {
  return enzymeMount(
    <GridContainer id='testContainer'>
      <GridItem responsiveSettings={ [item11500, item11300, item1900] }>1</GridItem>
      <GridItem responsiveSettings={ [item21500, item21300, item2900] }>2</GridItem>
      <GridItem responsiveSettings={ [item31500, item3900, item31300] }>3</GridItem>
    </GridContainer>, { attachTo }
  );
};

describe('Grid', () => {
  describe('GridContainer', () => {
    it('renders as expected', () => {
      const elem = mount();
      expect(elem).toBeDefined();
    });

    it('renders as the css grid and applies the default style rules', () => {
      const elem = mount();
      assertStyleMatch(
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(12,1fr)',
          gridTemplateRows: 'auto',
          width: 'auto',
          margin: '40px',
          gridGap: '40px'
        }, elem
      );
    });

    it('requires a child', () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
      enzymeMount(
        <GridContainer />
      );
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        // eslint-disable-next-line max-len
        'Warning: Failed prop type: The prop `children` is marked as required in `GridContainer`, but its value is `undefined`.\n    in GridContainer'
      );
      global.console.error.mockReset();
    });

    it('rejects children if not GridItems', () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
      enzymeMount(
        <GridContainer><p>invalid children</p></GridContainer>
      );
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        // eslint-disable-next-line max-len
        'Warning: Failed prop type: Invalid prop `children` supplied to `GridContainer`.'
      );
      global.console.error.mockReset();
    });
  });
  describe('GridItem', () => {
    /* the aim here is not to test that CSS media queries work. we are simply */
    /* checking that styled components are built and applied correctly        */
    it('builds the style rules for the GridItem responsiveSettings', () => {
      expect(
        TestRenderer.create(
          <GridContainer id='testContainer'>
            <GridItem responsiveSettings={ [item11500, item11300, item1900] }>1</GridItem>
            <GridItem responsiveSettings={ [item21500, item21300, item2900] }>2</GridItem>
            <GridItem responsiveSettings={ [item31500, item3900, item31300] }>3</GridItem>
          </GridContainer>
        )
      ).toMatchSnapshot();
    });
  });
});
