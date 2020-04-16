Feature: Deprecated Decimal component
  I want to change deprecated Decimal component properties

  Background: Open deprecated Decimal component page
    Given I open deprecated "Decimal" component page

  @positive
  @deprecated
  Scenario Outline: Change Decimal component fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Change Decimal component label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Change Decimal input align to the <direction>
    When I select align to "<direction>"
    Then input direction is "<direction>" for deprecated component
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  @deprecated
  Scenario Outline: Change Decimal component label help to <label>
    When I set label to "<label>"
      And I set labelHelp to "<label>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Change Decimal component label inline
    When I check labelInline checkbox
    Then Decimal labelInline is enabled

  @positive
  @deprecated
  Scenario: Disable Decimal component label inline
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Decimal labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Change Decimal component label width to <width>
    When I check labelInline checkbox
      And I set label width slider to <width>
    Then Decimal labelWidth is set to "<width>"
    Examples:
      | width |
      | 10    |
      | 100   |
      | 150   |

  @positive
  @deprecated
  Scenario Outline: Change Decimal component input width to <width>
    When I check labelInline checkbox
      And I set inputWidth slider to <width>
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 10    |
      | 100   |
      | 150   |

  @positive
  @deprecated
  Scenario Outline: Change Decimal component label align to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  @deprecated
  Scenario Outline: Check Decimal component input field will not accept characters except numbers to <label>
    When I set Input to "<label>" for deprecated component
    Then Decimal label is not set to "<label>" for deprecated component
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |