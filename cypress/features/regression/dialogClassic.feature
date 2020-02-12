Feature: Dialog component classic story
  I want to change Dialog component properties for classic story

  Background: Open Dialog component page classic story
    Given I open "Dialog" component page classic

  @positive
  Scenario: CloseIcon has the border outline
    When I open component preview
    Given I uncheck showCloseIcon checkbox
    When I check showCloseIcon checkbox
    Then closeIcon is visible
    Given closeIcon is focused
    Then closeIcon has border outline for classic story

  @positive
  Scenario: Verify classic story color
    When I open component preview
    Then footer buttons have color "rgb(37, 91, 199)" and has 1 px border
