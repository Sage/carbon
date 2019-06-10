Feature: Toast component
  I want to change Toast component properties

  Background: Open Toast component component page
    Given I open "Toast" component page classic

  @positive
  Scenario Outline: Change Toast as <as> property
    When I select as to "<as>"
    Then Toast as is set to "<as>" and icon is set to "<icon>"
    Examples:
      | as          | icon     |
      | error       | error    |
      | help        | question |
      | info        | info     |
      | maintenance | settings |
      | new         | gift     |
      | success     | tick     |
      | warning     | warning  |
      | default     | default  |

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
    When I uncheck open checkbox
      And I check open checkbox
    Then Toast component is visible

  @positive
  Scenario: Disable open checkbox for a Toast component
    When I uncheck open checkbox
    Then Toast component is not visible

  @positive
  Scenario: Enable onDismiss checkbox for a Toast component
    When I uncheck onDismiss checkbox
      And I check onDismiss checkbox
    Then Toast component has a close icon

  @positive
  Scenario: Disable onDismiss checkbox for a Toast component
    When I uncheck onDismiss checkbox
    Then Toast component has no close icon

  @positive
  Scenario: Verify the click action in Actions Tab
    When clear all actions in Actions Tab
      And I click closeIcon
    Then clicked action was called in Actions Tab