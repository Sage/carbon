// React
import classNames from 'classnames';
import Highlight from 'react-highlight';
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
        { React.createElement(props.definition.get('component'), getProps(props.definition.get('demoProps'))) }
      </div>
      <div className='component-preview__interaction'>
        <form className='component-preview__controls'>
          { _buildFields(props) }
        </form>
        <code className='component-preview__code'>
          { _buildCode(props) }
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
 * @method _buildCode
 * @param {Object} def - definition
 * @return {String} code string
 */
const _buildCode = (props) => {
  let codeObj = new ComponentCodeBuilder(props.definition.getIn(['text', 'name'])),
      children = null;

  props.definition.get('demoProps').forEach((prop, key) => {
    if (key === "children") {
      children = prop;
    } else {
      let value = typeof prop === "object" ? prop.toJS() : prop;
      codeObj.addProp(key, value);
    }
  });

  if (children) {
    children.toJS
      ? codeObj.addChild(children.toJS())
      : codeObj.addChild(children);
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
const _buildFields = (props) => {
  let fieldObj = [];

  // get the props
  let demoProps = props.definition.get('demoProps');

  demoProps.forEach((demoPropData, propKey) => {
    let propOptions = props.definition.get('propOptions')
      ? props.definition.getIn(['propOptions', propKey])
      : null;

    if (OptionsHelper.nonDemoFormProps().indexOf(propKey) >= 0) {
      // remove some props from the form (V1)
    } else if (propOptions) {
      let opts = propOptions.map((option) => {
        return ImmutableHelper.parseJSON({ id: option, name: option });
      });

      fieldObj.push(
        <Dropdown
          label={ propKey }
          onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
          options={ opts }
          value={ demoPropData }
          key={ propKey }
        />
      );
    } else {
      if (propKey === 'children') {
        if (['object','array'].indexOf(typeof demoPropData) < 0) {
          fieldObj.push(
            <Textarea
              label={ propKey }
              onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
              value={ demoPropData }
              key={ propKey }
            />
          );
        }
      } else if (OptionsHelper.commonBooleans().indexOf(propKey) >= 0) {
        fieldObj.push(
          <Checkbox
            label={ propKey }
            onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
            value={ demoPropData }
            key={ propKey }
          />
        );
      } else if (OptionsHelper.commonEvents().indexOf(propKey) >= 0) {
        // skip the functions from output as a form prop
      } else {
        fieldObj.push(
          <Textbox
            label={ propKey }
            onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
            value={ demoPropData }
            key={ propKey }
          />
        );
      }
    }
  });

  return fieldObj;
}
