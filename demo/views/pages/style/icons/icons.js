import React from 'react';
import I18n from 'i18n-js';

import IconPanel from './../../../../components/icon-panel';
import ContentGrid from './../../../../components/content-grid';
import ContentGridItem from './../../../../components/content-grid/content-grid-item';
import PageContentArea from './../../../common/page-content-area';

import IconList from './icon-list';

export default props => (
  <div>
    { _iconGrid() }
  </div>
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
