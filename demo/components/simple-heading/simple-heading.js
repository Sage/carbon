import React from 'react';

import Link from 'components/link/link';
import './simple-heading.scss';

/**
 * Simple heading at h2 level with optional github link
 *
 * @param {String} props.title
 * @param {String} props.link
 * @return {SimpleHeading}
 */
export default props =>
  <h2 className='demo-simple-heading'>
    <span className='demo-simple-heading__title'>{ props.title }</span>
    <span className='demo-simple-heading__link'>{ _gitHubLink(props.link) }</span>
  </h2>
;

/**
 * builds a GitHub link
 *
 * @method _gitHubLink
 * @param {String} link
 * @return {Link} or null
 */
const _gitHubLink = (link) => {
  if (link) {
    return (
      <Link
        href={ link }
        icon='github'
        target='_blank'
      >
        View on GitHub
      </Link>
    );
  }
}
