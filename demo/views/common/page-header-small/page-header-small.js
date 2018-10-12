import React from 'react';

import Pill from 'components/pill';

import Wrapper from './../wrapper';
import './page-header-small.scss';

/**
 * Creates a Link wrapped HTML component that renders a label with prefix and an arrow icon
 *
 * @param {object} props
 * @param {String} props.title
 * @param {String} props.subtitle
 * @return {PageHeaderSmall}
 */
export default props => (
  <header className='page-header-small'>
    <Wrapper>
      <h1 className='page-header-small__title'>
        { props.title }
        { _titleAppend(props.titleAppend) }
      </h1>
      <h2 className='page-header-small__subtitle'>{ props.subtitle }</h2>
    </Wrapper>
  </header>
);

/**
 * outputs the title append as a Pill
 *
 * @method _titleAppend
 * @param {String} append
 * @return {Pill} wrapper title append (or null if it doesn't exist)
 */
const _titleAppend = (append) => {
  if (append) {
    return <Pill as='help'>{ append }</Pill>;
  }
}
