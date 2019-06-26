Feature: Pill component
  I want to test Pill component

  Background: Open Pill component page
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
  Scenario Outline: Set Pill as align to <as>
    When I select as to "<as>"
    Then Pill as on preview is "<as>"
    Examples:
      | as          |
      | default     |
      | error       |
      | help        |
      | info        |
      | maintenance |
      | new         |
      | success     |
      | warning     |

  @positive
  Scenario: Enable and disable fill checkbox for a Pill component
    When I check fill checkbox
      And I uncheck fill checkbox
    Then Pill component has no fill property

  @positive
  Scenario: Enable fill checkbox for a Pill component
    When I check fill checkbox
    Then Pill component has fill property

  @positive
  Scenario: Enable and disable onDelete checkbox for a Pill component
    When I check onDelete checkbox
      And I uncheck onDelete checkbox
    Then Pill component has no onDelete property

  @positive
  Scenario: Enable onDelete checkbox for a Pill component
    When I check onDelete checkbox
    Then Pill component has onDelete property

  @positive
  Scenario: Enable onDelete checkbox and check the delete click event
    When I check onDelete checkbox
      And clear all actions in Actions Tab
      And I click cross icon
    Then delete action was called in Actions Tab