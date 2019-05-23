Feature: Number Input component
  I want to change Number Input component properties

  Background: Open Number Input component page
    Given I open "Number Input" component page

  @positive
  Scenario Outline: Set input width
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @negative
  Scenario Outline: Set input width out of scope
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is not set
    Examples:
      | inputWidth              |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @ignore
  # currently out of scope
  Scenario: Time to disappear
    When I set timeToDisappear to "<timeToDisappear>"
    Then component disappears after "<timeToDisappear>"

  @positive
  Scenario Outline: Change field help text to <fieldHelp>
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

  @ignore
  # not working on storybook neither carbon demo site
  Scenario: Enable field help inline
    When I check fieldHelpInline checkbox
    Then fieldHelpInline is enabled

  @ignore
  # not working on storybook neither carbon demo site
  Scenario: Disable label inline
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then fieldHelpInline is disabled

  @positive
  Scenario Outline: Set label to <label>
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
  Scenario: Enable label inline
    When I check labelInline checkbox
    Then NumberInput labelInline is enabled

  @positive
  Scenario: Disable label inline
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then NumberInput labelInline is disabled

  @positive
  Scenario Outline: Set label width
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then NumberInput labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set label align to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | right      |
      | left       |

  Scenario Outline: Change label help text to <labelHelp>
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |