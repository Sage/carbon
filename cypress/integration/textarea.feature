Feature: Textarea component
  I want to change Textarea component properties

# Added Experimental untill the component will be merged with master
  Background: Open Textarea component page
    Given I open "Experimental Textarea" component page

  @positive
  Scenario: Enable expandable checkbox for a Textarea component
    When I check expandable checkbox
    Then Textarea component is expandable

  @positive
  Scenario: Enable and disable expandable checkbox for a Textarea component
    When I check expandable checkbox
      And I uncheck expandable checkbox
    Then Textarea component is not expandable

  @positive
  Scenario Outline: Set cols to <cols>
    When I set cols slider to <cols>
    Then cols is set to "<cols>"
    Examples:
      | cols  |
      | 1     |
      | 115   |
      | 299   |
      | 300   |

  @positive
  Scenario Outline: Set rows to <rows>
    When I set rows slider to <rows>
    Then rows is set to "<rows>"
    Examples:
      | rows  |
      | 1     |
      | 115   |
      | 299   |
      | 300   |

  @positive
  Scenario: Check disabled checkbox for a Textarea component
    When I check disabled checkbox
    Then Textarea component is disabled

  @positive
  Scenario: Uncehck disabled checkbox for a Textarea component
    When I check disabled checkbox
      And I uncheck disabled checkbox
    Then Textarea component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textarea component
    When I check readOnly checkbox
    Then Textarea component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textarea component
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Textarea component is not readOnly

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to "<placeholder>"
    Then placeholder is set to "<placeholder>"
      Examples:
      | placeholder             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <> |

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp is set to "<fieldHelp>"
      Examples:
      | fieldHelp             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  #     # @ignore because of FE-1447
  #     # | <> |

  @positive
  Scenario Outline: Set characterLimit to <characterLimit>
    When I set characterLimit to "<characterLimit>"
    Then characterLimit is set to "<characterLimit>"
      And characterLimit is shown as "<result>"
    Examples:
      | characterLimit  | result  |
      | -1000           | -1,000  |
      | -1              | -1      |
      | 0               | 0       |
      | 1               | 1       |
      | 100             | 100     |
      | 1000            | 1,000   |
      | 555555          | 555,555 |

  @negative
  Scenario Outline: Set characterLimit out of scope to <characterLimit>
    When I set characterLimit to "<characterLimit>"
    Then characterLimit is not set to "<characterLimit>"
      Examples:
      | characterLimit          |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore - the characterLimit field accepts all as a string
      # @FE-1561 - added a comment to fix this issue
      # | -1                      |
      # | -0,112                  |
      # | 0.1112333               |

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I set inputWidth slider to <inputWidth>
    Then Textarea inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 35         |
      | 50         |
      | 100        |

  @positive
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label is set to "<label>"
    Examples:
      | label     |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <> |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I set label to "label"
      And I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp     |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <> |

  @positive
  Scenario: Enable labelInline checkbox for a Textarea component
    When I set label to "label"
      And I check labelInline checkbox
    Then Textarea component is labelInline

  @positive
  Scenario: Enable and disable labelInline checkbox for a Textarea component
    When I set label to "label"
      And I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Textarea component is not labelInline

 @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I set label to "label"
      And I check labelInline checkbox
      And I set label width slider to <labelWidth>
    Then label width is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 25         |
      | 75         |
      | 100        |

 @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I set label to "label"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  Scenario Outline: Enable warnOverLimit checkbox for a Textarea component and check the warning
    When I set characterLimit to "<limit>"
      And I check warnOverLimit checkbox
      And I uncheck enforceCharacterLimit checkbox
      And I input "<text>" into Textarea
    Then Textarea component has warnOverLimit and used characters <characters> of <limit>
    Examples:
      | text             | characters | limit |
      | 12345            | 5          | 0     |
      | áéíóú¿¡üñ        | 9          | 5     |
      | testTestTextTest | 16         | 10    |

  @positive
  Scenario Outline: Disable warnOverLimit checkbox for a Textarea component and allow to input more characters than allowed
    When I set characterLimit to "<limit>"
      And I check warnOverLimit checkbox
      And I uncheck enforceCharacterLimit checkbox
      And I uncheck warnOverLimit checkbox
      And I input "<text>" into Textarea
    Then Textarea component has no warnOverLimit and used characters <characters> of <limit>
      Examples:
        | text             | characters | limit |
        | !                | 1          | -1    |
        | 12345            | 5          | 0     |
        | áéíóú¿¡üñ        | 9          | 5     |
        | testTestTextTest | 16         | 10    |

  @positive
  Scenario Outline: Enable enforceCharacterLimit checkbox for a Textarea component and check the warning
    When I set characterLimit to "<limit>"
      And I input "<text>" into Textarea
    Then Textarea component has enforceCharacterLimit enabled and used characters <characters> are equal to limit <limit>
    Examples:
      | text             | characters | limit |
      | ?                | 1          | -1    |
      | !!!              | 2          | 2     |
      | testText         | 5          | 5     |
      | áéíóú¿¡üñ        | 7          | 7     |
      | testTestTextTest | 10         | 10    |

  @positive
  Scenario Outline: Disable enforceCharacterLimit checkbox for a Textarea component and allow to input more characters than allowed
    When I set characterLimit to "<limit>"
      And I uncheck enforceCharacterLimit checkbox
      And I input "<text>" into Textarea
    Then Textarea component has enforceCharacterLimit disabled and used characters <characters> are more than limit <limit>
    Examples:
      | text             | characters | limit |
      | testText         | 8          | -1    |
      | !                | 1          | 0     |
      | 12345            | 5          | 3     |
      | áéíóú¿¡üñ        | 9          | 5     |
      | testTestTextTest | 16         | 10    |

  @positive
  Scenario Outline: Verify input of Textarea component
    When I input "<input>" into Textarea
    Then Textarea input on preview is set to "<input>"
    Examples:
      | input                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                     |