Feature: Experimental Date Input component
  I want to check Experimental Date Input component properties

  @positive
  Scenario: Disable Date Input
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "disabled" object name
    Then Date input is disabled

  @negative
  Scenario: Disable and enable Date Input
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "disabledFalse" object name
    Then Date input is enabled

  @positive
  Scenario: Date Input component is readOnly
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "readOnly" object name
    Then Date input component is readOnly

  @negative
  Scenario: Date Input component is not readOnly
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "readOnlyFalse" object name
    Then Date input component is not readOnly

  @positive
  Scenario Outline: Change DateInput component field help to <fieldHelp>
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change DateInput label to <label>
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                   | nameOfObject          |
      | mp150ú¿¡üßä             | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelSpecialCharacter |

  @positive
  Scenario: Enable label inline checkbox for Date Input component
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "labelInline" object name
    Then label is inline

  @positive
  Scenario Outline: Change Date Input component label align to <labelAlign>
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario Outline: Change Date Input component label width to <width>
    When I open default "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "<nameOfObject>" object name
    Then label width on preview is <width>
    Examples:
      | width | nameOfObject  |
      | 0     | labelWidth0   |
      | 10    | labelWidth10  |
      | 100   | labelWidth100 |

  @positive
  Scenario: Change Date Input component minDate
    Given I open "Experimental Date Input" component page
      And I set minDate to today
      And I set dateInput to today
    When I choose date yesterday via DayPicker
    Then the date before minDate is not available

  @positive
  Scenario: Change Date Input component maxDate
    Given I open "Experimental Date Input" component page
      And I set maxDate to today
      And I set dateInput to today
    When I choose date tomorrow via DayPicker
    Then the date after maxDate is not available

  @positive
  Scenario: Check Date Input today date
    Given I open "Experimental Date Input" component page
    When I set dateInput to today
    Then the date is set to today

  @positive
  Scenario: Open dayPickerDay via click on input
    Given I open "Experimental Date Input" component page
    When I click dateInput
    Then dayPickerDay is visible

  @positive
  Scenario: Close dayPickerDay via click on input
    Given I open "Experimental Date Input" component page
    When I click dateInput twice
    Then dayPickerDay is not visible

  @positive
  Scenario: Open dayPickerDay via click on icon
    Given I open "Experimental Date Input" component page
    When I click onto date icon
    Then dayPickerDay is visible

  @positive
  Scenario: Close dayPickerDay via click on icon
    Given I open "Experimental Date Input" component page
    When I click onto date icon twice
    Then dayPickerDay is not visible

  @positive
  Scenario: Check mandatory field of dateInput is visible 
    When I open required "Experimental Date Input" component in noIFrame with "dateInput" json from "experimental" using "required" object name
    Then the field must have the required property
