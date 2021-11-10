Feature: Number Input component
  I want to check Number Input component properties

  @positive
  Scenario Outline: Change field help text to <fieldHelp>
    When I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "<nameOfObject>" object name
    Then label on preview is <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change label help text to <labelHelp>
    Given I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "<nameOfObject>" object name
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario: Check icon inside of input is visible
    When I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "inputIconAdd" object name
    Then icon name on preview is "add"

  @positive
  Scenario: Enable onChangeDeferred action
    Given I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "onChangeDeferred" object name
    When I input 1 into NumberInput component
      And I wait 1000
    Then onChangeDeferred action was called in Actions Tab

  @positive
  Scenario: Disable onChangeDeferred action
    When I input 1 into NumberInput component
    Then onChange action was called in Actions Tab

  @positive
  Scenario Outline: Enable onKeyDown action uses <key>
    Given I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "onKeyDown" object name
    When I press keyboard "<key>" keys into NumberInput input component
    Then onKeyDown action was called in Actions Tab
    Examples:
      | key        |
      | downarrow  |
      | leftarrow  |
      | rightarrow |
      | uparrow    |

  @positive
  Scenario Outline: Enable onChangeDeferred action and check deferTimeout set to <deferTimeout>
    Given I open default "Number Input Test" component with "numberInput" json from "commonComponents" using "<nameOfObject>" object name
    When I input 1 into NumberInput component
      And onChange action was called in Actions Tab
      And I wait <deferTimeout>
    Then onChangeDeferred action was called in Actions Tab
    Examples:
      | deferTimeout | nameOfObject      |
      | 1000         | deferTimeout1000  |
      | 5000         | deferTimeout5000  |
      | 10000        | deferTimeout10000 |