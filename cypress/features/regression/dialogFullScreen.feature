Feature: Dialog Full Screen component
  I want to change Dialog Full Screen component properties

  Background: Open Dialog Full Screen component page
    Given I open "Dialog Full Screen" component page

  @positive
  Scenario: CloseIcon has the border outline
    When I open component preview
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px" in IFrame

  @positive
  Scenario: Clicking close icon closes Dialog Full Screen
    Given I check showCloseIcon checkbox
      And I open component preview
    When I click close icon
    Then Confirm dialog is not visible

  @positive
  Scenario Outline: Change Dialog Full Screen component title to <title>
    When I set title to <title> word
      And I open component preview
    Then component title on preview is <title>
    Examples:
      | title                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Change Dialog Full Screen subtitle to <subtitle>
    When I set subtitle to <subtitle> word
      And I open component preview
    Then component subtitle on preview is <subtitle> in IFrame
    Examples:
      | subtitle                     |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Change Dialog Full Screen children to <children>
    When I set children to <children> word
      And I open component preview
    Then Dialog Full Screen children on preview is <children>
    Examples:
      | children                     |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

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
    When I click closeIcon in IFrame
    Then cancel action was called in Actions Tab