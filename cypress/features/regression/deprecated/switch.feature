Feature: Deprecated Switch component
  I want to change deprecated Switch properties

  Background: Open deprecated Switch component page
    Given I open deprecated "Switch" component page

  @positive
  @deprecated
  Scenario Outline: Change Switch component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Enable fieldHelpInline
    When I check fieldHelpInline checkbox
    Then Switch component is set to fieldHelpInline

  @positive
  @deprecated
  Scenario: Disable fieldHelpInline
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then Switch component is not set to fieldHelpInline

  @positive
  @deprecated
  Scenario Outline: Change Switch component label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Enable labelInline property
    When I check labelInline checkbox
    Then Switch component is set to labelInline

  @positive
  @deprecated
  Scenario: Disable labelInline property
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Switch component is not set to labelInline

  @positive
  @deprecated
  Scenario Outline: Change Switch input to <width>
    When I set inputWidth slider to <width>
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 50    |
      | 150   |

  @positive
  @deprecated
  Scenario: Enable reverse property
    When I uncheck reverse checkbox
      And I check reverse checkbox
    Then Switch component is reversed

  @positive
  @deprecated
  Scenario: Disable reverse property
    When I uncheck reverse checkbox
    Then Switch component is not reversed

  @positive
  @deprecated
  Scenario: Enable loading property
    When I check loading checkbox
    Then Switch component is loading

  @positive
  @deprecated
  Scenario: Disable loading property
    When I check loading checkbox
      And I uncheck loading checkbox
    Then Switch component is not loading