import React from 'react';
import classNames from 'classnames';

import Heading from 'components/heading';

import Wrapper from '../../chrome/wrapper';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
export default props => (
  <section className='demo-page-content-area'>
    <Wrapper>
      <Heading title={ props.title }></Heading>
      <div className='demo-page-content-area__content'>
        { props.children }
      </div>
    </Wrapper>
  </section>
);
