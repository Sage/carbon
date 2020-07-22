Feature: Alert component
  I want to change Alert component properties

  @positive
  Scenario: CloseIcon has the border outline
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "open" object name
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px" in NoIFrame

  @positive
  Scenario Outline: Change Alert component title to <title>
    Given I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title> in NoIFrame
    Examples:
      | title                 | nameOfObject              |
      | mp150ú¿¡üßä           | openTitleOtherLanguage    |
      | !@$^*()_+-=~[];:.,?{} | openTitleSpecialCharacter |

  @positive
  Scenario Outline: Change Alert component subtitle to <subtitle>
    Given I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle> in NoIFrame
    Examples:
      | subtitle              | nameOfObject                 |
      | mp150ú¿¡üßä           | openSubtitleOtherLanguage    |
      | !@$^*()_+-=~[];:.,?{} | openSubtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Alert component children to <children>
    Given I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert children on preview is "<children>"
    Examples:
      | children              | nameOfObject                 |
      | mp150ú¿¡üßä           | openChildrenOtherLanguage    |
      | !@$^*()_+-=~[];:.,?{} | openChildrenSpecialCharacter |

  @positive
  Scenario: Enable background UI
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "openEnableBackgroundUI" object name
    Then Background UI is enabled in NoIFrame

  @negative
  Scenario: Disable background UI
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "openEnableBackgroundUIFalse" object name
    Then Background UI is disabled in NoIFrame

  @positive
  Scenario: Disable escape key
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "openDisableEscKey" object name
      And I press ESC onto focused element
    Then Alert is visible

  @positive
  Scenario Outline: Set height for Alert dialog to <height>
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert height is set to "<height>"
    Examples:
      | height | nameOfObject  |
      | 0      | openHeight0   |
      | 1      | openHeight1   |
      | 100    | openHeight100 |

  @negative
  Scenario Outline: Set out of scope characters to height for Alert dialog
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert height is set to "<height>"
    Examples:
      | height | nameOfObject  |
      | -1     | openHeight-1  |
      | -10    | openHeight-10 |

  @positive
  Scenario Outline: Set Alert size to <sizeName>
    When I open default "Alert" component in noIFrame with "alert" json from "commonComponents" using "<nameOfObject>" object name
    Then Alert size property on preview is "<sizePropertyInPx>"
    Examples:
      | sizeName     | sizePropertyInPx | nameOfObject        |
      | extra-small  | 300              | openSizeExtraSmall  |
      | small        | 380              | openSizeSmall       |
      | medium-small | 540              | openSizeMediumSmall |
      | medium       | 750              | openSizeMedium      |
      | medium-large | 850              | openSizeMediumLarge |
      | large        | 960              | openSizeLarge       |
      | extra-large  | 1080             | openSizeExtraLarge  |