// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';

// Carbon
import Dropdown from 'components/dropdown';
import Form from 'components/form';
import Textbox from 'components/textbox';

// App Components
import ComponentCodeBuilder from './../../../utils/component-code-builder';
import Definitions from './../../../definitions';
import PageContentArea from '../../page-sections/page-content-area';
import SubPageChrome from '../../sub-page-chrome';

// Flux Components
import { connect } from 'utils/flux';
import ComponentActions from '../../../actions/component';
import ComponentStore from '../../../stores/component';

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
        <PageContentArea
          title='Preview'
          link={ `https://github.com/Sage/carbon/tree/master/src/components/${def.key}` }
        >
          { React.createElement(def.component, def.demoProps) }
        </PageContentArea>
        <PageContentArea>
          <code>
            { this._buildCode(def) }
          </code>
          <form>
            { this._buildFields(def) }
          </form>
        </PageContentArea>
        <PageContentArea title='Designer Notes'>
          { def.text.details }
        </PageContentArea>
      </SubPageChrome>
    );
  }

  /**
   * builds code output
   *
   * @private
   * @method _buildCode
   * @param {Object} def - definition
   * @return {String} code string
   */
  _buildCode = (def) => {
    let codeObj = new ComponentCodeBuilder(def.text.name);

    for (var prop in def.demoProps) {
      codeObj.addProp(prop, def.demoProps[prop]);
    }

    return codeObj.toString();
  }

  /**
   * builds fields for dynamically editing props
   *
   * @private
   * @method _buildCode
   * @param {Object} def - definition
   * @return {String} code string
   */
  _buildFields = (def) => {
    let fieldObj = [];

    // get the props
    let demoProps = def.demoProps;

    // iterate over the demoProps
    let i = 0;

    for (var demoProp in demoProps) {
      let demoPropData = demoProps[demoProp],
          propOptions = def.propOptions ? def.propOptions[demoProp] : null;

      if (propOptions) {
        let opts = propOptions.map((option) => {
          return { id: option, name: option };
        });

        fieldObj[i] = (
          <Dropdown
            label={ demoProp }
            onChange={ ComponentActions.updateDefinition.bind(this, demoProp, this.props.name) }
            options={ ImmutableHelper.parseJSON(opts) }
            value={ demoPropData }
          />
        );
      } else {
        fieldObj[i] = (
          <Textbox
            label={ demoProp }
            onChange={ ComponentActions.updateDefinition.bind(this, demoProp, this.props.name) }
            value={ demoPropData }
          />
        );
      }

      i ++;
    }

    return fieldObj;
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

