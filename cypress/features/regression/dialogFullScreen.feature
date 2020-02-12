Feature: Dialog Full Screen component
  I want to change Dialog Full Screen component properties

  Background: Open Dialog Full Screen component page
    Given I open "Dialog Full Screen" component page

  @positive
  Scenario: Clicking close icon closes Dialog Full Screen
    When I check showCloseIcon checkbox
      And I open component preview
      And I click close icon
    Then Confirm dialog is not visible

  @positive
  Scenario Outline: Change Dialog Full Screen component title to <title>
    When I set title to "<title>"
      And I open component preview
    Then component title on preview is "<title>"
    Examples:
      | title                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dialog Full Screen subtitle to <subtitle>
    When I set subtitle to "<subtitle>"
      And I open component preview
    Then component subtitle on preview is "<subtitle>"
    Examples:
      | subtitle                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dialog Full Screen children to <children>
    When I set children to "<children>"
      And I open component preview
    Then Dialog Full Screen children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

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
    Then Dialog Full Screen is visible

  @negative
  Scenario: Enable escape key
    When I check disableEscKey checkbox
      And I uncheck disableEscKey checkbox
      And I open component preview
      And I hit ESC key
    Then Dialog Full Screen is not visible

  @positive
  Scenario: Open event
    When clear all actions in Actions Tab
      And I open component preview
    Then open action was called in Actions Tab

  @positive
  Scenario: Cancel event
    Given clear all actions in Actions Tab
      And I open component preview
    When I click closeIcon
    Then cancel action was called in Actions Tab
