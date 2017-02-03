// React
import { assign } from 'lodash';
import classNames from 'classnames';
import { List } from 'immutable';
import ImmutableHelper from 'utils/helpers/immutable';
import React from 'react';

// Carbon
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';
import Form from 'components/form';
import Textarea from 'components/textarea';
import Textbox from 'components/textbox';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';

import OptionsHelper from 'utils/helpers/options-helper';

// App Components
import ComponentCodeBuilder from './../../../../utils/component-code-builder';
import PageContentArea from './../../../common/page-content-area';
import Code from './../../../../components/code';

// Flux
import ComponentActions from './../../../../actions/component';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
class ComponentPreview extends React.Component {
  componentDidMount() {
    this.renderDemo();
  }

  render() {
    return (
      <PageContentArea
        title='Preview'
        link={ `https://github.com/Sage/carbon/tree/master/src/components/${this.props.definition.get('key')}` }
      >
        <div className= { `component-preview component-preview--${this.props.definition.get('key')}` }>
          <div className='component-preview__component-wrapper'>
            <div ref='demo' />
          </div>
          <div className='component-preview__interaction'>
            <form className='component-preview__controls'>
              { buildFields(this.props) }
            </form>

            { this.buildCode() }
          </div>
        </div>
      </PageContentArea>
    );
  }

  buildCode = () => {
    var code = new ComponentCodeBuilder(this.props.definition.getIn(['text', 'name']));
    code.addProps(this.props.definition.get('props'), this.props.definition.get('demoProps'));

    this.code = code.toComponent();

    if (this.refs.demo) {
      this.renderDemo();
    }

    // needs the first "return" line for syntax highlighting to work properly
    return <Code>{ code.toString() }</Code>
  }

  renderDemo = () => {
    ReactDOM.render(this.code, this.refs.demo);
  }
};

export default ComponentPreview;

/**
 * builds fields for dynamically editing props
 *
 * @private
 * @method buildCode
 * @param {Object} def - definition
 * @return {String} code string
 */
const buildFields = (props) => {
  let fieldObj = [];

  let demoProps = props.definition.get('props');
  let propOptions = props.definition.get('propOptions');
  let customData = props.definition.get('demoProps');

  demoProps.forEach((demoPropData, propKey) => {
    let options = propOptions ? propOptions.get(propKey) : null;
    demoPropData = customData.get(propKey) || demoPropData;
    if (typeof demoPropData === "function") {
      demoPropData = "";
    }

    if (showProp(propKey, demoPropData)) {
      // if (List.isList(demoPropData)) {
      //   demoPropData.map((field, i) => {
      //     fieldObj.push(fieldComponent(null, propKey, field, props.name, i));
      //   })
      // } else {
      fieldObj.push(fieldComponent(options, propKey, demoPropData, props.name));
      // }
    }
  });

  // let tableRows = [];
  //
  // demoProps.get('children').forEach((child) => {
  //   let childProps = child.get('demoProps'),
  //       tableCells = [],
  //       headerCells = [];
  //
  //   childProps.forEach((data, key) => {
  //     if (tableRows.length === 0) {
  //       headerCells.push(<TableHeader key={ key }>{ key }</TableHeader>);
  //     }
  //     tableCells.push(<TableCell key={ key }>{ data }</TableCell>);
  //   });
  //
  //   if (tableRows.length === 0) {
  //     tableRows.push(<TableRow>{ headerCells }</TableRow>);
  //   }
  //   tableRows.push(<TableRow>{ tableCells }</TableRow>);
  // });
  //
  // fieldObj.push(<Table>{ tableRows }</Table>);

  return fieldObj;
}

/**
 * creates a simple field
 *
 * @private
 * @method fieldComponent
 * @param {Object} propOptions
 * @param {string} propKey
 * @param {Object} demoPropData
 * @param {string} name
 * @return {Component}
 */
const fieldComponent = (propOptions, propKey, demoPropData, name, arrayPos = -1) => {
  let key =   arrayPos >= 0 ? `${propKey}-${arrayPos}`   : propKey,
      label = arrayPos >= 0 ? `${propKey} [${arrayPos}]` : propKey;

  let commonfieldProps = {
        key: key,
        label: label,
        onChange: ComponentActions.updateDefinition.bind(this, propKey, name, arrayPos),
        value: demoPropData
      },
      field = chooseField(propOptions, propKey, demoPropData);

  if (field === Dropdown) {
    commonfieldProps = assign(commonfieldProps, { options: getOptions(propOptions) });
  }

  if (field) {
    return React.createElement(field, commonfieldProps);
  }
}

/**
 * gets options
 *
 * @private
 * @method getOptions
 * @param {Array} options
 * @return {Array} parsed options for dropdown
 */
const getOptions = (options) => {
  return options.map((option) => {
    return ImmutableHelper.parseJSON({ id: option, name: option });
  });
}

/**
 * uses the propKey to fiugure out what sort of fiewld should be used
 *
 * @private
 * @method chooseField
 * @param {Object} props - full set of props
 * @param {String} propKey - key of the prop for making the choice
 * @return {String} name of the field type to load
 */
const chooseField = (propOptions, propKey, demoPropData) => {
  if (propOptions) {
    return Dropdown;
  }

  if (showChildren(propKey, demoPropData)) {
    return Textarea;
  }

  if (OptionsHelper.commonBooleans().indexOf(propKey) >= 0) {
    return Checkbox;
  }

  if (propKey !== 'children') {
    return Textbox;
  }
}

/**
 * decides whether to show children as a field
 *
 * @private
 * @method showChildren
 * @param {String} propKey -
 * @param {String} demoPropData -
 * @return {Boolean}
 */
const showChildren = (propKey, demoPropData) => {
  return propKey === 'children'
         && ['object','array'].indexOf(typeof demoPropData) < 0;
}

/**
 * returns true if this prop should be shown - functions and some awkward props can be skipped this way from the form
 *
 * @private
 * @method showProp
 * @param {String} propKey - key of the prop for searching the Options array
 * @return {Boolean}
 */
const showProp = (propKey, demoPropData) => {
  return OptionsHelper.nonDemoFormProps().indexOf(propKey) === -1
         && OptionsHelper.commonEvents().indexOf(propKey) === -1;
}
