Feature: Form component
  I want to change Form component properties

  Background: Open Form component page
    Given I open "Form" component page

  @positive
  Scenario: Show save button
    When I uncheck save checkbox
      And I check save checkbox
    Then save button is visible

  @positive
  Scenario: Hide save button
    When I uncheck save checkbox
    Then save button is not visible

  @positive
  Scenario: Show cancel button
    When I uncheck cancel checkbox
      And I check cancel checkbox
    Then cancel button is visible

  @positive
  Scenario: Hide cancel button
    When I uncheck cancel checkbox
    Then cancel button is not visible

  @positive
  Scenario Outline: Align buttons to left/right
    When I select buttonAlign to "<direction>"
    Then buttons are aligned to "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario: Enable saving
    When I check saving checkbox
    Then save button is disabled

  @positive
  Scenario: Disable saving
    When I check saving checkbox
      And I uncheck saving checkbox
    Then save button is not disabled

  @positive
  Scenario Outline: Change cancel button text
    When I set cancelText to "<cancelText>"
    Then cancel button text is set to "<cancelText>"
    Examples:
      | cancelText              |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change save button text
    When I set saveText to "<saveText>"
    Then save button text is set to "<saveText>"
    Examples:
      | saveText                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change additional actions text
    When I set additionalActions to "<additionalActions>"
    Then additional actions text is set to "<additionalActions>"
    Examples:
      | additionalActions       |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change left aligned actions text
    When I set leftAlignedActions to "<leftAlignedActions>"
    Then left aligned actions text is set to "<leftAlignedActions>"
    Examples:
      | leftAlignedActions      |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change right aligned actions text
    When I set rightAlignedActions to "<rightAlignedActions>"
    Then right aligned actions text is set to "<rightAlignedActions>"
    Examples:
      | rightAlignedActions     |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Enable show summary
    When I check showSummary checkbox
      And I save form
    Then summary is visible

  @positive
  Scenario: Disable show summary
    When I check showSummary checkbox
      And I uncheck showSummary checkbox
      And I save form
    Then summary is not visible

  @positive
  Scenario: Check validation
    When I save form
    Then input is validated
      And error message is "This field is required."