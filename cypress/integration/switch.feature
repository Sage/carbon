Feature: Switch component
  I want to change Switch properties

  Background: Open Switch component page
    Given I open "Switch" component page

  @positive
  Scenario Outline: Change Switch component field help to <fieldHelp>
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
  Scenario: Enable fieldHelpInline
    When I check fieldHelpInline checkbox
    Then Switch component is set to fieldHelpInline

  @positive
  Scenario: Disable fieldHelpInline
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then Switch component is not set to fieldHelpInline

  @positive
  Scenario Outline: Change Switch component label to <label>
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
  Scenario: Enable labelInline property
    When I check labelInline checkbox
    Then Switch component is set to labelInline

  @positive
  Scenario: Disable labelInline property
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Switch component is not set to labelInline

@positive
  Scenario Outline: Change Switch input to <width>
    When I set inputWidth slider to <width>
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 50    |
      | 150   |

  @positive
  Scenario: Enable reverse property
    When I check reverse checkbox
    Then Switch component is reversed

  @positive
  Scenario: Disable reverse property
    When I check reverse checkbox
      And I uncheck reverse checkbox
    Then Switch component is not reversed

  @positive
  Scenario: Enable loading property
    # It's checked by default
    When I check loading checkbox
    Then Switch component is loading

  @positive
  Scenario: Disable loading property
    When I check loading checkbox
      And I uncheck loading checkbox
    Then Switch component is not loading

  @ignore
  #Ignored test because children property does not change anything on Storybook / Carbon
  @positive
  Scenario Outline: Change Switch component children to <children>
    When I set children to "<children>"
    Then children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |