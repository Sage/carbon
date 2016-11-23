import React from 'react';

import Wrapper from '../../chrome/wrapper';

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
      <h1 className='page-header-small__title'>{ props.title }</h1>
      <h2 className='page-header-small__subtitle'>{ props.subtitle }</h2>
    </Wrapper>
  </header>
);
