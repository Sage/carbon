Feature: Experimental Checkbox classic component
  I want to change Experimental Checkbox properties for classic story

  Background: Open Experimental Checkbox component classic page
    Given I open "Experimental Checkbox" component page classic

  @positive
  Scenario Outline: Change Checkbox component label to <label>
    When I set label to "<label>"
    Then checkbox on preview is "<label>"
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
  Scenario: Disable and enable checkbox
    When I check disabled checkbox
      And I uncheck disabled checkbox
    Then Checkbox is enabled

  @positive
  Scenario: Disable checkbox
    When I check disabled checkbox
    Then Checkbox is disabled

  @positive
  Scenario Outline: Change Checkbox component field help to <fieldHelp>
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
  Scenario: Enable fieldHelpInline
    When I check fieldHelpInline checkbox
    Then Checkbox is set to fieldHelpInline and has margin-left set to "15px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then Checkbox is not set to fieldHelpInline and has margin set to "0px 6px 0px 15px"

  @positive
  Scenario: Enable reverse checkbox
    When I check reverse checkbox
    Then Checkbox is set to reverse and has width "16px"

  @positive
  Scenario: Enable and disable reverse checkbox
    # Given I open "Experimental Checkbox" component page
    Then Checkbox is not set to reverse and has width "16px"

  @positive
  Scenario Outline: Change Checkbox component label help to <labelHelp>
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

  @positive
  Scenario Outline: Change Checkbox label align to <direction>
    When I select labelAlign to "<direction>"
    Then Checkbox labelAlign on preview is set to "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario: Change Checkbox tick color
    When I mark checkbox on preview
    Then Checkbox tick has color "rgba(0, 0, 0, 0.85)"