// React
import { assign } from 'lodash';
import classNames from 'classnames';
import Highlight from 'react-highlight';
import { List } from 'immutable';
import ImmutableHelper from 'utils/helpers/immutable';
import React from 'react';

// Carbon
import Checkbox from 'components/checkbox';
import Dropdown from 'components/dropdown';
import Form from 'components/form';
import Textarea from 'components/textarea';
import Textbox from 'components/textbox';

import OptionsHelper from 'utils/helpers/options-helper';

// App Components
import ComponentCodeBuilder from './../../../utils/component-code-builder';
import PageContentArea from '../../page-sections/page-content-area';

// Flux
import ComponentActions from '../../../actions/component';

/**
 * Simple, site wrapped content area that loads a heading
 *
 * @param {object} props
 * @param {String} props.title
 * @return {PageContentArea}
 */
export default props => (
  <PageContentArea
    title='Preview'
    link={ `https://github.com/Sage/carbon/tree/master/src/components/${props.definition.get('key')}` }
  >
    <div className= { `component-preview component-preview--${props.definition.get('key')}` }>
      <div className='component-preview__component-wrapper'>
        { buildPreview(props) }
      </div>
      <div className='component-preview__interaction'>
        <form className='component-preview__controls'>
          { buildFields(props) }
        </form>
        <code className='component-preview__code'>
          { buildCode(props) }
        </code>
      </div>
    </div>
  </PageContentArea>
);

function getProps(props) {
  props = props.toJS();
  for (let key in props) {
    let prop = props[key];
    if (prop.immutable) {
      props[key] = ImmutableHelper.parseJSON(prop.value);
    }
  }
  return props;
}

/**
 * builds code output
 *
 * @private
 * @method buildCode
 * @param {Object} def - definition
 * @return {String} code string
 */
const buildCode = (props) => {
  let count = getCount(props.definition.get('demoRenderCount')),
      codeString = '',
      i = 0;

  for (; i < count; i ++) {
    let children = null,
        codeObj = new ComponentCodeBuilder(props.definition.getIn(['text', 'name']));

    props.definition.get('demoProps').forEach((prop, key) => {
      if (key === "children") {
        children = prop;
      } else {
        let value;

        if (typeof prop === "function") {
          value = `{ Actions.${key} }`;
        } else {
          value = prop.toJS ? prop.toJS() : prop;
        }

        codeObj.addProp(key, value);
      }
    });

    if (children) {
      children.toJS
        ? codeObj.addChild(children.toJS())
        : codeObj.addChild(children);
    }

    codeString += codeObj.toString();

    if (i < count-1) {
      codeString += '\n\n';
    }
  }

  return codeString;
}

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

  // get the props
  let demoProps = props.definition.get('demoProps');

  demoProps.forEach((demoPropData, propKey) => {
    let propOptions = props.definition.get('propOptions')
      ? props.definition.getIn(['propOptions', propKey])
      : null;

    if (showProp(propKey, demoPropData)) {
      if (List.isList(demoPropData)) {
        demoPropData.map((field, i) => {
          fieldObj.push(fieldComponent(null, propKey, field, props.name, i));
        })
      } else {
        fieldObj.push(fieldComponent(propOptions, propKey, demoPropData, props.name));
      }
    }
  });

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

  return React.createElement(field, commonfieldProps);
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

/**
 * builds the preview components, looping if needed
 *
 * @private
 * @method buildPreview
 * @param {Object} props - formatted as an object for processing, will contain various props
 * @return {Array} of components
 */
const buildPreview = (props) => {
  let components = [],
      count = getCount(props.definition.get('demoRenderCount')),
      i = 0;

  for (; i < count; i ++) {
    let def = props.definition;
    def = def.setIn(['demoProps', 'key'], `child-${i}`);
    components.push(React.createElement(props.definition.get('component'), getProps(def.get('demoProps'))));
  }

  return components;
}

/**
 * returns 1 or the count
 *
 * @private
 * @method getCount
 * @param {Number} count - could be undefined
 * @return {Number} guaranteed integer
 */
const getCount = (count) => {
  return typeof count === 'undefined' ? 1 : count;
}
