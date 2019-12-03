import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Radio Button Component</p>
    <p>
      A radio button widget. Selects one option from a longer list. Designed to be used with
      the RadioButtonGroup component, but can be used separately if you choose to write your own
      grouping (this is how the component was used pre-DLS).
    </p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the components:</p>
    <StoryCodeBlock>
      {'import { RadioButton, RadioButtonGroup } from "carbon-react/lib/components/radio-button"'}
    </StoryCodeBlock>

    <p>To render the button group:</p>
    <StoryCodeBlock>
      {'<RadioButtonGroup groupName="frequency" legend="Please select a frequency from the options below">'}
      {'  <RadioButton value="weekly" label="Weekly"/>'}
      {'  <RadioButton value="monthly" label="Monthly"/>'}
      {'  <RadioButton value="annually" label="Annually"/>'}
      {'<RadioButtonGroup/>'}
    </StoryCodeBlock>

    <p>
      The <StoryCode>groupName</StoryCode> prop supplied to the <StoryCode>RadioButtonGroup</StoryCode> component
      is used to set the <StoryCode>name</StoryCode> prop for each child element. If using
      the buttons separately, this can be set manually on each button.
    </p>

    <p>
      The <StoryCode>id</StoryCode> prop for each button can be set manually. If none is set, a
      random GUID will be used instead.
    </p>

    <p>For additional properties specific to this component, see propTypes.</p>

    <StoryHeader>Keyboard Support/Accessbility:</StoryHeader>
    <table className='info-table'>
      <thead>
        <tr>
          <td>
            Key
          </td>
          <td>
            Function
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            Tab
          </td>
          <td>
            <ul>
              <li>
                Moves keyboard focus to the checked radio button in a radiogroup.
              </li>
              <li>
                If no radio button is checked, focus moves to the first radio button in the group.
              </li>
              <li>
                Further tab moves focus out of the radio group to the next component on the page.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            Space
          </td>
          <td>
            <ul>
              <li>
                If the radio button with focus is unchecked, its state will be changed to checked.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            Down/Right arrow
          </td>
          <td>
            <ul>
              <li>
                Moves focus to next radio button in the group.
              </li>
              <li>
                If focus is on the last radio button in the group, move focus to the first radio button.
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            Up/Left arrow
          </td>
          <td>
            <ul>
              <li>
                Moves focus to previous radio button in the group.
              </li>
              <li>
                If focus is on the first radio button in the group, move focus to the last radio button.
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default info;
