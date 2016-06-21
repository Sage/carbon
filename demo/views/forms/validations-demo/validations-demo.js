import React from 'react';
import { connect } from 'utils/flux';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';
import FormInputHelper from './../../../helpers/form-input-helper';
import Immutable from 'immutable';
import { startCase } from 'lodash';

import Textbox from 'components/textbox';
import Dropdown from 'components/dropdown';
import Row from 'components/row';
import Checkbox from 'components/checkbox';
import NumberComponent from 'components/number';

import PresenceValidator from 'utils/validations/presence';
import EmailValidator from 'utils/validations/email';
import NumeralValidator from 'utils/validations/numeral';
import LengthValidator from 'utils/validations/length';

class ValidationsDemo extends React.Component {

  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['validations', key]);
  }

  /**
   * @method valueIn
   */
  valueIn = (validator, key) => {
    return this.state.appStore.getIn(['validations', validator, key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'validations');
  }

  /**
   * @method demo
   */
  get demo() {
    let props = {
      value: this.value('value'),
      onChange: this.action.bind(this, 'value')
    };

    let validationProps = {};

    switch (this.value('validator')) {
      case 'presence':
        props.validations = [ new PresenceValidator() ]
        break;
      case 'length':

        if (this.valueIn('length', 'setIs')) {
          validationProps.is = this.valueIn('length', 'is');
        } else {
          validationProps.min = Number(this.valueIn('length', 'min'));
          validationProps.max = Number(this.valueIn('length', 'max'));
        }

        props.validations = [ new LengthValidator(validationProps) ]
        break;
      case 'numeral':
        validationProps.integer = this.value('numeral', 'integer')

        if (this.valueIn('numeral', 'setIs')) {
          validationProps.is = this.valueIn('numeral', 'is');
        } else {
          validationProps.min = Number(this.valueIn('numeral', 'min'));
          validationProps.max = Number(this.valueIn('numeral', 'max'));
        }

        props.validations = [ new NumeralValidator(validationProps) ]
        break;
      case 'email':
        props.validations = [ new EmailValidator() ]
        break;
    }

    return (
      <Textbox
        { ...props }
      />
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Textbox from 'carbon/lib/components/textbox';\n";
    html += `import ${ startCase(this.value('validator')) }Validator from 'utils/validations/${ this.value('validator') }'\n\n`;

    html += "<Textbox";

    switch(this.value('validator')) {
      case 'presence':
        html += "\n  validations=[ new PresenceValidator() ]";
        break;
      case 'length':
        if (this.valueIn('length', 'setIs')) {
          html += `\n validations=[ new LengthValidator({ is: ${ this.valueIn('length', 'is') } }) ]`;
        } else {
          html += `\n validations=[ new LengthValidator({ min: ${ this.valueIn('length', 'min') }, max: ${ this.valueIn('length', 'max') } }) ]`;
        }
        break;
      case 'numeral':
        if (this.valueIn('numeral', 'setIs')) {
          html += `\n validations=[ new NumeralValidator({ integer: ${ this.valueIn('numeral', 'integer') }, is: ${ this.valueIn('numeral', 'is') } }) ]`;
        } else {
          html += `\n validations=[ new NumeralValidator({ integer: ${ this.valueIn('numeral', 'integer') }, min: ${ this.valueIn('numeral', 'min') }, max: ${ this.valueIn('numeral', 'max') } }) ]`;
        }

        break;
      case 'email':
        html += `validations=[ new EmailValidator() ]`;
        break;
    }

    html += "\n/>\n\n";

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let opts = Immutable.fromJS([
      { id: 'presence', name: 'Presence Validator' },
      { id: 'length',   name: 'Length Validator' },
      { id: 'numeral',  name: 'Numeral Validator' },
      { id: 'email',    name: 'Email Validator' }
    ]);

    let extraControls = this[this.value('validator') + 'Controls']

    return (
      <div>
        <Row>
          <Dropdown
            options={ opts }
            value={ this.value('validator') }
            onChange={ this.action.bind(this, 'validator') }
          />
        </Row>
        { extraControls }
      </div>
    );
  }

  get presenceControls() {
    return null;
  }

  get lengthControls() {
    return (
      <div>
        <Row>
          <NumberComponent
            label='min'
            value={ this.valueIn('length', 'min') } 
            disabled={ this.valueIn('length', 'setIs') }
            onChange={ this.action.bind(this, ['length', 'min']) }
          />
          <NumberComponent
            label='max'
            value={ this.valueIn('length', 'max') } 
            disabled={ this.valueIn('length', 'setIs') }
            onChange={ this.action.bind(this, ['length', 'max']) }
          />
        </Row>
        <Row>
          <Checkbox
            value={ this.valueIn('length', 'setIs') }
            onChange={ this.action.bind(this, ['length', 'setIs']) }
            label='Set is'
          />
          <NumberComponent
            label='is'
            value={ this.valueIn('length', 'is') } 
            disabled={ !this.valueIn('length', 'setIs') }
            onChange={ this.action.bind(this, ['length', 'is']) }
          />
        </Row>
      </div>
    );
  }

  get numeralControls() {
    return (
      <div>
        <Row>
          <Checkbox
            value={ this.valueIn('numeral', 'integer') }
            onChange={ this.action.bind(this, ['numeral', 'integer']) }
            label='Is Integer'
          />
        </Row>
        <Row>
          <NumberComponent
            label='min'
            value={ this.valueIn('numeral', 'min') } 
            disabled={ this.valueIn('numeral', 'setIs') }
            onChange={ this.action.bind(this, ['numeral', 'min']) }
          />
          <NumberComponent
            label='max'
            value={ this.valueIn('numeral', 'max') } 
            disabled={ this.valueIn('numeral', 'setIs') }
            onChange={ this.action.bind(this, ['numeral', 'max']) }
          />
        </Row>
        <Row>
          <Checkbox
            value={ this.valueIn('numeral', 'setIs') }
            onChange={ this.action.bind(this, ['numeral', 'setIs']) }
            label='Set is'
          />
          <NumberComponent
            label='is'
            value={ this.valueIn('numeral', 'is') } 
            disabled={ !this.valueIn('numeral', 'setIs') }
            onChange={ this.action.bind(this, ['numeral', 'is']) }
          />
        </Row>
      </div>
    );
  }

  get emailControls() {
    return null;
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title="Validations"
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(ValidationsDemo, AppStore);
