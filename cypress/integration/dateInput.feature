Feature: Date Input component
  I want to change Date Input component properties

# Added Experimental untill the component will be merged with master
  Background: Open Date Input component page
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
  Scenario Outline: Change DateInput component field help
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change DateInput label
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario: Enable label inline checkbox for Date Input component
   When I set label to "labelSample"
      And I check labelInline checkbox
    Then label is set to inline

  @positive
  Scenario Outline: Change Date Input component label align
    When I set label to "<label>"
      And I set labelHelp to "<label>"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then label align on preview is set to "<labelAlign>"
    Examples:
      | label        | labelAlign |
      | Sample text  |  left      |
      | Sample text  |  right     |

  @positive
  Scenario Outline: Change Date Input component label width
    When I set label to "<label>"
      And I check labelInline checkbox
      And I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | label       | width |
      | Sample text |  0    |
      | Sample text |  10   |
      | Sample text |  50   |
      | Sample text |  100  |

  @positive
  Scenario Outline: Change Date Input component minDate
    When I set minDate to "<minDate>"
      And I click dateInput
      And I choose date "<day>" via DayPicker
      And I click dateInput
    Then the date "<day>" before minDate is not available
    Examples:
      | minDate     | day             |
      | 20190505    | Sat May 4, 2019 |

  @positive
  Scenario Outline: Change Date Input component maxDate
    When I set maxDate to "<maxDate>"
      And I click dateInput
      And I choose date "<day>" via DayPicker
      And I click dateInput
    Then the date "<day>" after maxDate is not available
    Examples:
      | maxDate     | day              |
      | 20190509    | Fri May 10, 2019 |

  @positive 
  Scenario Outline: Change Date Input component label width with slider
    When I set label to "Sample text"
      And I check labelInline checkbox
      And I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | width |
      |  0    |
      |  10   |
      |  50   |
      |  100  |      

  @positive 
  Scenario: Check Date Input today date
    When I click dateInput
    Then the date is set to today