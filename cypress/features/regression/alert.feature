Feature: Alert component
  I want to change Alert component properties

  Background: Open Alert component page
    Given I open "Alert" component page with button

  @positive
  Scenario: CloseIcon has the border outline
    Given I open component preview
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario Outline: Change Alert component title to <title>
    When I set title to "<title>"
      And I open component preview
    Then component title on preview is "<title>"
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Change Alert subtitle to <subtitle>
    When I set subtitle to "<subtitle>"
      And I open component preview
    Then component subtitle on preview is "<subtitle>"
    Examples:
      | subtitle                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Change Alert children to <children>
    When I set children to "<children>"
      And I open component preview
    Then Alert children on preview is "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario: Enable background UI
    When I check enableBackgroundUI checkbox
      And I open component preview
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I check enableBackgroundUI checkbox
      And I uncheck enableBackgroundUI checkbox
      And I open component preview
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    When I check disableEscKey checkbox
      And I open component preview
      And I hit ESC key
    Then Alert is visible

  @negative
  Scenario: Enable escape key
    When I check disableEscKey checkbox
      And I uncheck disableEscKey checkbox
      And I open component preview
      And I hit ESC key
    Then Alert is not visible

  @positive
  Scenario Outline: Set height for Alert dialog to <height>
    When I set height to "<height>"
      And I open component preview
    Then Alert height is set to "<height>"
    Examples:
      | height |
      | 0      |
      | 1      |
      | 100    |

  @negative
  Scenario Outline: Set out of scope characters to height for Alert dialog
    When I set height to "<height>"
      And I open component preview
    Then Alert height is set to "<height>"
    Examples:
      | height                   |
      | -1                       |
      | -10                      |
      | 1!@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Clicking close icon, closes Alert dialog
    When I open component preview
    Then closeIcon is visible
      And I click closeIcon
      And Alert is not visible

  @positive
  Scenario Outline: Set Alert size to <sizeName>
    When I select size to "<sizeName>"
      And I open component preview
    Then Alert size property on preview is "<sizePropertyInPx>"
    Examples:
      | sizeName     | sizePropertyInPx |
      | extra-small  | 300              |
      | small        | 380              |
      | medium-small | 540              |
      | medium       | 750              |
      | medium-large | 850              |
      | large        | 960              |
      | extra-large  | 1080             |

  @positive
  Scenario: Check open click event
    When clear all actions in Actions Tab
      And I open component preview
    Then open action was called in Actions Tab

  @positive
  Scenario: Check cancel click event
    Given clear all actions in Actions Tab
      And I open component preview
    When I click closeIcon
    Then cancel action was called in Actions Tab
