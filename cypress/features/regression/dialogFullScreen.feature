Feature: Dialog Full Screen component
  I want to test Dialog Full Screen component properties

  @positive
  Scenario: Clicking close icon closes Dialog Full Screen
    Given I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "showCloseIcon" object name
    When I click closeIcon
    Then Confirm dialog is not visible

  @positive
  Scenario Outline: Change Dialog Full Screen component title to <title>
    When I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog Full Screen subtitle to <subtitle>
    When I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog Full Screen children to <children>
    When I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog Full Screen children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Enable background UI
    When I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @positive
  Scenario: Disable escape key
    Given I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "disableEscKey" object name
    When I hit ESC key in noIframe
    Then Dialog Full Screen is visible

  @negative
  Scenario: Enable escape key
    Given I open default "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "enabledEscKey" object name
    When I hit ESC key in noIframe
    Then Dialog Full Screen is not visible

  @positive
  Scenario: Cancel event
    Given I open "Dialog Full Screen Test" component page "default"
      And clear all actions in Actions Tab
    When I click closeIcon in IFrame
    Then cancel action was called in Actions Tab

  @positive
  Scenario: Verify that nested dialog is closed by pressing Esc key
    Given I open nested "Dialog Full Screen Test" component in noIFrame with "dialogFullScreen" json from "commonComponents" using "default" object name
      And I "Open Main Dialog" button on preview
      And I wait 500
      And I "Open Nested Dialog" button on preview
      And Dialog is visible
    When I hit ESC key in noIframe
    Then Dialog Full Screen is visible
      And Dialog is not visible
      And I hit ESC key in noIframe
      And Dialog Full Screen is not visible