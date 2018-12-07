import React from 'react';
import { Input, InputContainer } from './../input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './textbox.scss';

const Textbox = InputLabel(InputValidation(class Textbox extends React.Component {
  render() {
    return (
      <div
        className='carbon-textbox'
        ref={ comp => this._target = comp }
        { ...tagComponent('textbox', this.props) }
      >
        { this.labelHTML }
        <InputContainer>
          <Input { ...this.props } />
        </InputContainer>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
}));

export default Textbox;
