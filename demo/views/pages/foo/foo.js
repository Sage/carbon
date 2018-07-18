import React from 'react';

import Textbox from 'components/textbox';
import AppWrapper from 'components/app-wrapper';
import { Tabs, Tab } from 'components/tabs';
import Form from 'components/form';

import PresenceValidation from 'utils/validations/presence';
import LengthValidation from 'utils/validations/length';

class Foo extends React.Component {

  state = {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: ''
  }

  valueChange = (ev) => {
    this.setState({ [`${ev.target.name}`]: ev.target.value });
  }

  render() {
    return (
      <div style={ { 'margin-top': '100px' } }>
        <AppWrapper>
          <Form>
            <Textbox
              name='value1'
              value={ this.state.value1 }
              onChange={ this.valueChange }
              validations={ [
                new PresenceValidation({type: 'info', properties: { icon: 'settings', className: 'we-want-blue' }}),
                new LengthValidation({ min: 5, properties: { icon: 'settings' } } )
              ] }
            />
            <Textbox
              name='value2'
              value={ this.state.value2 }
              onChange={ this.valueChange }
            />
          </Form>
          <br />
          <br />
          <br />
          <Tabs>
            <Tab title='Tab 1' tabId='tab1'>
              <Form>
                <Textbox
                  name='value3'
                  value={ this.state.value3 }
                  onChange={ this.valueChange }
                  validations={ [ new PresenceValidation() ] }
                />
                <Textbox
                  name='value4'
                  value={ this.state.value4 }
                  onChange={ this.valueChange }
                  validations={ [ new PresenceValidation({ type: 'warning' }) ] }
                />
                <Textbox
                  name='value5'
                  value={ this.state.value5 }
                  onChange={ this.valueChange }
                  validations={ [ new PresenceValidation({ type: 'info', properties: { icon: 'warning' } }) ] }
                />
              </Form>
            </Tab>
          </Tabs>
        </AppWrapper>
      </div>
    );
  }
}

export default Foo;
