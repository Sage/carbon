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
      labelHelp: scope.value('labelHelp'),
      labelInline: scope.value('labelInline'),
      labelWidth: scope.value('labelInline') ? scope.value('labelWidth') : '',
      disabled: scope.value('disabled'),
      readOnly: scope.value('readOnly'),
      prefix: scope.value('prefix')
    };
  },

  codeProps: (scope, html) => {
    if (scope.value('label')) {
      html += `\n  label='${scope.value('label')}'`;

      if (scope.value('labelHelp')) {
        html += `\n  labelHelp='${scope.value('labelHelp')}'`;
      }
    }

    if (scope.value('labelInline')) {
      html += `\n  labelInline={${scope.value('labelInline')}}`;
    }

    if (scope.value('labelInline') && scope.value('labelWidth')) {
      html += `\n  labelWidth='${scope.value('labelWidth')}'`;
    }

    if (scope.value('disabled')) {
      html += `\n  disabled={${scope.value('disabled')}}`;
    }

    if (scope.value('readOnly')) {
      html += `\n  readOnly={${scope.value('readOnly')}}`;
    }

    if (scope.value('prefix')) {
      html += `\n  prefix='${scope.value('prefix')}'`;
    }

    if (scope.value('helpMessage')) {
      html += `\n  helpMessage='${scope.value('helpMessage')}'`;
    }

    // determine if we need extra space
    let splitHtml = html.split("\n  ");
    if (splitHtml.length == 1) {
      html += " ";
    } else {
      html += "\n";
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
            onChange={ onChange.bind(scope, 'label')}
          />
          <Textbox
            label="Label Help"
            labelInline={ true }
            value={ scope.value('labelHelp') }
            onChange={ scope.action.bind(scope, 'labelHelp') }
          />
        </Row>

        <Row columns="3">
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
            placeholder="In percent"
            columnSpan="2"
          />
        <Textbox
            label="Help"
            labelInline={ true }
            value={ scope.value('helpMessage') }
            onChange={ onChange.bind(scope, 'helpMessage') }
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
