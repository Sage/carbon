Feature: Deprecated Date Input component
  I want to change deprecated Date Input component properties

  Background: Open deprecated Date Input component page
    Given I open deprecated "Date Input" component page

  @positive
  @deprecated
  Scenario: Disable Date Input
    When I disable DateInput component
    Then Date input is disabled for deprecated component

  @positive
  @deprecated
  Scenario: Disable and enable Date Input
    When I disable DateInput component
      And I enable DateInput component
    Then Date input is enabled for deprecated component

  @positive
  @deprecated
  Scenario: Date Input component is readOnly
    When I check readOnly checkbox
    Then Date input component is readOnly for deprecated component

  @positive
  @deprecated
  Scenario: Date Input component is not readOnly
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Date input component is not readOnly for deprecated component

  @positive
  @deprecated
  Scenario Outline: Change DateInput component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Change DateInput label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Enable label inline checkbox for Date Input component
    When I check labelInline checkbox
    Then DateInput labelInline is enabled

  @positive
  @deprecated
  Scenario: Disable label inline checkbox for Date Input component
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then DateInput labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Change Date Input component label align to <labelAlign>
    When I set label to "label"
      And I set labelHelp to "label"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  @deprecated
  Scenario Outline: Change Date Input component label width to <width>
    When I check labelInline checkbox
      And I set label width slider to <width>
    Then DateInput labelWidth is set to "<width>"
    Examples:
      | width |
      | 10    |
      | 50    |
      | 100   |

  @positive
  @deprecated
  Scenario: Change Date Input component minDate
    When I set minDate to today
      And I click dateInput
      And I choose date yesterday via DayPicker
      And I click dateInput
    Then the date before minDate is not available

  @positive
  @deprecated
  Scenario: Change Date Input component maxDate
    When I set maxDate to today
      And I click dateInput
      And I choose date tomorrow via DayPicker
      And I click dateInput
    Then the date after maxDate is not available

  @positive
  @deprecated
  Scenario Outline: Change Date Input component label width to <width>
    When I check labelInline checkbox
      And I set label width slider to <width>
    Then DateInput labelWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @positive
  @deprecated
  Scenario Outline: Change Date Input component inputWidth using slider to <width>
    When I check labelInline checkbox
      And I set inputWidth slider to <width>
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 50    |

  @positive
  @deprecated
  Scenario: Check Date Input today date
    When I click dateInput
    Then the date is set to today