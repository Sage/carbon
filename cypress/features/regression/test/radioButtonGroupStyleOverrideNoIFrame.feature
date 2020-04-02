Feature: Style overriden RadioButtonGroup component
  I want to verify overriden styles for RadioButtonGroup component

  @positive
  Scenario: Open style overriden RadioButtonGroup component page and verify overriden styles are rendered properly
    When I open style override Test "RadioButtonGroup" component page in noIframe
    Then RadioButtonGroup overriden styles rendered properly