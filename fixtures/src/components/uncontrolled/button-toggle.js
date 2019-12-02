import React, { useState } from 'react';
import ButtonToggleGroup from "carbon-react/lib/components/button-toggle-group"
import ButtonToggle from "carbon-react/lib/components/button-toggle"
import { LogConsumer } from '../log';

const UncontrolledButtonToggle = () => {
    return (
      <LogConsumer>
        {(log) => {
          const onChange = e => log(e, { method: 'onChange' });
          const onBlur = e => log(e, { method: 'onBlur' });
  
          return (
            <React.Fragment>
              <div id='uncontrolled_button_toggle'>
                <h1>Uncontrolled Button Toggle</h1>
                <h2>Unchecked</h2>
                <ul>
                  <li>onChange handler should update the log when each toggle is checked</li>
                  <li>onBlur handler should update the log when each toggle is blurred</li>
                  <li>each toggle button has props value, name, id which should be reflected in both events</li>
                  <li>the onChange handler sets the checked value, then each toggle checks this value to see if the checked
                    prop should be truthy
                  </li>
                </ul>
                <ButtonToggleGroup
                        id='uncontrolled_button_toggle'
                        name='uncontrolled_button_toggle'
                        onChange={ onChange }
                        onBlur={ onBlur }>
                    <ButtonToggle id='uncontrolled_button_toggle_one' value="one" label="one">
                      One
                    </ButtonToggle>
                    <ButtonToggle id='uncontrolled_button_toggle_two' value="two" label="two">
                      Two
                    </ButtonToggle>
                    <ButtonToggle id='uncontrolled_button_toggle_three' value="three" label="three">
                      Three
                    </ButtonToggle>
                </ButtonToggleGroup>
              </div>
              <div id='uncontrolled_button_toggle_checked'>
              <h2>Default Checked</h2>
              <ul>
                <li>value two is checked by default</li>
              </ul>
              <ButtonToggleGroup
                        id='uncontrolled_button_toggle_checked'
                        name='uncontrolled_button_toggle_checked'
                        onChange={ onChange }
                        onBlur={ onBlur }>
                    <ButtonToggle id='uncontrolled_button_toggle_checked_one' value="one" label="one">
                      One
                    </ButtonToggle>
                    <ButtonToggle id='uncontrolled_button_toggle_checked_two' value="two" label="two" defaultChecked>
                      Two
                    </ButtonToggle>
                    <ButtonToggle id='uncontrolled_button_toggle_checked_three' value="three" label="three">
                      Three
                    </ButtonToggle>
                </ButtonToggleGroup>
            </div>
              
            </React.Fragment>
          );
        }}
      </LogConsumer>
    );
  };
  
  export default UncontrolledButtonToggle;
  