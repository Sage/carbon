import React from 'react';

import IconPanel from '../../components/icon-panel';
import ContentGrid from '../../components/content-grid';
import ContentGridItem from '../../components/content-grid/content-grid-item';
import Download from '../../page-sections/download';
import PageContentArea from '../../page-sections/page-content-area';
import SubPageChrome from '../../sub-page-chrome';

import IconList from './icon-list';

export default props => (
  <SubPageChrome
    title='Icons'
    subtitle='Free open sourced icons to used in your project.'
    previousPage={ {
      label: 'Colors',
      href: '/colors' } }
    nextPage={ {
      label: 'Typography',
      href: '/typography' } }
  >
    <Download
      href='test'
      label='test'
      size='test'
      type='test'
    />
    { _iconGrid() }
  </SubPageChrome>
);

const _iconGrid = () => {
  return IconList.map((icons, i) =>
    <PageContentArea key={ i } title={ icons.name }>
      <ContentGrid columns='5'>
        { _iconGridItems(icons) }
      </ContentGrid>
    </PageContentArea>
  );
}

const _iconGridItems = (icons) => {
  return icons.children.map((icon, i) =>
    <ContentGridItem key={ i } className='demo-content-grid__item'>
      <IconPanel icon={ icon } />
    </ContentGridItem>
  )
}
