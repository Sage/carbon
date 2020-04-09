Feature: Experimental Checkbox component
  I want to change Experimental Checkbox properties

  Background: Open Experimental Checkbox component page
    Given I open "Experimental Checkbox" component page

  @positive @applitools
  Scenario Outline: Change Checkbox component label to <label>
    When I set label to "<label>"
    Then checkbox label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive @applitools
  Scenario: Disable and enable checkbox
    Given I check disabled checkbox
    When I uncheck disabled checkbox
    Then Checkbox is enabled
      And Element displays correctly

  @positive @applitools
  Scenario: Disable checkbox
    When I check disabled checkbox
    Then Checkbox is disabled
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Change Checkbox component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
      And Element displays correctly
    Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive @applitools
  Scenario: Enable fieldHelpInline
    When I check fieldHelpInline checkbox
    Then Checkbox is set to fieldHelpInline and has margin-left set to "16px"
      And Element displays correctly

  @positive @applitools
  Scenario: Enable and disable fieldHelpInline
    Given I check fieldHelpInline checkbox
    When I uncheck fieldHelpInline checkbox
    Then Checkbox is not set to fieldHelpInline and has margin set to "0px 0px 0px 16px"
      And Element displays correctly

  @positive @applitools
  Scenario: Enable reverse checkbox
    When I check reverse checkbox
    Then Checkbox is set to reverse and has width "16px"
      And Element displays correctly

  @positive @applitools
  Scenario: Enable and disable reverse checkbox
    # Given I open "Experimental Checkbox" component page
    Then Checkbox is not set to reverse and has width "16px"
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Change Checkbox component label help to <labelHelp>
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
      And Element displays correctly
    Examples:
      | labelHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive @applitools
  Scenario Outline: Change Checkbox label align to <direction>
    When I select labelAlign to "<direction>"
    Then Checkbox labelAlign on preview is set to "<direction>"
      And Element displays correctly
    Examples:
      | direction |
      | left      |
      | right     |

  @positive @applitools
  Scenario Outline: Change Checkbox size to <size>
    When I select size to "<size>"
    Then Checkbox size on preview is set to "<size>"
      And Element displays correctly
    Examples:
      | size  |
      | small |
      | large |

  @positive @applitools
  Scenario: Change Checkbox tick color
    When I mark checkbox on preview
    Then Checkbox tick has color "rgba(0, 0, 0, 0.9)"
      And Element displays correctly