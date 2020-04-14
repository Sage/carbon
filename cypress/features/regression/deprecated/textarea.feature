Feature: Deprecated Textarea component
  I want to change deprecated Textarea component properties

  Background: Open deprecated Textarea component page classic
    Given I open deprecated "Textarea" component page

  @positive
  @deprecated
  Scenario: Enable expandable checkbox for a Textarea component
    When I check expandable checkbox
    Then Textarea component is expandable for deprecated component

  @positive
  @deprecated
  Scenario: Enable and disable expandable checkbox for a Textarea component
    When I check expandable checkbox
      And I uncheck expandable checkbox
    Then Textarea component is not expandable for deprecated component

  @positive
  @deprecated
  Scenario Outline: Set cols to <cols>
    When I set cols slider to <cols>
    Then cols is set to "<cols>" for deprecated component
    Examples:
      | cols |
      | 1    |
      | 299  |
      | 300  |

  @positive
  @deprecated
  Scenario Outline: Set rows to <rows>
    When I set rows slider to <rows>
    Then rows is set to "<rows>" for deprecated component
    Examples:
      | rows |
      | 1    |
      | 299  |
      | 300  |

  @positive
  @deprecated
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Set characterLimit to <characterLimit>
    When I set characterLimit slider to <characterLimit> for deprecated component
    Then characterLimit is set to "<characterLimit>" for deprecated component
      And characterLimit is shown as "<characterLimit>"
    Examples:
      | characterLimit |
      | 1              |
      | 299            |
      | 300            |

  @positive
  @deprecated
  Scenario Outline: Set inputWidth to <inputWidth>
    When I set inputWidth slider to <inputWidth>
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 1          |
      | 299        |
      | 300        |

  @positive
  @deprecated
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label is set to "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

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
  Scenario: Enable labelInline checkbox for a Textarea component
    When I check labelInline checkbox
    Then Textarea labelInline is enabled

  @positive
  @deprecated
  Scenario: Enable and disable labelInline checkbox for a Textarea component
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Textarea labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Set labelWidth to <labelWidth>
    When I check labelInline checkbox
      And I set label width slider to <labelWidth>
    Then Textarea labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 1          |
      | 299        |
      | 300        |

  @positive
  @deprecated
  Scenario Outline: Set labelAlign to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  @deprecated
  Scenario Outline: Verify input of Textarea component
    When I input "<input>" into Textarea for deprecated component
    Then Textarea input on preview is set to "<input>" for deprecated component
    Examples:
      | input                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |