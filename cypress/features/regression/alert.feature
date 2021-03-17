Feature: Alert component
  I want to change Alert component properties

  @positive
  Scenario Outline: Change Alert component title to <title>
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Alert component subtitle to <subtitle>
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Alert component children to <children>
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Enable background UI
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @positive
  Scenario: Disable escape key
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "disableEscKey" object name
      And I press ESC onto focused element
    Then Alert is visible in NoIFrame

  @positive
  Scenario Outline: Set height for Alert dialog to <height>
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert height is set to "<height>"
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 1      | height1      |
      | 100    | height100    |

  @negative
  Scenario Outline: Set out of scope characters to height for Alert dialog
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert height is set to "<height>"
    Examples:
      | height | nameOfObject |
      | -1     | height-1     |
      | -10    | height-10    |

  @positive
  Scenario Outline: Set Alert size to <sizeName>
    When I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
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

  @positive
  Scenario: Alert is not visible
    Given I open default "Alert Test" component in noIFrame with "alert" json from "commonComponents" using "default" object name
    When I click closeIcon in IFrame
    Then Alert is not visible