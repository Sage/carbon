import React from 'react';
import Row from 'components/row';
import Textbox from 'components/textbox';
import Checkbox from 'components/checkbox';
import Number from 'components/number';

let FormInputHelper = {
  demoProps: (scope, onChange) => {
    return {
      onChange: onChange.bind(scope, 'value'),
      value: scope.value('value'),
      label: scope.value('label'),
      labelInline: scope.value('labelInline'),
      labelWidth: scope.value('labelInline') ? scope.value('labelWidth') : '',
      disabled: scope.value('disabled'),
      readOnly: scope.value('readOnly'),
      prefix: scope.value('prefix')
    };
  },

  codeProps: (scope, html) => {
    if (scope.value('label')) {
      html += `  label='${scope.value('label')}'\n`;
    }

    if (scope.value('labelInline')) {
      html += `  labelInline={${scope.value('labelInline')}}\n`;
    }

    if (scope.value('labelInline') && scope.value('labelWidth')) {
      html += `  labelWidth='${scope.value('labelWidth')}'\n`;
    }

    if (scope.value('disabled')) {
      html += `  disabled={${scope.value('disabled')}}\n`;
    }

    if (scope.value('readOnly')) {
      html += `  readOnly={${scope.value('readOnly')}}\n`;
    }

    if (scope.value('prefix')) {
      html += `  prefix='${scope.value('prefix')}'\n`;
    }

    return html;
  },

  controls: (scope, onChange) => {
    return (
      <div>
        <Row>
          <Textbox
            label="Label"
            labelInline={ true }
            value={ scope.value('label') }
            onChange={ onChange.bind(scope, 'label') }
          />
        </Row>

        <Row>
          <Checkbox
            label="Label Inline"
            value={ scope.value('labelInline') }
            onChange={ onChange.bind(scope, 'labelInline') }
          />

          <Number
            label="Label Width"
            labelInline={ true }
            value={ scope.value('labelWidth') }
            disabled={ !scope.value('labelInline') }
            onChange={ onChange.bind(scope, 'labelWidth') }
          />
        </Row>

        <Row>
          <Checkbox
            label="Disabled"
            value={ scope.value('disabled') }
            onChange={ onChange.bind(scope, 'disabled') }
          />

          <Checkbox
            label="Read Only"
            value={ scope.value('readOnly') }
            onChange={ onChange.bind(scope, 'readOnly') }
          />

          <Textbox
            label="Prefix"
            labelInline={ true }
            value={ scope.value('prefix') }
            onChange={ onChange.bind(scope, 'prefix') }
          />
        </Row>
      </div>
    );
  }
};

export default FormInputHelper;
