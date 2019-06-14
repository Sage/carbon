Feature: Date Range component
  I want to change Confirm component properties

# Added Experimental untill the component will be merged with master
  Background: Open Date Range component page
    Given I open "Experimental Date Range" component page

  @positive
  Scenario Outline: Change Date Range start label to <label>
    When I set startLabel to "<label>"
    Then startLabel on preview is "<label>"
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
  Scenario Outline: Change Date Range end label to <label>
    When I set endLabel to "<label>"
    Then endLabel on preview is "<label>"
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
  Scenario Outline: Enable labels inline checkbox
    When I set startLabel to "<label>"
      And I set endLabel to "<label>"
      And I check labelsInline checkbox
    Then labels are set to inline
    Examples:
      | label       |
      | Sample text |

  @positive
  Scenario Outline: Enable and disable labels inline checkbox
    When I set startLabel to "<label>"
      And I set endLabel to "<label>"
      And I check labelsInline checkbox
      And I uncheck labelsInline checkbox
    Then labels are not set to inline
    Examples:
      | label       |
      | Sample text |

  @ignore
  # @positive Ignored untill validation-branch will be merged with master
  Scenario Outline: Change Date Range Start Message Error component and check the error message
    When I set startMessage to "<startMessage>"
      And I click into startDateInput
      And I choose date "<dayStart>" via DayPicker
      And I hover mouse onto error icon
    Then startMessage error on preview is "<startMessage>"
    Examples:
      | startMessage | dayStart        |
      | Sample text  | Tue Nov 1, 2016 |

  @ignore
  # @positive  Ignored untill validation-branch will be merged with master
  Scenario Outline: Change Date Range End Message Error component and check the error message
    When I set endMessage to "<endMessage>"
      And I click into endDateInput
      And I choose date "<dayEnd>" via DayPicker
      And I hover mouse onto error icon
    Then endMessage error on preview is "<endMessage>"
    Examples:
      | endMessage  | dayEnd           |
      | Sample text | Fri Sep 30, 2016 |