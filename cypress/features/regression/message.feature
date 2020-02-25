Feature: Message component
  I want to change Message component properties

  Background: Open Message component page
    Given I open "Message" component page

  @positive
  Scenario: CloseIcon has correct border colour
    Given I click closeIcon
    Then closeIcon has golden border on focus

  @positive
  Scenario Outline: Change Message title to <title>
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
  Scenario Outline: Change type of Message component to <type>
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
    # When I check open checkbox
    Then Message component is visible

  @positive
  Scenario: Disable open state of Message component
    When I uncheck open checkbox
    Then Message component is not visible

  @positive
  Scenario: Enable transparent state for a Message component
    When I check transparent checkbox
    Then Message component is transparent

  @positive
  Scenario: Disable transparent state for a Message component
    When I check transparent checkbox
      And I uncheck transparent checkbox
    Then Message component is not transparent

  @positive
  Scenario Outline: Change Message children to <children>
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
  Scenario: Enable on close state for a Message component
    # When I check onDismiss checkbox
    Then Message has cross icon

  @positive
  Scenario: Verify the click function for a Message component
    When clear all actions in Actions Tab
      And I click close icon
    Then click action was called in Actions Tab

  @positive
  Scenario: Disable showCloseIcon for a Message component
    When I uncheck showCloseIcon checkbox
    Then Message has no cross icon
