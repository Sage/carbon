import React from 'react';
import classNames from 'classnames';

import buildPrevNextFromDefinition from './build-prev-next-from-definition';
import buildPrevNextFromReactRouter from './build-prev-next-from-react-router';
import ArrowLink from './../../../components/arrow-link';

/**
 * Creates a Link wrapped HTML component that renders a label with prefix and an arrow icon
 *
 * @param {object} props Component props
 * @param {String} props.previousPage - object containing a label and an href for the previous page
 * @param {String} props.nextPage - as above, but for next
 * @return {SubPageNavigation}
 */
export default props => (
  <nav className='demo-sub-page-navigation'>
    { _buildLinks(props.definition, props.availableRoutes, props.currentLocation) }
  </nav>
);

/**
 * builds a wrapped link with an arrow
 *
 * @method _link()
 * @param {Object} page
 * @param {String} prefix
 * @return {<span>}
 */
const _link = (href, name, prefix) => {
  if (href) {
    const direction = prefix === 'next' ? 'forwards' : 'backwards';

    return (
      <span className={ _classnames(prefix) } key={ prefix }>
        <ArrowLink
          direction={ direction }
          href={ href }
          prefix={ prefix }
          name={ name }
        />
      </span>
    );
  }
};

const _classnames = (classSuffix) => {
  return classNames(
    'demo-sub-page-navigation__link',
    `demo-sub-page-navigation__${classSuffix}`
  );
};

const _buildLinks = (definition, availableRoutes, currentLocation) => {
  let urls;

  if (definition) {
    urls = buildPrevNextFromDefinition(definition);
  } else {
    urls = buildPrevNextFromReactRouter(availableRoutes, currentLocation);
  }

  if (!urls) { return null; }

  return ([
    _link(urls.prev.url, urls.prev.title, 'previous'),
    _link(urls.next.url, urls.next.title, 'next')
  ]);
};
