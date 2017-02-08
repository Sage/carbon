import React from 'react';
import I18n from 'i18n-js';

import ColorPanel from './../../../../components/color-panel';
import ContentGrid from './../../../../components/content-grid';
import ContentGridItem from './../../../../components/content-grid/content-grid-item';
import PageContentArea from './../../../common/page-content-area';

import ColorList from './../../../../utils/generated/colors';

export default props => (
  <div>
    { _colorGrid() }
  </div>
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
