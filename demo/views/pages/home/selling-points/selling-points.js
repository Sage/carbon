import React from 'react';
import I18n from 'i18n-js';

import ComplexHeading from './../../../../components/complex-heading';
import ContentGrid from './../../../../components/content-grid';
import ContentGridItem from './../../../../components/content-grid/content-grid-item';
import SellingPointPanel from './../../../../components/selling-point-panel';
import Wrapper from './../../../common/wrapper';
import './selling-points.scss';

/**
 * A set of icons representing selling points of Carbon
 *
 * @param {object} props
 * @return {SellingPoints}
 */
export default props => (
  <div className='selling-points'>
    <Wrapper>
      <ComplexHeading
        heading={ I18n.t('homepage.selling_points.heading') }
        headingSuffix={ I18n.t('homepage.selling_points.heading_suffix') }
        text={ I18n.t('homepage.selling_points.text') }
        align='center'
      />
      <ContentGrid>
        { gridItems() }
      </ContentGrid>
    </Wrapper>
  </div>
);

const gridItems = () => {
  return ['point', 'flexible', 'brush', 'hammer', 'plug', 'collaborate'].map((item) => {
    return (
      <ContentGridItem key={ item }>
        <SellingPointPanel
          icon={ item }
          heading={ I18n.t(`homepage.selling_points.${ item }.heading`) }
          text={ I18n.t(`homepage.selling_points.${ item }.text`) }
        />
      </ContentGridItem>
    );
  });
}
