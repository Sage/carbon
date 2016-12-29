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

import DefinitionHelper from 'utils/helpers/definition-helper';

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
    link={ `https://github.com/Sage/carbon/tree/master/src/components/${props.definition.key}` }
  >
    <div className= { `component-preview component-preview--${props.definition.key}` }>
      <div className='component-preview__component-wrapper'>
        { React.createElement(props.definition.component, props.definition.demoProps) }
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

/**
 * builds code output
 *
 * @private
 * @method _buildCode
 * @param {Object} def - definition
 * @return {String} code string
 */
const _buildCode = (props) => {
  let codeObj = new ComponentCodeBuilder(props.definition.text.name);

  for (var prop in props.definition.demoProps) {
    codeObj.addProp(prop, props.definition.demoProps[prop]);
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
  let demoProps = props.definition.demoProps;
  let sortedProps = Object.keys(demoProps).sort();

  for (let i = 0; i < sortedProps.length; i ++) {
    let propKey = sortedProps[i];

    let demoPropData = demoProps[propKey],
        propOptions = props.definition.propOptions ? props.definition.propOptions[propKey] : null;

    if (propOptions) {
      let opts = propOptions.map((option) => {
        return { id: option, name: option };
      });

      fieldObj[i] = (
        <Dropdown
          label={ propKey }
          onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
          options={ ImmutableHelper.parseJSON(opts) }
          value={ demoPropData }
          key={ i }
        />
      );
    } else {
      if (propKey === 'children') {
        if (['object','array'].indexOf(typeof demoProps[propKey]) < 0) {
          fieldObj[i] = (
            <Textarea
              label={ propKey }
              onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
              value={ demoPropData }
              key={ i }
            />
          );
        }
      } else if (DefinitionHelper.commonBooleans().indexOf(propKey) >= 0) {
        fieldObj[i] = (
          <Checkbox
            label={ propKey }
            onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
            value={ demoPropData }
            key={ i }
          />
        );
      } else if (DefinitionHelper.commonEvents().indexOf(propKey) >= 0) {
        console.log('event triggered');
      } else {
        fieldObj[i] = (
          <Textbox
            label={ propKey }
            onChange={ ComponentActions.updateDefinition.bind(this, propKey, props.name) }
            value={ demoPropData }
            key={ i }
          />
        );
      }
    }
  }

  return fieldObj;
}
