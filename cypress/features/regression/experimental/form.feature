Feature: Experimental Form component
  I want to check Experimental Form component properties

  @positive
  Scenario: Show save button
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "saveButtonEnabled" object name
    Then save button is visible

  @positive
  Scenario: Hide save button
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "saveButtonDisabled" object name
    Then save button is not visible

  @positive
  Scenario: Show cancel button
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "cancelButtonEnabled" object name
    Then cancel button is visible

  @positive
  Scenario: Hide cancel button
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "cancelButtonDisabled" object name
    Then cancel button is not visible

  @positive
  Scenario Outline: Align buttons to <direction>
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "<nameOfObject>" object name
    Then buttons are aligned to "<direction>"
    Examples:
      | direction | nameOfObject     |
      | left      | buttonAlignLeft  |
      | right     | buttonAlignRight |

  @positive
  Scenario: Enable saving
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "savingEnabled" object name
    Then save button is disabled

  @positive
  Scenario: Disable saving
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "savingDisabled" object name
    Then save button is not disabled

  @positive
  Scenario Outline: Change cancel button text to <cancelText>
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "<nameOfObject>" object name
    Then cancel button text is set to <cancelText>
    Examples:
      | cancelText                   | nameOfObject                     |
      | mp150ú¿¡üßä                  | cancelButtonTextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | cancelButtonTextSpecialCharacter |

  @positive
  Scenario Outline: Change save button text to <saveText>
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "<nameOfObject>" object name
    Then save button text is set to <saveText>
    Examples:
      | saveText                     | nameOfObject                   |
      | mp150ú¿¡üßä                  | saveButtonTextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | saveButtonTextSpecialCharacter |

  @positive
  Scenario Outline: Change additional actions type to <additionalActions>
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "<nameOfObject>" object name
    Then additionalAction button is set to "<additionalActions>" and has text "Additional Action"
    Examples:
      | additionalActions | nameOfObject                |
      | Button            | additionalActionsTypeButton |
      | Link              | additionalActionsTypeLink   |

  @positive
  Scenario Outline: Change left aligned actions type to <leftAlignedActions>
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "<nameOfObject>" object name
    Then alignedActions button is set to "<leftAlignedActions>" and has text "Left Action"
    Examples:
      | leftAlignedActions | nameOfObject                 |
      | Button             | leftAlignedActionsTypeButton |
      | Link               | leftAlignedActionsTypeLink   |

  @positive
  Scenario Outline: Change right aligned actions type to <rightAlignedActions>
    When I open default "Experimental-Form" component in noIFrame with "form" json from "experimental" using "<nameOfObject>" object name
    Then alignedActions button is set to "<rightAlignedActions>" and has text "Right Action"
    Examples:
      | rightAlignedActions | nameOfObject                  |
      | Button              | rightAlignedActionsTypeButton |
      | Link                | rightAlignedActionsTypeLink   |