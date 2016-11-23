import React from 'react';
import classNames from 'classnames';

import ArrowLink from '../../components/arrow-link';
import Wrapper from '../../chrome/wrapper';

/**
 * Creates a Link wrapped HTML component that renders a label with prefix and an arrow icon
 *
 * @param {object} props Component props
 * @param {String} props.previousPage - object containing a label and an href for the previous page
 * @param {String} props.nextPage - as above, but for next
 * @return {SubPageNavigation}
 */
export default props => (
  <Wrapper>
    <nav className='demo-sub-page-navigation'>
      { _link(props.previousPage, 'previous') }
      { _link(props.nextPage,     'next') }
    </nav>
  </Wrapper>
);

/**
 * builds a wrapped link with an arrow
 *
 * @method _link()
 * @param {Object} page
 * @param {String} prefix
 * @return {<span>}
 */
const _link = (page, prefix) => {
  if (page) {
    let direction = prefix === 'next' ? 'forwards' : 'backwards'
    return (
      <span className={ _classnames(prefix) }>
        <ArrowLink
          direction={ direction }
          linkDetails={ page }
          prefix={ prefix }
        />
      </span>
    );
  }
}

const _classnames = (classSuffix) => {
  return classNames(
    'demo-sub-page-navigation__link',
    `demo-sub-page-navigation__${classSuffix}`
  );
}
