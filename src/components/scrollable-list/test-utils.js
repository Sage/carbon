import React from 'react';
import { makeArray } from '../../__spec_helper__/test-utils';
import ScrollableListItem from './scrollable-list-item.component';

const listItemReducer = ({ nonSelectables = [], customSelectables = [] }) => {
  // generate jsx for selectable list items, based on indexes in config
  return (acc, item, index) => {
    if (nonSelectables.includes(item)) return [...acc, <div />];
    if (customSelectables.includes(item)) return [...acc, <div isSelectable />];

    return [...acc, <ScrollableListItem id={ index } />];
  };
};

const renderListItems = (opts) => {
  return makeArray(opts.num).reduce(listItemReducer(opts), []);
};

export default renderListItems;
