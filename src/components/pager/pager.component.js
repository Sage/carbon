import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerNavigationStyles,
  PagerSummaryStyles
} from './pager.styles';

const Pager = (props) => {
  return (
    <PagerContainerStyles>
      <PagerSizeOptionsStyles>Show 100 items</PagerSizeOptionsStyles>
      <PagerNavigationStyles>First Prev Next Last</PagerNavigationStyles>
      <PagerSummaryStyles>2000 items</PagerSummaryStyles>
    </PagerContainerStyles>
  );
}

Pager.propTypes = {

}

Pager.defaultProps = {
  pageSize: '10',
  showPageSizeSelection: false,
  pageSizeSelectionOptions: Immutable.fromJS([
    { id: '10', name: 10 },
    { id: '25', name: 25 },
    { id: '50', name: 50 }
  ])
}

export default Pager;
