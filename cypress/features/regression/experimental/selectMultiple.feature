Feature: Select multiple component
  I want to change Select multiple component properties

  Background: Open Select multiple component page
    Given I open "Experimental Select" component page multiple

  @positive @applitools
  Scenario: Disable filterable for Select component
    When I uncheck filterable checkbox
      And Type "aaa" text into input
    Then Select input has "" value
      And Element displays correctly

  @positive @applitools
  Scenario: Disable and enable filterable for Select component
    When I uncheck filterable checkbox
      And I check filterable checkbox
      And Type "Amber" text into input and select the value
    Then Select multiple input 1 element and has "Amber" value
      And Element displays correctly

  @positive @applitools
  Scenario: Disable typeAhead for Select component
    Given I check typeAhead checkbox
    When I uncheck typeAhead checkbox
    Then Select typeAhead is disabled
      And Element displays correctly

  @positive @applitools
  Scenario: Enable typeAhead for Select component
    When I check typeAhead checkbox
    Then Select typeAhead is enabled
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Set Select label to <label>
    When I set label to "<label>"
    Then label is set to "<label>"
      And Element displays correctly
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive @applitools
  Scenario: Disable Select
    When I check disabled checkbox
    Then Select is disabled
      And Element displays correctly

  @positive @applitools
  Scenario: Disable and enable Select
    Given I check disabled checkbox
    When I uncheck disabled checkbox
    Then Select is enabled
      And Element displays correctly

  @positive @applitools
  Scenario: Select is readOnly
    When I check readOnly checkbox
    Then Select is readOnly
      And Element displays correctly

  @positive @applitools
  Scenario: Select is not readOnly
    Given I check readOnly checkbox
    When I uncheck readOnly checkbox
    Then Select is not readOnly
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Change Select component placeholder to <placeholder>
    When I set placeholder to "<placeholder>"
    Then Select placeholder on preview is set to "<placeholder>"
      And Element displays correctly
    Examples:
      | placeholder             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @ignore
  # ignored because this functionality works only for modern theme
  Scenario Outline: Change Select size to <size>
    When I select size to "<size>"
    Then Select size on preview is set to "<size>"
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive @applitools
  Scenario: Verify the inner context of Select Multiple component
    When Type "Amber" text into input and select the value
      And Type "Black" text into input and select the value
      And Type "Green" text into input and select the value
    Then Select multiple input 1 element and has "Amber" value
      And Select multiple input 2 element and has "Black" value
      And Select multiple input 3 element and has "Green" value
      And Element displays correctly

  @positive @applitools
  Scenario: Check the change function call for Select Multiple component
    Given clear all actions in Actions Tab
    When Type "Black" text into input and select the value
    Then change action was called in Actions Tab
      And Element displays correctly