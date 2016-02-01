import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import Radiobutton from './radiobutton';

describe('Radiobutton', () => {
  let standardRadioButton, reversedRadioButton;

  beforeEach(() => {
    standardRadioButton = TestUtils.renderIntoDocument(
      <Radiobutton name='myradio' value='myradiobutton' label='My Radio Button' />
    )

    reversedRadioButton = TestUtils.renderIntoDocument(
      <Radiobutton name ='myradio' value='myradiobutton' label='My Radio Button' 
        defaultChecked reverse />
    )
  });

  describe('A basic radiobutton', () => {
      it('renders a radio button with the provided label', () => {
        expect(standardRadioButton.props.label).toEqual('My Radio Button');
      });
      
      it('renders a radio button with the provided name', () => {
        expect(standardRadioButton.props.name).toEqual('myradio');
      });
  });
  
  describe('A group of radiobuttons', () => {
      it('renders has the default selected state set', () => {
        expect(reversedRadioButton.props.defaultChecked).toEqual(true);
        expect(standardRadioButton.props.defaultChecked).toEqual(false);
      });
  });
  
});
