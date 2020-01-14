Feature: Experimental Number Input component for classic page
  I want to change Experimental Number Input classic component page properties

  Background: Open Experimental Number Input classic component page
    Given I open "Experimental Number Input" component page classic

  @positive
  Scenario: Enable onChangeDeferred action
    Given I check Enable onChangeDeferred Action property
      And clear all actions in Actions Tab
    When I input 1 into NumberInput component
      And I wait 1000
    Then onChangeDeferred action was called in Actions Tab

  @positive
  Scenario: Disable onChangeDeferred action
    Given clear all actions in Actions Tab
    When I input 1 into NumberInput component
    Then onChange action was called in Actions Tab

  @positive
  Scenario Outline: Enable onKeyDown action uses <key>
    Given I check Enable onKeyDown Action property
      And clear all actions in Actions Tab
    When I press keyboard "<key>" keys into NumberInput input component
    Then onKeyDown action was called in Actions Tab
    Examples:
      | key        |
      | downarrow  |
      | leftarrow  |
      | rightarrow |
      | uparrow    |

  @positive
  Scenario: Disable and enable Number input component
    Given I check disabled checkbox
    When I uncheck disabled checkbox
    Then Number input component is not disabled

  @positive
  Scenario: Disable Number input component
    When I check disabled checkbox
    Then Number input component is disabled

  @positive
  Scenario: Disable and enable readOnly property for Number input component
    Given I check readOnly checkbox
    When I uncheck readOnly checkbox
    Then Number input component is not readonly

  @positive
  Scenario: Disable readOnly property for Number input component
    When I check readOnly checkbox
    Then Number input component is readonly

  @positive
  Scenario Outline: Enable onChangeDeferred action and check deferTimeout set to <deferTimeout>
    Given I check Enable onChangeDeferred Action property
      And I set deferTimeout to "<deferTimeout>"
      And clear all actions in Actions Tab
    When I input 1 into NumberInput component
      And onChange action was called in Actions Tab
      And I wait <deferTimeout>
    Then onChangeDeferred action was called in Actions Tab
    Examples:
      | deferTimeout |
      | 1000         |
      | 5000         |
      | 10000        |

  @positive
  Scenario Outline: Change field help text to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Check the <size> of Number Input and nothing should be changed
    When I select size to "<size>"
    Then Number input component size is set to "<size>" and has min-height set to 31 and paddings set to 6
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive
  Scenario Outline: Change label help text to <labelHelp>
    Given I set label to "label"
      And I set labelHelp to "<labelHelp>"
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario: Enable label inline
    Given I set label to "label"
    When I check labelInline checkbox
    Then NumberInput component labelInline is enabled for classic component

  @positive
  Scenario: Disable label inline
    Given I set label to "label"
      And I check labelInline checkbox
    When I uncheck labelInline checkbox
    Then NumberInput component labelInline is disabled

  @positive
  Scenario Outline: Set label width to <labelWidth>
    Given I set label to "label"
      And I check labelInline checkbox
    When I set label width slider to <labelWidth>
    Then Number Input component labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set input width to <inputWidth>
    Given I set label to "label"
      And I check labelInline checkbox
    When I set inputWidth slider to <inputWidth>
    Then Number Input component inputWidth is set to <inputWidth>
    Examples:
      | inputWidth |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set label align to <labelAlign>
    Given I set label to "label"
      And I check labelInline checkbox
    When I select labelAlign to "<labelAlign>"
    Then label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | right      |
      | left       |