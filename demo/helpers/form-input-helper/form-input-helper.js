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
      prefix: scope.value('prefix'),
      fieldHelp: scope.value('fieldHelp'),
      inputWidth: scope.value('labelInline') ? scope.value('inputWidth') : '',
      labelHelp: scope.value('labelHelp'),
      inputHelp: scope.value('inputHelp'),
      labelAlign: (scope.value('labelAlign') ? 'right' : null),
      icon: scope.value('icon')
    };
  },

  codeProps: (scope, html) => {
    if (scope.value('label')) {
      html += `\n  label='${scope.value('label')}'`;
    }

    if (scope.value('label') && scope.value('labelAlign')) {
      html += `\n  labelAlign='right'`;
    }

    if (scope.value('fieldHelp')) {
      html += `\n  fieldHelp='${scope.value('fieldHelp')}'`;
    }

    if (scope.value('labelHelp')) {
      html += `\n  labelHelp='${scope.value('labelHelp')}'`;
    }

    if (scope.value('labelInline')) {
      html += `\n  labelInline={${scope.value('labelInline')}}`;
    }

    if (scope.value('labelInline')) {
      if (scope.value('labelWidth')) {
        html += `\n  labelWidth='${scope.value('labelWidth')}'`;
      }

      if (scope.value('inputWidth')) {
        html += `\n  inputWidth='${scope.value('inputWidth')}'`;
      }
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

    if (scope.value('icon')) {
      html += `\n  icon='${scope.value('icon')}'`;
    }

    if (scope.value('inputHelp')) {
      html += `\n  inputHelp='${scope.value('inputlHelp')}'`;
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
            onChange={ onChange.bind(scope, 'labelHelp') }
          />
        </Row>

        <Row>
          <Textbox
            label="Input Help"
            labelInline={ true }
            value={ scope.value('inputHelp') }
            onChange={ onChange.bind(scope, 'inputHelp') }
          />
        </Row>

        <Row columns="4">
          <Checkbox
            label="Label Inline"
            value={ scope.value('labelInline') }
            onChange={ onChange.bind(scope, 'labelInline') }
          />

          <Checkbox
            label="Label Align Right"
            value={ scope.value('labelAlign') }
            onChange={ onChange.bind(scope, 'labelAlign') }
          />

          <Number
            label="Label Width"
            labelInline={ true }
            value={ scope.value('labelWidth') }
            disabled={ !scope.value('labelInline') }
            onChange={ onChange.bind(scope, 'labelWidth') }
            placeholder="In percent"
            columnSpan="1"
          />

          <Number
            label="Input Width"
            labelInline={ true }
            value={ scope.value('inputWidth') }
            disabled={ !scope.value('labelInline') }
            onChange={ onChange.bind(scope, 'inputWidth') }
            placeholder="In percent"
            columnSpan="1"
          />
        </Row>

        <Row>
          <Textbox
            label="Field Help"
            labelInline={ true }
            value={ scope.value('fieldHelp') }
            onChange={ scope.action.bind(scope, 'fieldHelp') }
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

          <Textbox
            label="Icon"
            labelInline={ true }
            value={ scope.value('icon') }
            onChange={ onChange.bind(scope, 'icon') }
          />
        </Row>
      </div>
    );
  }
};

export default FormInputHelper;
