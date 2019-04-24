Feature: Flash component
  I want to change Flash component properties

  Background: Open Flash component component page
    Given I open "Flash" component page

  @positive
  Scenario Outline: Change as property
    When I set as property to "<as>"
      And I open component preview
    Then Flash as is set to "<as>" and icon is set to "<icon>"
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
  Scenario Outline: Change Flash message
    When I set message property to "<message>"
      And I open component preview
    Then Flash message is set to "<message>"
    Examples:
      | message                  |
      | Example text             |
      | áéíóú¿¡üñ                |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change timeout
    When I set timeout property to <timeout>
      And I open component preview
      And Flash is visible
      And I wait <timeout>
    Then Flash is not visible
    Examples:
      | timeout |
      | 1       |
      | 10      |
      | 100     |
      | 1000    |

  @negative
  Scenario Outline: Set timeout out of scope
    When I set timeout property to <timeout>
      And I open component preview
      And Flash is visible
      # wait max time
      And I wait 1000
    Then Flash is visible
    Examples:
      | timeout |
      | 0       |
      | -1      |
      | -10     |
      | -100    |

  @positive
  Scenario: Close icon
    When I open component preview
      And I click close icon
    Then Flash is not visible

