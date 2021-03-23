Feature: Experimental Date Input component
  I want to check Experimental Date Input component properties

  @positive
  Scenario Outline: Change DateInput component field help to <fieldHelp>
    When I open default "Experimental Date Input Test" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change DateInput label to <label>
    When I open default "Experimental Date Input Test" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                   | nameOfObject          |
      | mp150ú¿¡üßä             | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelSpecialCharacter |

  @positive
  Scenario Outline: Change Date Input component label align to <labelAlign>
    When I open default "Experimental Date Input Test" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario: Change Date Input component minDate
    Given I open "Experimental Date Input Test" component page "default"
      And I set minDate to today
      And I set dateInput to today
    When I choose date yesterday via DayPicker
    Then the date before minDate is not available

  @positive
  Scenario: Change Date Input component maxDate
    Given I open "Experimental Date Input Test" component page "default"
      And I set maxDate to today
      And I set dateInput to today
    When I choose date tomorrow via DayPicker
    Then the date after maxDate is not available

  @positive
  Scenario: Check Date Input today date
    Given I open "Experimental Date Input Test" component page "default"
    When I set dateInput to today
    Then the date is set to today

  @positive
  Scenario: Open dayPickerDay via click on input
    Given I open "Experimental Date Input Test" component page "default"
    When I click dateInput
    Then dayPickerDay is visible

  @positive
  Scenario: Close dayPickerDay via click on input
    Given I open "Experimental Date Input Test" component page "default"
    When I click dateInput twice
    Then dayPickerDay is not visible

  @positive
  Scenario: Open dayPickerDay via click on icon
    Given I open "Experimental Date Input Test" component page "default"
    When I click onto date icon
    Then dayPickerDay is visible

  @positive
  Scenario: Close dayPickerDay via click on icon
    Given I open "Experimental Date Input Test" component page "default"
    When I click onto date icon twice
    Then dayPickerDay is not visible

  @positive
  Scenario Outline: Show Date input at the <position> position
    Given I open default "Experimental Date Input Test" component in noIFrame with "dateInput" json from "experimental" using "<marginTop>" object name
    When I click dateInput in noIframe
    Then Date input is visible at the <position>
    Examples:
      | position | marginTop |
      | bottom   | small     |
      | top      | large     |