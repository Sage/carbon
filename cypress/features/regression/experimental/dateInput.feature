Feature: Experimental Date Input component
  I want to change Experimental Date Input component properties

  Background: Open Experimental Date Input component page
    Given I open "Experimental Date Input" component page

  @positive
  Scenario: Disable Date Input
    When I disable DateInput component
    Then Date input is disabled

  @negative
  Scenario: Disable and enable Date Input
    When I disable DateInput component
      And I enable DateInput component
    Then Date input is enabled

  @positive
  Scenario: Date Input component is readOnly
    When I check readOnly checkbox
    Then Date input component is readOnly

  @negative
  Scenario: Date Input component is not readOnly
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Date input component is not readOnly

  @positive
  Scenario Outline: Change DateInput component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Change DateInput label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario: Enable label inline checkbox for Date Input component
    When I set label to "labelSample"
      And I check labelInline checkbox
    Then label is set to inline

  @positive
  Scenario Outline: Change Date Input component label align to <labelAlign>
    When I set label to "label"
      And I set labelHelp to "label"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then label align on preview is set to "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  Scenario Outline: Change Date Input component label width to <width>
    When I set label to "label"
      And I check labelInline checkbox
      And I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | width |
      | 0     |
      | 10    |
      | 50    |
      | 100   |

  @positive
  Scenario: Change Date Input component minDate
    When I set minDate to today
      And I click dateInput
      And I choose date yesterday via DayPicker
      And I click dateInput
    Then the date before minDate is not available

  @positive
  Scenario: Change Date Input component maxDate
    When I set maxDate to today
      And I click dateInput
      And I choose date tomorrow via DayPicker
      And I click dateInput
    Then the date after maxDate is not available

  @positive
  Scenario Outline: Change Date Input component label width with slider to <width>
    When I set label to "Sample text"
      And I check labelInline checkbox
      And I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | width |
      | 0     |
      | 10    |
      | 50    |
      | 100   |

  @positive
  Scenario: Check Date Input today date
    When I click dateInput
    Then the date is set to today