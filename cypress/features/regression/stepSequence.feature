Feature: Step Sequence component
  I want to test Step Sequence component properties

  @positive
  Scenario Outline: I set orientation to <orientation>
    When I open default "Step Sequence" component in noIFrame with "stepSequence" json from "commonComponents" using "<nameOfObject>" object name
    Then orientation is set to "<orientation>"
    Examples:
      | orientation | nameOfObject          |
      | vertical    | orientationVertical   |
      | horizontal  | orientationHorizontal |