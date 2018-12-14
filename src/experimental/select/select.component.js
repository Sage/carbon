import React from 'react';
import PropTypes from 'prop-types';
import Pill from './../../components/pill';
import { Input, InputBox } from './../input';
import OptionsContainer from './options-container.component';
import InputDecorator from '../../utils/decorators/input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';

const SelectValueContext = React.createContext();

const Select = InputDecorator(InputLabel(InputValidation(class Select extends React.Component {
  state = {
    filter: null
  }

  get mainClasses() {
    return 'carbon-select';
  }

  get inputClasses() {
    return 'carbon-select__input';
  }

  get inputProps() {
    const { children, ...props } = validProps(this);
    props.className = this.inputClasses;
    props.value = this.visibleValue();
    props.onChange = (ev) => {
      this.setState({ filter: ev.target.value });
    }
    props.onBlur = (ev) => {
      this.setState({ filter: '' });
    }
    props.onKeyDown = (ev) => {
      if (ev.key === 'Backspace' && !this.state.filter) {
        this.removeValue()
      }
    }
    return props;
  }

  isMultiValue() {
    return Array.isArray(this.props.value);
  }

  visibleValue() {
    if (typeof this.state.filter === 'string') return this.state.filter;
    if (this.isMultiValue()) return '';
    return this.props.value.label;
  }

  addValue = (value) => {
    let newValue = value;
    if (this.isMultiValue()) {
      newValue = [...this.props.value, value];
    }
    this.props.onChange({
      target: {
        value: newValue
      }
    });
  }

  removeValue = () => {
    this.props.onChange({
      target: {
        value: this.props.value.slice(0, -1)
      }
    });
  }

  selectValueContext() {
    return {
      filter: this.state.filter,
      value: this.props.value,
      onSelect: this.addValue
    }
  }

  renderMultiSelectOptions() {
    if (!this.isMultiValue()) return null;
    return this.props.value.map((item) => (
      <Pill key={ item.id } fill>{ item.label }</Pill>
    ));
  }

  render() {
    return (
      <SelectValueContext.Provider value={ this.selectValueContext() }>
        <div
          className={ this.mainClasses }
          ref={ (comp) => { this._target = comp; } }
          { ...tagComponent('select', this.props) }
        >
          { this.labelHTML }
          <InputBox { ...this.fieldProps }>
            { this.renderMultiSelectOptions() }

            <Input { ...this.inputProps } />

            <OptionsContainer>
              { this.props.children }
            </OptionsContainer>
          </InputBox>
          { this.validationHTML }
          { this.fieldHelpHTML }
        </div>
      </SelectValueContext.Provider>
    );
  }
})));

export { SelectValueContext };
export default Select;
