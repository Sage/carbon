Feature: Experimental Form component
  I want to change Experimental Form component properties

  Background: Open Experimental Form component page
    Given I open "Experimental Form" component page

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
  Scenario Outline: Align buttons to <direction>
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
  Scenario Outline: Change cancel button text to <cancelText>
    When I set cancelText to <cancelText> word
    Then cancel button text is set to <cancelText>
    Examples:
      | cancelText                   |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Change save button text to <saveText>
    When I set saveText to <saveText> word
    Then save button text is set to <saveText>
    Examples:
      | saveText                     |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Change additional actions type to <additionalActions>
    When I select additionalActions to "<additionalActions>"
    Then additionalAction button is set to "<additionalActions>" and has text "Additional Action"
    Examples:
      | additionalActions |
      | Button            |
      | Link              |

  @positive
  Scenario Outline: Change left aligned actions type to <leftAlignedActions>
    When I select leftAlignedActions to "<leftAlignedActions>"
    Then alignedActions button is set to "<leftAlignedActions>" and has text "Left Action"
    Examples:
      | leftAlignedActions |
      | Button             |
      | Link               |

  @positive
  Scenario Outline: Change right aligned actions type to <rightAlignedActions>
    When I select rightAlignedActions to "<rightAlignedActions>"
    Then alignedActions button is set to "<rightAlignedActions>" and has text "Right Action"
    Examples:
      | rightAlignedActions |
      | Button              |
      | Link                |