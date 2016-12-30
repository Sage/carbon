// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';

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

    if (def.toJS) { def = def.toJS(); }

    let position = this._componentPosition(def);

    return (
      <SubPageChrome
        subtitle={ def.text.description }
        title={ def.text.name }
        titleAppend={ def.text.type }
        previousPage={ this._prepareSubnavObject(this._previousComponent(position)) }
        nextPage={ this._prepareSubnavObject(this._nextComponent(position)) }
      >
        <ComponentPreview definition={ def } name={ this.props.name } />
        <PageContentArea title='Designer Notes'>
          { def.text.details }
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
    return definitionKeys.indexOf(def.key);
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
    let pos = current === definitionKeys.length - 1
      ? 0
      : current + 1;

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
    return {
      name: def.text.name,
      href: `/components/${def.key}`
    };
  }
}

export default connect(ComponentPage, ComponentStore);

