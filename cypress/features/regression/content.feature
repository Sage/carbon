Feature: Content component
  I want to check Content component properties

  @positive
  Scenario Outline: Change children in Content dialog to <children>
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "<nameOfObject>" object name
    Then content children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change title in Content dialog to <title>
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "<nameOfObject>" object name
    Then content title context children on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change property in Content dialog to <property>
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "<nameOfObject>" object name
    Then content as property is set to "<property>"
    Examples:
      | property  | nameOfObject      |
      | primary   | propertyPrimary   |
      | secondary | propertySecondary |

  @positive
  Scenario Outline: Change alignProperty in Content dialog to <alignProperty>
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "<nameOfObject>" object name
    Then content align property is set to "<alignProperty>"
    Examples:
      | alignProperty | nameOfObject |
      | right         | alignRight   |
      | center        | alignCenter  |
      | left          | alignLeft    |

  @positive
  Scenario: BodyFullWidth enabled
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "bodyFullWidth" object name
    Then content preview has bodyFullWidth parameter enabled

  @positive
  Scenario: BodyFullWidth disabled
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "bodyFullWidthFalse" object name
    Then content preview has no bodyFullWidth parameter

  @positive
  Scenario Outline: Inline enabled and change title width to <width>
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "<nameOfObject>" object name
    Then content preview has inline parameter enabled
      And content preview width is "<width>"
    Examples:
      | width | nameOfObject  |
      | 0     | titleWidth0   |
      | 100   | titleWidth100 |
      | 15    | titleWidth15  |

  @positive
  Scenario: Inline disabled
    When I open default "Content" component in noIFrame with "content" json from "commonComponents" using "inlineFalse" object name
    Then content preview has no inline parameter