Feature: Alert component
  I want to change Alert component properties

  @positive
  Scenario: CloseIcon has the border outline
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "default" object name
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario Outline: Change Alert component title to <title>
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Alert component subtitle to <subtitle>
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Alert component children to <children>
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Enable background UI
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "enableBackgroundUIFalse" object name
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "disableEscKey" object name
      And I press ESC onto focused element
    Then Alert is visible in NoIFrame

  @positive
  Scenario Outline: Set height for Alert dialog to <height>
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert height is set to "<height>"
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 1      | height1      |
      | 100    | height100    |

  @negative
  Scenario Outline: Set out of scope characters to height for Alert dialog
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert height is set to "<height>"
    Examples:
      | height | nameOfObject |
      | -1     | height-1     |
      | -10    | height-10    |

  @positive
  Scenario Outline: Set Alert size to <sizeName>
    When I open test_default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert size property on preview is "<sizePropertyInPx>"
    Examples:
      | sizeName     | sizePropertyInPx | nameOfObject    |
      | extra-small  | 300              | sizeExtraSmall  |
      | small        | 380              | sizeSmall       |
      | medium-small | 540              | sizeMediumSmall |
      | medium       | 750              | sizeMedium      |
      | medium-large | 850              | sizeMediumLarge |
      | large        | 960              | sizeLarge       |
      | extra-large  | 1080             | sizeExtraLarge  |