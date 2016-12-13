import React from 'react';
import classNames from 'classnames';

import Icon from 'components/icon';
import Link from 'components/link';

/**
 * Creates a Link wrapped HTML component that renders a label with prefix and an arrow icon
 *
 * @param {object} props
 * @param {String} props.direction which way the link points: `backwards` or `forwards`
 * @param {object} props.linkDetails
 * @param {String} props.linkDetails.href
 * @param {String} props.linkDetails.label
 * @param {String} props.prefix prefix text label (i.e. 'Next' or 'Previous')
 * @return {ArrowLink}
 */
export default props => (
  <Link href={ props.linkDetails.href }>
    <div className={ `demo-arrow-link demo-arrow-link--${props.direction}` }>
      <div className='demo-arrow-link__text'>
        <span className='demo-arrow-link__prefix'>{ props.prefix }</span>
        <span className='demo-arrow-link__label'>{ props.linkDetails.label }</span>
      </div>
      <Icon
        className='demo-arrow-link__icon'
        type={ props.direction === 'forwards' ? 'arrow_right' : 'arrow_left' }
      />
    </div>
  </Link>
);
