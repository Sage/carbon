import React from 'react';

import ColorPanel from '../../components/color-panel';
import ContentGrid from '../../components/content-grid';
import ContentGridItem from '../../components/content-grid/content-grid-item';
import Download from '../../page-sections/download';
import PageContentArea from '../../page-sections/page-content-area';
import SubPageChrome from '../../sub-page-chrome';

import ColorList from './color-list';

export default props => (
  <SubPageChrome
    previousPage={ {
      label: 'Fonts',
      href: '/fonts' } }
    nextPage={ {
      label: 'Icons',
      href: '/icons' } }
  >
    <Download
      href='test'
      label='test'
      size='test'
      type='test'
    />
    { _colorGrid() }
  </SubPageChrome>
);

const _colorGrid = () => {
  return ColorList.map((colors, i) =>
    <PageContentArea key={ i } title={ colors.name }>
      <ContentGrid>
        { _colorGridItems(colors) }
      </ContentGrid>
    </PageContentArea>
  );
}

const _colorGridItems = (colors) => {
  return colors.children.map((color, i) =>
    <ContentGridItem key={ i } className='demo-content-grid__item'>
      <ColorPanel color={ color } />
    </ContentGridItem>
  )
}
