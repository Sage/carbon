Feature: Toast component
  I want to change Toast component properties

  Background: Open Toast component default page
    Given I open "Toast" component page

  @positive
  Scenario Outline: Change Toast variant to <variant>
    When I select variant to "<variant>"
    Then Toast icon is set to "<icon>"
    Examples:
      | variant | icon  |
      | error   | error |
      | success | tick  |

  @positive
  Scenario Outline: Change Toast children to <children>
    When I set children to "<children>"
    Then Toast children is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Enable open checkbox for a Toast component
    Given I uncheck open checkbox
    When I check open checkbox
    Then Toast component is visible

  @positive
  Scenario: Disable open checkbox for a Toast component
    When I uncheck open checkbox
    Then Toast component is not visible

  @positive
  Scenario: Enable onDismiss checkbox for a Toast component
    Given I uncheck onDismiss checkbox
    When I check onDismiss checkbox
    Then Toast component has a close icon

  @positive
  Scenario: Disable onDismiss checkbox for a Toast component
    When I uncheck onDismiss checkbox
    Then Toast component has no close icon

  @positive
  Scenario Outline: Verify Toast color
    When I select variant to "<variant>"
    Then Toast has background-color "<color>" and border "<color>" color
    Examples:
      | variant | color            |
      | error   | rgb(199, 56, 79) |
      | success | rgb(0, 176, 0)   |

  @positive
  Scenario: Verify the click action in Actions Tab
    When clear all actions in Actions Tab
      And I click closeIcon
    Then click action was called in Actions Tab