Feature: Deprecated Number Input component
  I want to change deprecated Number Input component properties

  Background: Open deprecated Number Input component page
    Given I open deprecated "Number Input" component page

  @positive
  @deprecated
  Scenario Outline: Set input width to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 100        |

  @negative
  @deprecated
  Scenario Outline: Set input width out of scope to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is not set
    Examples:
      | inputWidth              |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @ignore
  # currently out of scope
  Scenario: Time to disappear
    When I set timeToDisappear to "<timeToDisappear>"
    Then component disappears after "<timeToDisappear>"

  @positive
  @deprecated
  Scenario Outline: Change field help text to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

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
  Scenario: Enable label inline
    When I check labelInline checkbox
    Then NumberInput labelInline is enabled

  @positive
  @deprecated
  Scenario: Disable label inline
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then NumberInput labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Set label width to <labelWidth>
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then NumberInput labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 100        |

  @positive
  @deprecated
  Scenario Outline: Set label align to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | right      |
      | left       |

  @positive
  @deprecated
  Scenario Outline: Change label help text to <labelHelp>
    When I set LabelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |