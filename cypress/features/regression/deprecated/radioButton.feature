Feature: Deprecated Radio Button component
  I want to change deprecated Radio Button component properties

  Background: Open deprecated Radio Button component page
    Given I open deprecated "Radio Button" component page

  @positive
  @deprecated
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Check fieldHelpInline checkbox
    When I check fieldHelpInline checkbox
    Then fieldHelpInline is enabled

  @positive
  @deprecated
  Scenario: Uncheck fieldHelpInline checkbox
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then fieldHelpInline is disabled

  @positive
  @deprecated
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Check labelInline checkbox
    When I check labelInline checkbox
    Then RadioButton labelInline is enabled

  @positive
  @deprecated
  Scenario Outline: Uncheck labelInline checkbox
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then RadioButton labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Set labelHelp to <labelHelp>
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Set inputWidth to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 100        |

  @negative
  @deprecated
  Scenario Outline: Set inputWidth out of scope to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is not set
    Examples:
      | inputWidth              |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
      | <>                      |
      | -1                      |
      | -10                     |

  @positive
  @deprecated
  Scenario Outline: Set labelWidth to <labelWidth>
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then RadioButton labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 100        |

  @negative
  @deprecated
  Scenario Outline: Set labelWidth out of scope to <labelWidth>
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then label width is not set "<labelWidth>"
    Examples:
      | labelWidth              |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
      | -10                     |

  @positive
  @deprecated
  Scenario Outline: Set labelAlign to <direction>
    When I check labelInline checkbox
      And I select labelAlign to "<direction>"
    Then labelAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |