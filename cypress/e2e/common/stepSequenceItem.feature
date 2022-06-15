Feature: Step Sequence Item component
  I want to test Step Sequence Item component properties

  @positive
  Scenario Outline: I set indicator to <indicator>
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "<nameOfObject>" object name
    Then indicator is set to <indicator>
    Examples:
      | indicator                    | nameOfObject              |
      | -100                         | indicator-100             |
      | 0                            | indicator0                |
      | 999                          | indicator999              |
      | mp150ú¿¡üßä                  | indicatorOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | indicatorSpecialCharacter |

  @positive
  Scenario: Show indicator
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "showIndicator" object name
    Then indicator 999 is shown

  @positive
  Scenario: Hide indicator
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "hideIndicator" object name
    Then indicator 999 is not shown

  @positive
  Scenario: I set hiddenCompleteLabel to mp150ú¿¡üßä
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "hiddenCompleteLabelOtherLanguage" object name
    Then hidden label is set to mp150ú¿¡üßä

  @positive
  Scenario: I set hiddenCurrentLabel to mp150ú¿¡üßä
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "hiddenCurrentLabelOtherLanguage" object name
    Then hidden label is set to mp150ú¿¡üßä

  @positive
  Scenario Outline: I set ariaLabel to <ariaLabel>
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "<nameOfObject>" object name
    Then ariaLabel is set to <ariaLabel>
    Examples:
      | ariaLabel                    | nameOfObject              |
      | mp150ú¿¡üßä                  | ariaLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | ariaLabelSpecialCharacter |

  @positive
  Scenario Outline: I set children to <children>
    When I open step-sequence-item "Step Sequence Test" component with "stepSequence" json from "commonComponents" using "<nameOfObject>" object name
    Then children is set <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |
