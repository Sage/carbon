Feature: Deprecated Checkbox component
  I want to change deprecated Checkbox properties

  Background: Open deprecated Checkbox component page
    Given I open deprecated "Checkbox" component page

  @positive
  @deprecated
  Scenario: Enable reverse checkbox
    When I check reverse checkbox
    Then checkbox helpText property is set to "reverse"

  @positive
  @deprecated
  Scenario: Enable and disable reverse checkbox
    When I check reverse checkbox
      And I uncheck reverse checkbox
    Then checkbox helpText property is not set to "reverse"

  @positive
  @deprecated
  Scenario: Enable fieldHelpInline
    When I check fieldHelpInline checkbox
    Then checkbox helpText property is set to "inline"

  @positive
  @deprecated
  Scenario: Enable and disable fieldHelpInline
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then checkbox helpText property is not set to "inline"

  @positive
  @deprecated
  Scenario Outline: Change Checkbox component label to <label>
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
  @deprecated
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
  @deprecated
  Scenario Outline: Change Checkbox input width to <width>
    When I set inputWidth slider to <width>
    Then checkbox inputWidth is set to <width>
    Examples:
      | width |
      | 1     |
      | 10    |
      | 50    |

  @negative
  @deprecated
  Scenario Outline: Set Checkbox input width out of scope
    When I set inputWidth slider to <width>
    Then Checkbox inputWidth is not set
    Examples:
      | width |
      | -1    |
      | 0     |
      | 51    |
      | 1000  |

  @positive
  @deprecated
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
  @deprecated
  Scenario: Enable label inline checkbox
    When I check labelInline checkbox
    Then Checkbox label property is set to "inline"

  @positive
  @deprecated
  Scenario: Enable and disable label inline checkbox
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Checkbox label property is not set to "inline"

  @positive
  @deprecated
  Scenario Outline: Change Checkbox label width to <width>
    When I check labelInline checkbox
      And I set label width slider to <width>
    Then Checkbox deprecated label width is set to <width>
    Examples:
      | width |
      | 1     |
      | 10    |
      | 50    |

  @negative
  @deprecated
  Scenario Outline: Set Checkbox input width out of scope
    When I check labelInline checkbox
      And I set label width slider to <width>
    Then Checkbox label width is not set
    Examples:
      | width |
      | -1    |
      | 0     |
      | 51    |
      | 1000  |

  @positive
  @deprecated
  Scenario Outline: Change Checkbox label align to <direction>
    When I check labelInline checkbox
      And I select labelAlign to "<direction>"
    Then labelAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |