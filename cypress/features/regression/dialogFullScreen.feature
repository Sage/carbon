Feature: Dialog Full Screen component
  I want to test Dialog Full Screen component properties

  @positive
  Scenario: CloseIcon has the border outline
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "default" object name
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario: Clicking close icon closes Dialog Full Screen
    Given I open "Dialog Full Screen Test" component page "default"
      And I check showCloseIcon checkbox
    When I click closeIcon in IFrame
    Then Confirm dialog is not visible

  @positive
  Scenario Outline: Change Dialog Full Screen component title to <title>
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog Full Screen subtitle to <subtitle>
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog Full Screen children to <children>
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog Full Screen children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Enable background UI
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "enableBackgroundUIFalse" object name
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    Given I open "Dialog Full Screen Test" component page "default"
      And I check disableEscKey checkbox
    When I hit ESC key
    Then Dialog Full Screen is visible

  @negative
  Scenario: Enable escape key
    Given I open "Dialog Full Screen Test" component page "default"
      And I check disableEscKey checkbox
      And I uncheck disableEscKey checkbox
      # add wait due to re-render with new prop
      And I wait 500
    When I hit ESC key
    Then Dialog Full Screen is not visible

  @positive
  Scenario: Verify that stickyFormFooter is visible
    When I open test_default "Dialog Full Screen" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "stickyFooter" object name
    Then Dialog Full Screen stickyFormFooter is visible

  @positive
  Scenario: Cancel event
    Given I open "Dialog Full Screen Test" component page "default"
      And clear all actions in Actions Tab
    When I click closeIcon in IFrame
    Then cancel action was called in Actions Tab

  @positive
  Scenario: Verify that nested dialog is closed by pressing Esc key
    Given I open "Dialog Full Screen Test" component page "nested"
      And I "Open Main Dialog" button on preview
      And I wait 500
      And I "Open Nested Dialog" button on preview
      And Dialog is visible in IFrame
    When I hit ESC key
    Then Dialog Full Screen is visible
      And Dialog is not visible in IFrame
      And I hit ESC key
      And Dialog Full Screen is not visible