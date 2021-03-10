Feature: Select component
  I want to check SimpleSelect component list position in no iFrame
  
  @positive
    Scenario Outline: Show Select list is at the <position> in <size> viewport
      Given I open Test default "Select" component in noIFrame with "simpleSelect" json from "test" using "<size>" object name
        And I have a <size> viewport
      When I click on Select input in noIframe
      Then "simple" Select list is visible at the <position>
      Examples:
      | position | size  |
      | bottom   | large |
      | top      | small | 
