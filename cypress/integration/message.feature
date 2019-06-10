Feature: Message component
  I want to change Message component properties

  Background: Open Message component page
    Given I open "Message" component page

  @positive
  Scenario Outline: Change Message title
    When I set title to "<title>"
    Then Message title on preview is set to "<title>"
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

@positive
  Scenario Outline: Change type of Message component
    When I select type to "<type>"
    Then Message type on preview is "<typeResult>"
    Examples:
      | type    | typeResult |
      | error   | error      |
      | info    | info       |
      | success | tick       |
      | warning | warning    |

  @positive
  Scenario: Enable open state of Message component
    When I check open checkbox
    Then Message component is visible

  @positive
  Scenario: Disable open state of Message component
    When I check open checkbox
      And I uncheck open checkbox
    Then Message component is not visible

  @positive
  Scenario: Enable transparent state for a Message component
    When I check transparent checkbox
    Then Message component is transparent

  @positive
  Scenario: Disable transparent state for a Message component
    When I check open checkbox
      And I uncheck open checkbox
    Then Message component is not transparent

  @positive
  Scenario Outline: Change Message children
    When I set children to "<children>"
    Then Message children on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Enable on dismiss state for a Message component
    When I check onDismiss checkbox
    Then Message has cross icon
      And clear all actions in Actions Tab
      And I click dismiss icon
      And click action was called in Actions Tab

  @positive
  Scenario: Disable on dismiss state for a Message component
    When I check onDismiss checkbox
      And I uncheck onDismiss checkbox
    Then Message has no cross icon