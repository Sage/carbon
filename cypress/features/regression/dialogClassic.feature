Feature: Dialog component classic story
  I want to change Dialog component properties for classic story

  Background: Open Dialog component page classic story
    Given I open "Dialog" component page classic

  @positive
  Scenario: Verify classic story color
    When I open component preview
    Then footer buttons have color "rgb(37, 91, 199)" and has 1 px border