import React from 'react';
import classNames from 'classnames';

import Heading from 'components/heading';
import Link from 'components/link';

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
        { _gitHubLink(props.link) }
        { props.children }
      </div>
    </Wrapper>
  </section>
);

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
      >
        View on GitHub
      </Link>
    );
  }
}
