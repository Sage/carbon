import React from 'react';
import { mount } from 'enzyme';
import Validations from './validations.component';

describe('Validations', () => {
  const wrapper = mount(
    <Validations
      validateForm={ () => console.log }
      validateField={ () => console.log }
    >
      <div> ED </div>
    </Validations>
  );
  it('', () => {
    console.log(wrapper.debug());
  });
});
