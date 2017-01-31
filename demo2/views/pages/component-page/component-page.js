// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';
import I18n from 'i18n-js';

// App Components
import Definitions from './../../../definitions';
import PageContentArea from '../../page-sections/page-content-area';
import SubPageChrome from '../../sub-page-chrome';
import ComponentPreview from '../../page-sections/component-preview';

// Flux Components
import { connect } from 'utils/flux';
import ComponentActions from '../../../actions/component';
import ComponentStore from '../../../stores/component';

import DemoHelper from 'utils/helpers/demo-helper';

let definitionKeys = Object.keys(Definitions).sort();

class ComponentPage extends React.Component {
  render() {
    let def = this.state.componentStore.get(this.props.name);
    let position = this._componentPosition(def);

    return (
      <SubPageChrome
        subtitle={ def.getIn(['text', 'description']) }
        title={ def.getIn(['text', 'name']) }
        titleAppend={ def.getIn(['text', 'type']) }
        previousPage={ this._prepareSubnavObject(this._previousComponent(position)) }
        nextPage={ this._prepareSubnavObject(this._nextComponent(position)) }
      >
        <ComponentPreview definition={ def } name={ this.props.name } />
        <PageContentArea title={ I18n.t('component_page.design_notes') }>
          { def.getIn(['text', 'details']) }
        </PageContentArea>
      </SubPageChrome>
    );
  }

  /**
   * gets the component array position for populating next and previous
   *
   * @private
   * @method _componentPosition
   * @param {Object} definition
   * @return {Number} position of the component in the array
   */
  _componentPosition = (def) => {
    return definitionKeys.indexOf(def.get('key'));
  }

  /**
   * cyclically retrieves next component
   *
   * @private
   * @method _nextComponent
   * @param {Number} current - current position
   * @return {Object} Definitions element
   */
  _nextComponent = (current) => {
    let pos = (current + 1) % definitionKeys.length;

    return Definitions[definitionKeys[pos]];
  }

  /**
   * cyclically retrieves previous component
   *
   * @private
   * @method _previousComponent
   * @param {Number} current - current position
   * @return {Object} Definitions element
   */
  _previousComponent = (current) => {
    let pos = current === 0
      ? definitionKeys.length - 1
      : current - 1;

    return Definitions[definitionKeys[pos]];
  }

  /**
   * prepares an object for sub navigation, using href and name keys, from a definition
   *
   * @private
   * @method _prepareSubnavObject
   * @param {Object} def - a component definition
   * @return {Object}
   */
  _prepareSubnavObject = (def) => {
    let text = def.text;

    return {
      name: def.text.name,
      href: `/components/${def.key}`
    };
  }
}

export default connect(ComponentPage, ComponentStore);

