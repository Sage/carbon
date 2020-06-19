/* eslint-disable max-len */
import React from 'react';
import { object, withKnobs } from '@storybook/addon-knobs';
import Pod from '../pod';
import { GridContainer, GridItem } from '.';

export const basic = () => {
  const group = 'GridItem';
  const viewportSettings = 'viewport settings';
  const groupID1 = `${group} 1`;
  const groupID2 = `${group} 2`;
  const groupID3 = `${group} 3`;

  const item11500 = object(
    `${viewportSettings} (i)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 7,
      justifySelf: 'stretch',
      maxWidth: '1500px',
      rowStart: 1,
      rowEnd: 1
    },
    groupID1
  );

  const item11300 = object(
    `${viewportSettings} (ii)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 13,
      justifySelf: 'stretch',
      maxWidth: '1300px',
      rowStart: 1,
      rowEnd: 1
    },
    groupID1
  );

  const item1900 = object(
    `${viewportSettings} (iii)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 9,
      justifySelf: 'stretch',
      maxWidth: '900px',
      rowStart: 2,
      rowEnd: 2
    },
    groupID1
  );

  const item21500 = object(
    `${viewportSettings} (i)`,
    {
      alignSelf: 'stretch',
      colStart: 7,
      colEnd: 13,
      justifySelf: 'stretch',
      maxWidth: '1500px',
      rowStart: 1,
      rowEnd: 1
    },
    groupID2
  );

  const item21300 = object(
    `${viewportSettings} (ii)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 13,
      justifySelf: 'stretch',
      maxWidth: '1300px',
      rowStart: 2,
      rowEnd: 2
    },
    groupID2
  );

  const item2900 = object(
    `${viewportSettings} (iii)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 9,
      justifySelf: 'stretch',
      maxWidth: '900px',
      rowStart: 3,
      rowEnd: 3
    },
    groupID2
  );

  const item31500 = object(
    `${viewportSettings} (i)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 13,
      justifySelf: 'stretch',
      maxWidth: '1500px',
      rowStart: 2,
      rowEnd: 2
    },
    groupID3
  );

  const item31300 = object(
    `${viewportSettings} (ii)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 13,
      justifySelf: 'stretch',
      maxWidth: '1300px',
      rowStart: 3,
      rowEnd: 3
    },
    groupID3
  );

  const item3900 = object(
    `${viewportSettings} (iii)`,
    {
      alignSelf: 'stretch',
      colStart: 1,
      colEnd: 9,
      justifySelf: 'stretch',
      maxWidth: '900px',
      rowStart: 1,
      rowEnd: 1
    },
    groupID3
  );

  const item1Child = (
    <Pod
      alignTitle='left' as='primary'
      border padding='medium'
      podType='primary'
    >
      GridItem 1.
    </Pod>
  );

  const item2Child = (
    <Pod
      alignTitle='left' as='primary'
      border padding='medium'
      podType='primary'
    >
      GridItem 2.
    </Pod>
  );

  const item3Child = (
    <Pod
      alignTitle='left' as='primary'
      border padding='medium'
      podType='primary'
    >
      GridItem 3.
    </Pod>
  );

  return (
    <GridContainer>
      <GridItem responsiveSettings={ [item11500, item11300, item1900] }>{item1Child}</GridItem>
      <GridItem responsiveSettings={ [item21500, item21300, item2900] }>{item2Child}</GridItem>
      <GridItem responsiveSettings={ [item31500, item31300, item3900] }>{item3Child}</GridItem>
    </GridContainer>
  );
};

basic.story = {
  name: 'basic',
  parameters: {
    info: { disable: true },
    docs: { page: null },
    chromatic: { viewports: [1500, 1300, 900] }
  }
};

export const Visual = () => {
  return (
    <div>
      <GridContainer>
        <GridItem
          alignSelf='stretch'
          justifySelf='stretch'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            1
          </Pod>
        </GridItem>
        <GridItem
          alignSelf='stretch'
          justifySelf='stretch'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            2
          </Pod>
        </GridItem>
        <GridItem
          alignSelf='stretch'
          justifySelf='stretch'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem
          alignSelf='stretch'
          justifySelf='left'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            1
          </Pod>
        </GridItem>
        <GridItem
          alignSelf='stretch'
          justifySelf='center'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            2
          </Pod>
        </GridItem>
        <GridItem
          alignSelf='stretch'
          justifySelf='right'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem
          alignSelf='end'
          justifySelf='left'
          gridColumnStart='1'
          gridColumnEnd='1'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            1
          </Pod>
        </GridItem>
        <GridItem
          alignSelf='stretch'
          justifySelf='center'
          gridColumnStart='2'
          gridColumnEnd='2'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
            style={ { height: '100px' } }
          >
            2
          </Pod>
        </GridItem>
        <GridItem
          alignSelf='stretch'
          justifySelf='right'
          gridColumnStart='1'
          gridColumnEnd='1'
          gridRowStart='2'
          gridRowEnd='2'
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            3
          </Pod>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem responsiveSettings={ [
          {
            maxWidth: '1500px',
            colStart: 1,
            colEnd: 7,
            rowStart: 1,
            rowEnd: 1,
            alignSelf: 'stretch',
            justifySelf: 'stretch'
          }, {
            maxWidth: '1300px',
            colStart: 1,
            colEnd: 13,
            rowStart: 1,
            rowEnd: 1,
            alignSelf: 'stretch',
            justifySelf: 'stretch'
          }, {
            maxWidth: '900px',
            colStart: 1,
            colEnd: 9,
            rowStart: 2,
            rowEnd: 2,
            alignSelf: 'stretch',
            justifySelf: 'stretch'
          }] }
        >
          <Pod
            alignTitle='left' as='primary'
            border padding='medium'
            podType='primary'
          >
            1
          </Pod>
        </GridItem>
        <GridItem responsiveSettings={ [
          {
            maxWidth: '1500px',
            colStart: 7,
            colEnd: 13,
            rowStart: 1,
            rowEnd: 1,
            alignSelf: 'stretch',
            justifySelf: 'stretch'
          }, {
            maxWidth: '1300px',
            colStart: 1,
            colEnd: 13,
            rowStart: 2,
            rowEnd: 2,
            alignSelf: 'stretch',
            justifySelf: 'stretch'
          }, {
            maxWidth: '900px',
            colStart: 1,
            colEnd: 9,
            rowStart: 3,
            rowEnd: 3,
            alignSelf: 'stretch',
            justifySelf: 'stretch'
          }] }
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            2
          </Pod>
        </GridItem>
        <GridItem
          responsiveSettings={ [
            {
              maxWidth: '1500px',
              colStart: 1,
              colEnd: 13,
              rowStart: 2,
              rowEnd: 2,
              alignSelf: 'stretch',
              justifySelf: 'stretch'
            }, {
              maxWidth: '1300px',
              colStart: 1,
              colEnd: 13,
              rowStart: 3,
              rowEnd: 3,
              alignSelf: 'stretch',
              justifySelf: 'stretch'
            }, {
              maxWidth: '900px',
              colStart: 1,
              colEnd: 9,
              rowStart: 1,
              rowEnd: 1,
              alignSelf: 'stretch',
              justifySelf: 'stretch'
            }] }
        >
          <Pod
            alignTitle='left'
            as='primary'
            border
            padding='medium'
            podType='primary'
          >
            3
          </Pod>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Visual.story = {
  name: 'visual',
  parameters: {
    info: { disable: true },
    docs: { page: null },
    chromatic: { viewports: [1500, 1300, 900] }
  }
};

export default {
  title: 'Test/Grid',
  component: GridContainer,
  decorators: [withKnobs],
  chromatic: {
    disable: true
  }
};
