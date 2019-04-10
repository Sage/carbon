Feature: Carousel component
  I want to change Carousel properties

  Background: Open Carousel component page
    Given I open "Carousel" component page

  @positive
  Scenario: Initial slide title is Slide One
  # When step is run on background as Given
    Then slide title is "Slide One"

  @positive
  Scenario Outline: Set slide index from 1 to 4
    When I set slide index to <index>
    And slide title is "<title>"
    Examples:
      | index | title       |
      | 0     | Slide One   |
      | 1     | Slide Two   |
      | 2     | Slide Three |
      | 3     | Slide Four  |
      | 4     | Slide Five  |

  @positive
  Scenario: Enable slide selector
    When I enable slide selector
    Then slide selector is visible

  @positive
  Scenario: Disable slide selector
    When I disable slide selector
    Then slide selector is not visible

  @positive
  Scenario: Enable previous button
    When I enable previous button
    Then previous button is visible

  @positive
  Scenario: Disable previous button
    When I disable previous button
    Then previous button is not visible

  @positive
  Scenario: Enable next button
    When I enable next button
    Then next button is visible

  @positive
  Scenario: Disable next button
    When I disable next button
    Then next button is not visible

  @positive
  Scenario Outline: Set transition to <transition> when I move <direction>
    When I set transition to "<transition>"
      And I click carousel "<direction>" button
   Then transition is set to "<transition>" with "<direction>"
    Examples:
      | transition | direction |
      | slide      | left      |
      | fade       | left      |
      | slide      | right     |
      | fade       | right     |

  @positive
  Scenario Outline: Move Carousel left
    When I set slide index to <index>
      And I move carousel "left"
    Then slide title is "<title>"
    Examples:
      | index | title       |
      | 1     | Slide One   |
      | 2     | Slide Two   |
      | 3     | Slide Three |
      | 4     | Slide Four  |
      | 0     | Slide Five  |

  @positive
  Scenario Outline: Move Carousel right
    When I set slide index to <index>
      And I move carousel "right"
    Then slide title is "<title>"
    Examples:
      | index | title       |
      | 4     | Slide One   |
      | 0     | Slide Two   |
      | 1     | Slide Three |
      | 2     | Slide Four  |
      | 3     | Slide Five  |

  @positive
  Scenario Outline: Use slide selector to choose slide
    When I set slide selector <index>
    Then slide title is "<title>"
    Examples:
      | index | title       |
      | 0     | Slide One   |
      | 1     | Slide Two   |
      | 2     | Slide Three |
      | 3     | Slide Four  |
      | 4     | Slide Five  |