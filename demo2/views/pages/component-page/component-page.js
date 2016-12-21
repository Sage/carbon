// React
import React from 'react';
import ImmutableHelper from 'utils/helpers/immutable';

// Carbon
import Dropdown from 'components/dropdown';
import Form from 'components/form';
import Textbox from 'components/textbox';

// App Components
import ComponentCodeBuilder from './../../../utils/component-code-builder';
import ComponentList from '../../chrome/menu/component-list';
import PageContentArea from '../../page-sections/page-content-area';
import SubPageChrome from '../../sub-page-chrome';

// Flux Components
import { connect } from 'utils/flux';
import ComponentActions from '../../../actions/component';
import ComponentStore from '../../../stores/component';

class ComponentPage extends React.Component {
  componentDidMount() {
    ComponentActions.initialiseDefinition(this.props.definition);
  }

  render() {
    let def = this.state.componentStore.get('definition') || this.props.definition;

    if (def.toJS) { def = def.toJS(); }

    let position = this._componentPosition(def);

    return (
      <SubPageChrome
        subtitle={ def.text.description }
        title={ def.text.name }
        titleAppend={ def.text.type }
        previousPage={ ComponentList[this._previousComponent(position)] }
        nextPage={ ComponentList[this._nextComponent(position)] }
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
          propOptions = def.propOptions[demoProp];

      if (propOptions) {
        let opts = propOptions.map((option) => {
          return { id: option, name: option };
        });

        fieldObj[i] = (
          <Dropdown
            label={ demoProp }
            onChange={ ComponentActions.updateDefinition.bind(this, demoProp) }
            options={ ImmutableHelper.parseJSON(opts) }
            value={ demoPropData }
          />
        );
      } else {
        fieldObj[i] = (
          <Textbox
            label={ demoProp }
            onChange={ ComponentActions.updateDefinition.bind(this, demoProp) }
            value={ demoPropData }
          />
        );
      }

      i ++;
    }

    // if there are options

    //   if there are more than three options

    //     output dropdown

    //   else

    //     output radios

    //   end if

    // else

    //   output textbox

    // end if

    // let fieldObj = [];

    // let i = 0;

    // for (var prop in def.props) {
    //   let p = def.props.rop]);

    //   console.log(p.options);

    //   if (p.options) {
    //     fieldObj[i] = [];
    //     let j = 0;

    //     for (var opt in p.options) {
    //       fieldObj[i][j] = (<Textbox value={ opt } />);
    //     }
    //     j++;
    //   }
    //   i ++;
    // }

    return fieldObj;
  }

  /**
   * gets the component array position for propulating next and previous
   *
   * @private
   * @method _componentPosition
   * @param {Object} definition
   * @return {Number} position of the component in the array
   */
  _componentPosition = (definition) => {
    return ComponentList.findIndex((component) => {
      return component.href === definition.key;
    });
  }

  /**
   * cyclically retrieves next component
   *
   * @private
   * @method _nextComponent
   * @param {Number} current - current position
   * @return {Object} ComponentList element
   */
  _nextComponent = (current) => {
    return current === ComponentList.length - 1
      ? 0
      : current + 1;
  }

  /**
   * cyclically retrieves previous component
   *
   * @private
   * @method _previousComponent
   * @param {Number} current - current position
   * @return {Object} ComponentList element
   */
  _previousComponent = (current) => {
    return current === 0
      ? ComponentList.length - 1
      : current - 1;
  }
}

export default connect(ComponentPage, ComponentStore);

