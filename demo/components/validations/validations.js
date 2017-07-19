import React from 'react';
import Dropdown from 'components/dropdown';
import Textbox from 'components/textbox';
import { Row, Column } from 'components/row';

import DateRangeValidator from 'utils/validations/date-range';
import DateValidator from 'utils/validations/date';
import DateWithinRangeValidator from 'utils/validations/date-within-range';

import BlankValidator from 'utils/validations/blank';
import EmailValidator from 'utils/validations/email';
import ExclusionValidator from 'utils/validations/exclusion';
import InclusionValidator from 'utils/validations/inclusion';
import LengthValidator from 'utils/validations/length';
import NumeralValidator from 'utils/validations/numeral';
import PresenceValidator from 'utils/validations/presence';
import RegexValidator from 'utils/validations/regex';

const Validators = {
  blank: { validator: BlankValidator, component: Textbox, options: {} },
  email: { validator: EmailValidator, component: Textbox, options: {} },
  exclusion: { validator: ExclusionValidator, component: Textbox, options: { disallowedValues: "['foo', 'bar' ]" } },
  inclusion: { validator: InclusionValidator, component: Textbox, options: { allowedValues: "['foo', 'bar' ]" } },
  length: { validator: LengthValidator, component: Textbox, options: { min: '2', max: '5' } },
  numeral: { validator: NumeralValidator, component: Textbox, options: { min: '10', max: '100' } },
  presence: { validator: PresenceValidator, component: Textbox, options: {} },
  regex: { validator: RegexValidator, component: Textbox, options: { format: /[0-9]/ } }
}

class Validations extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    validator: React.PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  state = {
    options: Validators[this.props.validator].options || Validators['length'].options
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validator !== this.props.validator) {
      const options = Validators[nextProps.validator].options || Validators['length'].options
      this.setState({ options });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.validator !== this.props.validator) {
      this._input._handleContentChange();
    }
  }

  optionChange(prop) {
    return ((ev) => {
      let options = this.state.options;
      options[prop] = ev.target.value;
      this.setState({ options });
    });
  }

  generateOptions() {
    const options = Validators[this.props.validator].options;
    let fields = Object.keys(options).map((key) => {
      return (
        <Column>
          <Textbox
            label={ key }
            value={ this.state.options[key] }
            onChange={ this.optionChange(key) }
          />
        </Column>
      );
    });
    return <Row>{ fields }</Row>;
  }

  render() {
    const validator = Validators[this.props.validator] || Validators['length'];

    let element = React.createElement(
      validator.component,
      {
        validations: [ new validator.validator(this.state.options) ],
        value: this.props.value,
        onChange: this.props.onChange,
        ref: (input) => { this._input = input }
      }
    );


    return (
      <div>
        <div>
          { element }
        </div>
        <div>
          { this.generateOptions() }
        </div>
      </div>
    );
  }
}

export default Validations;
