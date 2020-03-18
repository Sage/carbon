Feature: Pill component
  I want to test Pill component properties

  Background: Open Pill component default page
    Given I open "Pill" component page

  @positive
  Scenario Outline: Change Pill children to <children>
    When I set children to "<children>"
    Then Pill children on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Enable and disable fill checkbox for a Pill component
    Given I check fill checkbox
    When I uncheck fill checkbox
    Then Pill component has no backgroundColor "<color>"
      And Pill borderColor has "<color>" color
    Examples:
      | color           |
      | rgb(0, 128, 93) |

  @positive
  Scenario: Enable fill checkbox for a Pill component
    When I check fill checkbox
    Then Pill component has "rgb(0, 128, 93)" fill color

  @positive
  Scenario: Enable and disable onDelete checkbox for a Pill component
    Given I check onDelete checkbox
    When I uncheck onDelete checkbox
    Then Pill component has no onDelete property

  @positive
  Scenario: Enable onDelete checkbox for a Pill component
    When I check onDelete checkbox
    Then Pill component has onDelete property

  @positive
  Scenario: Enable onDelete checkbox and check the delete event
    Given I check onDelete checkbox
      And clear all actions in Actions Tab
    When I click cross icon
    Then delete action was called in Actions Tab

  @positive
  Scenario Outline: Set Pill size to <size>
    When I select size to "<size>"
    Then Pill height is "<height>"
    Examples:
      | size | height |
      | S    | 16     |
      | M    | 20     |
      | L    | 24     |
      | XL   | 26     |

  @positive
  Scenario Outline: Verify the colorVariant color for status pillRole
    Given I select pillRole to "status"
    When I select colorVariant to "<colorVariant>"
    Then Pill borderColor has "<color>" color
    Examples:
      | colorVariant | color             |
      | neutral      | rgb(76, 112, 127) |
      | negative     | rgb(199, 56, 79)  |
      | positive     | rgb(0, 99, 0)     |
      | warning      | rgb(237, 131, 51) |

  @positive
  Scenario: Verify border outline color on focus
    Given I check onDelete checkbox
    When I focus Pill close icon
    Then Pill close icon has golden border outline
      And Pill close icon has "rgb(0, 96, 69)" backgroundColor