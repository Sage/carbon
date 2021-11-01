Feature: Date Input component
  I want to check Date Input component properties

  @positive
  Scenario Outline: Change DateInput component field help to <fieldHelp>
    When I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Change DateInput label to <label>
    When I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "<nameOfObject>" object name
    Then label on preview is <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change Date Input component label align to <labelAlign>
    When I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario: Change Date Input component minDate
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "minDate" object name
    When I set dateInput to minimum date
    Then the date before minDate is not available

  @positive
  Scenario: Change Date Input component maxDate
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "maxDate" object name
    When I set dateInput to maximum date
    Then the date after maxDate is not available

  @positive
  Scenario: Check Date Input today date
    Given I open "Date Input Test" component page "default"
    When I set dateInput to today
    Then the date is set to today

  @positive
  Scenario: Open dayPickerDay via click on input
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "default" object name
    When I click dateInput
    Then dayPickerDay is visible

  @positive
  Scenario: Close dayPickerDay via click on input
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "default" object name
    When I click dateInput twice
    Then dayPickerDay is not visible

  @positive
  Scenario: Open dayPickerDay via click on icon
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "default" object name
    When I click onto date icon
    Then dayPickerDay is visible

  @positive
  Scenario: Close dayPickerDay via click on icon
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "default" object name
    When I click onto date icon twice
    Then dayPickerDay is not visible

  @positive
  Scenario Outline: Show Date input at the <position> position
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "<nameOfObject>" object name
    When I click dateInput
    Then Date input is visible at the <position>
    Examples:
      | position | nameOfObject |
      | bottom   | small        |
      | top      | large        |

  @positive
  Scenario Outline: Verify that <month> month is shown after navigation via arrows in DayPicker
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "default" object name
      And I set dateInput to today
      And I click dateInput
    When I click "<arrow>" arrow
    Then "<month>" month is shown in dayPicker
    Examples:
      | arrow         | month    |
      | chevron_right | next     |
      | chevron_left  | previous |

  @positive
  Scenario Outline: Verify that <month> month is shown after navigation via keyboard <keyboardKey> key in DayPicker
    Given I open default "Date Input Test" component with "dateInput" json from "commonComponents" using "default" object name
      And I set dateInput to today
      And I click dateInput
    When I press "<arrow>" key on focused "<keyboardKey>" arrow of dayPicker
    Then "<month>" month is shown in dayPicker
    Examples:
      | arrow         | month    | keyboardKey |
      | chevron_right | next     | rightarrow  |
      | chevron_left  | previous | leftarrow   |