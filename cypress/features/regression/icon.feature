Feature: Icon component
  I want to test Icon component focusable state with tooltip 

  @positive
  Scenario: Icon component should have focus when it has a tooltip
    Given I open default "Icon Test" component with "icon" json from "commonComponents" using "withTooltip" object name
    When I hit Tab key 1 time
    Then Icon component is focused
      And tooltipPreview on preview is set to withTooltip