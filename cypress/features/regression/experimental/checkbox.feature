Feature: Experimental Checkbox component
  I want to change Experimental Checkbox properties

  Background: Open Experimental Checkbox component page
    Given I open "Experimental Checkbox" component page

  @positive
  Scenario Outline: Change Checkbox component label to <label>
    When I set label to <label> word
    Then checkbox label on preview is <label>
    Examples:
      | label                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Disable and enable checkbox
    Given I check disabled checkbox
    When I uncheck disabled checkbox
    Then Checkbox is enabled

  @positive
  Scenario: Disable checkbox
    When I check disabled checkbox
    Then Checkbox is disabled

  @positive
  Scenario Outline: Change Checkbox component field help to <fieldHelp>
    When I set fieldHelp to <fieldHelp> word
    Then fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Enable fieldHelpInline
    When I check fieldHelpInline checkbox
    Then Checkbox is set to fieldHelpInline and has margin-left set to "16px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    Given I check fieldHelpInline checkbox
    When I uncheck fieldHelpInline checkbox
    Then Checkbox is not set to fieldHelpInline and has margin set to "0px 0px 0px 16px"

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
    When I set labelHelp to <labelHelp> word
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Change Checkbox label align to <direction>
    When I select labelAlign to "<direction>"
    Then Checkbox labelAlign on preview is set to "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change Checkbox size to <size>
    When I select size to "<size>"
    Then Checkbox size on preview is set to "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario: Change Checkbox tick color
    When I mark checkbox on preview
    Then Checkbox tick has color "rgba(0, 0, 0, 0.9)"