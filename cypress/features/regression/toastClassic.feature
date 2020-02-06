Feature: Toast classic component
  I want to change Toast classic component properties

  Background: Open Toast component page classic
    Given I open "Toast" component page classic

  @positive
  Scenario Outline: Change Toast as <as> property
    When I select as to "<as>"
    Then Toast icon is set to "<icon>"
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
  Scenario: Verify the click action in Actions Tab
    When clear all actions in Actions Tab
      And I click closeIcon
    Then clicked action was called in Actions Tab