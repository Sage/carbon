Feature: Dialog component
  I want to test Dialog component properties

  @positive
  Scenario Outline: Set height for Dialog to <height> but not bigger than viewportHeight
    When I open default "Dialog Test" component with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog height is set to "<height>"
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 1      | height1      |
      | 100    | height100    |
      | 1000   | height1000   |

  @positive
  Scenario Outline: Change Dialog component title to <title>
    When I open default "Dialog Test" component with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog subtitle to <subtitle>
    When I open default "Dialog Test" component with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Set Dialog size to <sizeName>
    When I open default "Dialog Test" component with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog size property on preview is "<sizePropertyInPx>"
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
  Scenario: Disable ShowCloseIcon
    When I open default "Dialog Test" component with "dialog" json from "commonComponents" using "showCloseIconFalse" object name
    Then closeIcon is not visible

  @positive
  Scenario: Disable escape key
    Given I open default "Dialog Test" component with "dialog" json from "commonComponents" using "disableEscKey" object name
      And I wait 500
    When I hit ESC key
    Then Dialog is visible

  @positive
  Scenario: Enable escape key
    Given I open default "Dialog Test" component with "dialog" json from "commonComponents" using "enabledEscKey" object name
    When I hit ESC key
    Then Dialog is not visible

  @positive
  Scenario: ShowCloseIcon can close Dialog
    Given I open default "Dialog Test" component with "dialog" json from "commonComponents" using "showCloseIcon" object name
      And closeIcon is visible
    When I click closeIcon
      And Dialog is not visible

  @positive
  Scenario Outline: Click on background outside Dialog and Dialog remains open
    Given I open default "Dialog Test" component with "dialog" json from "commonComponents" using "default" object name
    When I click on background "<position>" outside dialog
    Then Dialog is visible
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  @positive
  Scenario: Cancel event
    Given I open "Dialog Test" component page "default"
    When I click closeIcon
    Then cancel action was called in Actions Tab