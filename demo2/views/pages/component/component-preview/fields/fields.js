import React from 'react';
import { titleize } from 'underscore.string';
import { kebabCase } from 'lodash';
import ImmutableHelper from 'utils/helpers/immutable';
import ComponentStore from './../../../../../stores/component';
import ComponentActions from './../../../../../actions/component';
import OptionsHelper from 'utils/helpers/options-helper';
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';
import Textarea from 'components/textarea';
import Textbox from 'components/textbox';

export default props => (
  <form className='component-preview__controls'>
    { buildFields(props) }
  </form>
)

/**
 * builds fields for dynamically editing props
 *
 * @private
 * @method buildCode
 * @param {Object} def - definition
 * @return {String} code string
 */
const buildFields = (props) => {
  let fieldObj = [],
      demoProps = props.definition.get('props'),
      propOptions = props.definition.get('propOptions'),
      values = props.definition.get('propValues'),
      hiddenProps = props.definition.get('hiddenProps'),
      propRequires = props.definition.get('propRequires'),
      defaultProps = props.definition.get('defaultProps');

  demoProps.forEach((prop) => {
    let value = values.get(prop);

    if (typeof value === "undefined") {
      if (typeof defaultProps.get(prop) === "undefined") {
        value = "";
      } else {
        value = defaultProps.get(prop);
      }
    }

    let options = propOptions ? propOptions.get(prop) : null,
        requirement = propRequires.get(prop);

    if (!hiddenProps.contains(prop)) {
      fieldObj.push(fieldComponent(props.name, prop, value, options, requirement));
    }
  });

  return fieldObj;
}

/**
 * creates a simple field
 *
 * @private
 * @method fieldComponent
 * @param {Object} options
 * @param {string} key
 * @param {Object} demoPropData
 * @param {string} name
 * @return {Component}
 */
const fieldComponent = (name, prop, value, options, requirement) => {
  let field = chooseField(prop, value, options),
      commonfieldProps = {
        key: prop,
        label: titleize(kebabCase(prop)).replace(/-/g, " "),
        onChange: ComponentActions.updateDefinition.bind(this, name, prop),
        value: value
      };

  if (requirement) {
    let disabled = !ComponentStore.data.getIn([name, 'propValues', requirement]);
    commonfieldProps.disabled = disabled;
    commonfieldProps.labelHelp = "requires " + requirement;
  }

  if (field !== Checkbox) {
    commonfieldProps.labelInline = true;
    commonfieldProps.labelWidth = 40;
  }

  if (options) {
    commonfieldProps.options = getOptions(options);
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
const chooseField = (prop, value, options) => {
  if (options) {
    return Dropdown;
  }

  if (prop === 'children' && typeof value === 'string') {
    return Textarea;
  }

  if (OptionsHelper.commonBooleans().indexOf(prop) >= 0) {
    return Checkbox;
  }

  if (prop !== 'children') {
    return Textbox;
  }
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
