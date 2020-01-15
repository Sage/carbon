Feature: Deprecated Form component
  I want to change deprecated Form component properties

  Background: Open deprecated Form component page
    Given I open deprecated "Form" component page

  @positive
  @deprecated
  Scenario: Show save button
    When I uncheck save checkbox
      And I check save checkbox
    Then save button is visible

  @positive
  @deprecated
  Scenario: Hide save button
    When I uncheck save checkbox
    Then save button is not visible

  @positive
  @deprecated
  Scenario: Show cancel button
    When I uncheck cancel checkbox
      And I check cancel checkbox
    Then cancel button is visible

  @positive
  @deprecated
  Scenario: Hide cancel button
    When I uncheck cancel checkbox
    Then cancel button is not visible

  @positive
  @deprecated
  Scenario Outline: Align buttons to <direction>
    When I select buttonAlign to "<direction>"
    Then buttons are aligned to "<direction>" for deprecated component
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  @deprecated
  Scenario: Enable saving
    When I check saving checkbox
    Then save button is disabled

  @positive
  @deprecated
  Scenario: Disable saving
    When I check saving checkbox
      And I uncheck saving checkbox
    Then save button is not disabled

  @positive
  @deprecated
  Scenario Outline: Change cancel button text to <cancelText>
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
  @deprecated
  Scenario Outline: Change save button text to <saveText>
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
  @deprecated
  Scenario Outline: Change additional actions text to <additionalActions>
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
  @deprecated
  Scenario Outline: Change left aligned actions text to <leftAlignedActions>
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
  @deprecated
  Scenario Outline: Change right aligned actions text to <rightAlignedActions>
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
  @deprecated
  Scenario: Enable show summary
    When I check showSummary checkbox
      And I save form
    Then summary is visible

  @positive
  @deprecated
  Scenario: Disable show summary
    When I check showSummary checkbox
      And I uncheck showSummary checkbox
      And I save form
    Then summary is not visible

  @positive
  @deprecated
  Scenario: Check validation
    When I save form
    Then input is validated
      And error message is "This field is required."