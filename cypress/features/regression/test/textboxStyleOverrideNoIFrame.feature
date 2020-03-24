Feature: Style overriden Textbox component
  I want to verify overriden styles for Textbox component

  @positive
  Scenario: Open style overriden Textbox component page and verify overriden styles are rendered properly
    When I open style override Test "Textbox" component page in noIframe
    Then Textbox overriden styles rendered properly