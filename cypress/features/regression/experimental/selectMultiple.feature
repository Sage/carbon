Feature: Select multiple component
  I want to change Select multiple component properties

  Background: Open Select multiple component page
    Given I open "Experimental Select" component page multiple

  @positive
  Scenario: Disable filterable for Select component
    When I uncheck filterable checkbox
      And Type "aaa" text into input
    Then Select input has "" value

  @positive
  Scenario: Disable and enable filterable for Select component
    When I uncheck filterable checkbox
      And I check filterable checkbox
      And Type "Amber" text into input and select the value
    Then Select multiple input 1 element and has "Amber" value

  @positive
  Scenario: Disable typeAhead for Select component
    Given I check typeAhead checkbox
    When I uncheck typeAhead checkbox
    Then Select typeAhead is disabled

  @positive
  Scenario: Enable typeAhead for Select component
    When I check typeAhead checkbox
    Then Select typeAhead is enabled

  @positive
  Scenario Outline: Set Select label to <label>
    When I set label to "<label>"
    Then label is set to "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Disable Select
    When I check disabled checkbox
    Then Select is disabled

  @positive
  Scenario: Disable and enable Select
    Given I check disabled checkbox
    When I uncheck disabled checkbox
    Then Select is enabled

  @positive
  Scenario: Select is readOnly
    When I check readOnly checkbox
    Then Select is readOnly

  @positive
  Scenario: Select is not readOnly
    Given I check readOnly checkbox
    When I uncheck readOnly checkbox
    Then Select is not readOnly

  @positive
  Scenario Outline: Change Select component placeholder to <placeholder>
    When I set placeholder to "<placeholder>"
    Then Select placeholder on preview is set to "<placeholder>"
    Examples:
      | placeholder             |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

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

  @positive
  Scenario: Verify the inner context of Select Multiple component
    When Type "Amber" text into input and select the value
      And Type "Black" text into input and select the value
      And Type "Green" text into input and select the value
    Then Select multiple input 1 element and has "Amber" value
      And Select multiple input 2 element and has "Black" value
      And Select multiple input 3 element and has "Green" value

  @positive
  Scenario: Check the change function call for Select Multiple component
    Given clear all actions in Actions Tab
    When Type "Black" text into input and select the value
    Then change action was called in Actions Tab