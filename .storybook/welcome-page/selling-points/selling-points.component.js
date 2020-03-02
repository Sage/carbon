import React from 'react';
import I18n from 'i18n-js';
import { Wrapper, SellingPoint } from './selling-points.style';
import Item from './selling-points-item.component';
import Panel from './selling-point-panel.component';
import Heading from '../components-demo/component-heading';
import {
  ContentWrapper
} from '../common.style';

const SellingPointsGrid = () => (
  <div>
    <ContentWrapper>
      <Heading
        title={ I18n.t('homepage.selling_points.heading') }
        titleSuffix={ I18n.t('homepage.selling_points.heading_suffix') }
        divider
        centerAlign
        text={ I18n.t('homepage.selling_points.text') }
      />        
    </ContentWrapper>
    <Wrapper>
      <ItemsWrapper>
        { Items() }
      </ItemsWrapper>
    </Wrapper>
  </div>
);

const ItemsWrapper = ({ columns, children }) => (
  <SellingPoint columns={ columns }>
    { children }
  </SellingPoint>
);

const Items = () => {
  return ['point', 'flexible', 'brush', 'hammer', 'plug', 'collaborate'].map((item) => {
    return (
      <Item key={ item }>
        <Panel
          icon={ item }
          heading={ I18n.t(`homepage.selling_points.${ item }.heading`) }
          text={ I18n.t(`homepage.selling_points.${ item }.text`) }
        />
      </Item>
    );
  });
};

export default SellingPointsGrid;
