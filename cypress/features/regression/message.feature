Feature: Message component
  I want to change Message component default properties

  Background: Open Message component default page
    Given I open "Message" component page

  @positive
  Scenario: CloseIcon has correct border colour
    Given I click closeIcon
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario Outline: Change Message title to <title>
    When I set title to <title> word
    Then Message title on preview is set to <title>
    Examples:
      | title                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

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
    Given I check transparent checkbox
    When I uncheck transparent checkbox
    Then Message component is not transparent

  @positive
  Scenario Outline: Change Message children to <children>
    When I set children to <children> word
    Then Message children on preview is set to <children>
    Examples:
      | children                     |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Enable on close state for a Message component
    # When I check onDismiss checkbox
    Then Message has cross icon

  @positive
  Scenario: Verify the click function for a Message component
    Given clear all actions in Actions Tab
    When I click close icon
    Then click action was called in Actions Tab

  @positive
  Scenario: Disable showCloseIcon for a Message component
    When I uncheck showCloseIcon checkbox
    Then Message has no cross icon