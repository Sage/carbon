Feature: Dialog component classic story
  I want to change Dialog component properties for classic story

  Background: Open Dialog component page classic story
    Given I open "Dialog" component page classic
      And I open component preview

  @positive
  Scenario: CloseIcon has the border outline
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(77, 144, 254)"

  @positive
  Scenario: Verify classic story color
    Then footer buttons have color "rgb(37, 91, 199)" and has 1 px border
