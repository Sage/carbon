Feature: Experimental Textarea component
  I want to check Experimental Textarea component properties

  @positive
  Scenario Outline: Enable expandable checkbox for a Textarea component
    Given I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "expandable" object name
    When I input <text> into Textarea
    Then Textarea component is expandable
    Examples:
      | text                         |
      | {enter}{enter}{enter}{enter} |

  @positive
  Scenario Outline: Enable and disable expandable checkbox for a Textarea component
    Given I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "expandableFalse" object name
    When I input <text> into Textarea
    Then Textarea component is not expandable
    Examples:
      | text                         |
      | {enter}{enter}{enter}{enter} |

  @positive
  Scenario Outline: Set cols to <cols>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then cols is set to "<cols>"
    Examples:
      | cols | nameOfObject |
      | 1    | cols1        |
      | 100  | cols100      |
      | 300  | cols300      |

  @positive
  Scenario Outline: Set rows to <rows>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then rows is set to "<rows>"
    Examples:
      | rows | nameOfObject |
      | 1    | rows1        |
      | 100  | rows100      |
      | 300  | rows300      |

  @positive
  Scenario: Check disabled checkbox for a Textarea component
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "disabled" object name
    Then Textarea component is disabled

  @positive
  Scenario: Uncheck disabled checkbox for a Textarea component
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "disabledFalse" object name
    Then Textarea component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textarea component
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "readOnly" object name
    Then Textarea component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textarea component
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "readOnlyFalse" object name
    Then Textarea component is not readOnly

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then placeholder is set to <placeholder>
    Examples:
      | placeholder             | nameOfObject                |
      | mp150ú¿¡üßä             | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | placeholderSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | fieldHelpSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Set characterLimit to <characterLimit>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then characterLimit is set to "<characterLimit>"
      And characterLimit for default Textarea is shown as "<result>"
    Examples:
      | characterLimit | result  | nameOfObject         |
      | -1000          | -1,000  | characterLimit-1000  |
      | -1             | -1      | characterLimit-1     |
      | 0              | 0       | characterLimit0      |
      | 1              | 1       | characterLimit1      |
      | 100            | 100     | characterLimit100    |
      | 1000           | 1,000   | characterLimit1000   |
      | 555555         | 555,555 | characterLimit555555 |

  @negative
  Scenario Outline: Set characterLimit out of scope to <characterLimit>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then characterLimit for default Textarea is not set to <characterLimit>
    Examples:
      | characterLimit          | nameOfObject                   |
      | mp150ú¿¡üßä             | characterLimitOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | characterLimitSpecialCharacter |
      | -0,112                  | characterLimit-0,112           |
      | 0.1112333               | characterLimit0.1112333        |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then Textarea inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth | nameOfObject  |
      | 0          | inputWidth0   |
      | 50         | inputWidth50  |
      | 100        | inputWidth100 |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                   | nameOfObject          |
      | mp150ú¿¡üßä             | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
      And I hover mouse onto "question" icon in no iFrame
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelHelpSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Enable labelInline checkbox for a Textarea component
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "labelInline" object name
    Then Textarea component is labelInline

  @positive
  Scenario: Enable and disable labelInline checkbox for a Textarea component
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "labelInlineFalse" object name
    Then Textarea component is not labelInline

  @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then label width on preview is <labelWidth>
    Examples:
      | labelWidth | nameOfObject  |
      | 0          | labelWidth0   |
      | 25         | labelWidth25  |
      | 100        | labelWidth100 |

  @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario Outline: Enable warnOverLimit checkbox for a Textarea component and check the warning
    Given I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    When I input <text> into Textarea
    Then Textarea component has warnOverLimit and used characters <characters> of <limit>
    Examples:
      | limit | text             | characters | nameOfObject                                            |
      | 0     | 12345            | 5          | characterLimit0warnOverLimitenforceCharacterLimitFalse  |
      | 5     | áéíóú¿¡üñ        | 9          | characterLimit5warnOverLimitenforceCharacterLimitFalse  |
      | 10    | testTestTextTest | 16         | characterLimit10warnOverLimitenforceCharacterLimitFalse |

  @positive
  Scenario Outline: Disable warnOverLimit checkbox for a Textarea component and allow to input more characters than allowed
    Given I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    When I input <text> into Textarea
    Then Textarea component has no warnOverLimit and used characters <characters> of <limit>
    Examples:
      | limit | text        | characters | nameOfObject                      |
      | 0     | !!          | 2          | characterLimit0warnOverLimitFalse |
      | 3     | 123456      | 6          | characterLimit3warnOverLimitFalse |
      | 5     | áéíóú¿¡üñą | 10         | characterLimit5warnOverLimitFalse |

  @positive
  Scenario Outline: Enable enforceCharacterLimit checkbox for a Textarea component and check the warning
    Given I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    When I input <text> into Textarea
    Then Textarea component has enforceCharacterLimit enabled and used characters <characters> are equal to limit <limit>
    Examples:
      | limit | text      | characters | nameOfObject                          |
      | -1    | ?         | 1          | characterLimit-1enforceCharacterLimit |
      | 2     | !!!       | 2          | characterLimit2enforceCharacterLimit  |
      | 5     | testText  | 5          | characterLimit5enforceCharacterLimit  |
      | 7     | áéíóú¿¡üñ | 7          | characterLimit7enforceCharacterLimit  |

  @positive
  Scenario Outline: Disable enforceCharacterLimit checkbox for a Textarea component and allow to input more characters than allowed
    Given I open default "Experimental-Textarea" component in noIFrame with "textarea" json from "experimental" using "<nameOfObject>" object name
    When I input <text> into Textarea
    Then Textarea component has enforceCharacterLimit disabled and used characters <characters> are more than limit <limit>
    Examples:
      | limit | text      | characters | nameOfObject                               |
      | -1    | testText  | 8          | characterLimit-1enforceCharacterLimitFalse |
      | 0     | !         | 1          | characterLimit0enforceCharacterLimitFalse  |
      | 3     | 12345     | 5          | characterLimit3enforceCharacterLimitFalse  |
      | 5     | áéíóú¿¡üñ | 9          | characterLimit5enforceCharacterLimitFalse  |

  @positive
  Scenario Outline: Verify input of Textarea component
    Given I open "Experimental Textarea" component page in noIFrame
    When I input <input> into Textarea
    Then Textarea input on preview is set to <input>
    Examples:
      | input                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
# @ignore because of FE-2782
# | &"'<>|