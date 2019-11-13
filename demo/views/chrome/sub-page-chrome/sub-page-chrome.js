import React from 'react';

import { connect } from 'carbon-state-management/lib/flux';
import { titleize, humanize } from 'underscore.string';
import I18n from 'i18n-js';

// Demo Site
import PageHeaderSmall from './../../common/page-header-small';
import SubPageNavigation from './../../common/sub-page-navigation';

import Wrapper from './../../common/wrapper';

/**
 * wraps the sub-pages in some further chrome items
 *
 * @param {object} props.children immediately rendered
 * @param {object} props.previousPage page object with a name and URL for the scroller
 * @param {object} props.nextPage see `previousPage` above
 * @return {SubPageChrome}
 */
class SubPageComponent extends React.Component {
  render() {
    return (
      <article className='sub-page-chrome'>
        <PageHeaderSmall
          subtitle={ this.subtitle() }
          title={ this.name() }
        />

        <Wrapper>
          { this.props.children }

          <SubPageNavigation
            availableRoutes={ this.props.routes }
            currentLocation={ this.props.location }
          />
        </Wrapper>
      </article>
    );
  }

  name = () => {
    const name = this._hasNameParam() ? this.props.params.name : this._getLastPartOfLocation();
    return titleize(humanize(name));
  }

  subtitle = () => {
    let scope = this.props.location.pathname.replace(/\//g, ".").substr(1);
    return I18n.t(`${scope}.subtitle`, { defaultValue: '' });
  }

  _getLastPartOfLocation = () => {
    const parts = this.props.location.pathname.split('/');
    return parts[parts.length - 1];
  }

  _hasNameParam = () => {
    return this.props.params && this.props.params.name;
  }
}

export default SubPageComponent;
