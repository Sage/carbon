Feature: Dialog component actions in IFrame
  I want to test Dialog component - actions in IFrame

  Background: Open Dialog component page
    Given I open "Dialog Test" component page "default"

  @positive
  Scenario: Disable escape key
    Given I check disableEscKey checkbox
    When I hit ESC key
    Then Dialog is visible in IFrame

  @positive
  Scenario: Enable escape key
    Given I check disableEscKey checkbox
     And I uncheck disableEscKey checkbox
      # add wait due to re-render with new prop
     And I wait 500
    When I hit ESC key
    Then Dialog is not visible in IFrame

  @positive
  Scenario: ShowCloseIcon can close Dialog
    Given I uncheck showCloseIcon checkbox
    When I check showCloseIcon checkbox
      # add wait due to re-render with new prop
      And I wait 500
    Then closeIcon is visible in iframe
      And I click closeIcon in IFrame
      And Dialog is not visible in IFrame

  @positive
  Scenario Outline: Click outside Dialog without background and Dialog remains open
    Given I check enableBackgroundUI checkbox
      And I uncheck enableBackgroundUI checkbox
    When I click on "<position>" outside dialog
    Then Dialog is visible in IFrame
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  @positive
  Scenario Outline: Click on background outside Dialog and Dialog remains open
    When I click on background "<position>" outside dialog
    Then Dialog is visible in IFrame
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  @positive
  Scenario: Cancel event
    Given clear all actions in Actions Tab
    When I click closeIcon in IFrame
    Then cancel action was called in Actions Tab