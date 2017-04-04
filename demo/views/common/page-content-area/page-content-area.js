import React from 'react';
import classNames from 'classnames';

import SimpleHeading from './../../../components/simple-heading';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
export default props => (
  <section className={ classNames(props.className, 'demo-page-content-area') }>
    <SimpleHeading title={ props.title } link={ props.link } />
    <div className='demo-page-content-area__content'>
      { props.children }
    </div>
  </section>
);
