Feature: Dialog component
  I want to change Dialog component properties

  Background: Open Dialog component page
    Given I open "Dialog" component page
      And I open component preview

  @positive @applitools
  Scenario: CloseIcon has the border outline
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"
      And Element displays correctly in full screen

  @positive @applitools
  Scenario Outline: Set height for Dialog to <height>
    When I set height to "<height>"
    Then Dialog height is set to "<height>"
      And Element displays correctly in full screen
    Examples:
      | height |
      | 0      |
      | 1      |
      | 10     |
      | 100    |

  @negative @applitools
  Scenario Outline: Set out of scope characters to <height>
    When I set height to "<height>"
    Then Dialog height is not set to "<height>"
      And Element displays correctly in full screen
    Examples:
      | height                   |
      | -1                       |
      | -10                      |
      | 1!@#$%^*()_+-=~[];:.,?{} |

  @positive @applitools
  Scenario Outline: Change Dialog component title to <title>
    When I set title to "<title>"
    Then component title on preview is "<title>"
      And Element displays correctly in full screen
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive @applitools
  Scenario Outline: Change Dialog subtitle to <subtitle>
    When I set subtitle to "<subtitle>"
    Then component subtitle on preview is "<subtitle>"
      And Element displays correctly in full screen
    Examples:
      | subtitle                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive @applitools
  Scenario Outline: Set Dialog size to <sizeName>
    When I select size to "<sizeName>"
    Then Dialog size property on preview is "<sizePropertyInPx>"
      And Element displays correctly in full screen
    Examples:
      | sizeName     | sizePropertyInPx |
      | extra-small  | 300              |
      | small        | 380              |
      | medium-small | 540              |
      | medium       | 750              |
      | medium-large | 850              |
      | large        | 960              |
      | extra-large  | 1080             |

  @positive @applitools
  Scenario: ShowCloseIcon can close Dialog
    Given I uncheck showCloseIcon checkbox
    When I check showCloseIcon checkbox
    Then closeIcon is visible
      And I click closeIcon
      And Dialog is not visible

  @positive @applitools
  Scenario: Disable ShowCloseIcon
    When I uncheck showCloseIcon checkbox
    Then closeIcon is not visible
      And Element displays correctly in full screen

  @positive @applitools
  Scenario: Enable StickyFormFooter
    When I check stickyFormFooter checkbox
    Then stickyFormFooter is enabled
      And Element displays correctly in full screen

  # Flaky in applitools
  @positive @applitools
  Scenario: Disable StickyFormFooter
    Given I check stickyFormFooter checkbox
    When I uncheck stickyFormFooter checkbox
    Then stickyFormFooter is disabled
  # And Element displays correctly in full screen

  @positive @applitools
  Scenario: Enable background UI
    When I check enableBackgroundUI checkbox
    Then Background UI is enabled
      And Element displays correctly in full screen

  # Flaky in applitools
  @positive @applitools
  Scenario: Disable background UI
    Given I check enableBackgroundUI checkbox
    When I uncheck enableBackgroundUI checkbox
    Then Background UI is disabled
  # And Element displays correctly in full screen

  @positive
  Scenario: Disable escape key
    Given I check disableEscKey checkbox
    When I hit ESC key
    Then Dialog is visible
      And Element displays correctly in full screen

  @positive @applitools
  Scenario: Enable escape key
    Given I check disableEscKey checkbox
    When I uncheck disableEscKey checkbox
      And I hit ESC key
    Then Dialog is not visible

  @positive @applitools
  Scenario Outline: Click outside Dialog without background and Dialog remains open
    Given I check enableBackgroundUI checkbox
      And I uncheck enableBackgroundUI checkbox
    When I click on "<position>" outside dialog
    Then Dialog is visible
      And Element displays correctly in full screen
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  # Flaky in applitools
  @positive @applitools
  Scenario Outline: Click on background outside Dialog and Dialog remains open
    When I click on background "<position>" outside dialog
    Then Dialog is visible
      And Element displays correctly in full screen
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  @positive @applitools
  Scenario: Open dialog event
    Given I click closeIcon
      And clear all actions in Actions Tab
    When I open component preview
    Then open action was called in Actions Tab
      And Element displays correctly in full screen

  @positive @applitools
  Scenario: Cancel event
    Given clear all actions in Actions Tab
    When I click closeIcon
    Then cancel action was called in Actions Tab

  @positive @applitools
  Scenario: Verify default story color
    # commented because of BDD default scenario Given - When - Then
    #  When I open component preview
    Then footer buttons have color "rgb(0, 128, 93)" and has 2 px border
