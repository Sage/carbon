Feature: Carousel classic component
  I want to change Carousel properties for classic story

  Background: Open Carousel component page classic
    Given I open "Carousel" component page classic

  @positive @applitools
  Scenario: Initial slide title is Slide One
    # commented because of BDD default scenario Given - When - Then
    # When I open "Carousel" component page classic
    Then classic slide title is "Slide One"
      And Element displays correctly


  @positive @applitools
  Scenario Outline: Set slide index to <index>
    When I select slideIndex to "<index>"
    Then classic slide title is "<title>"
      And Element displays correctly
    Examples:
      | index | title       |
      | 0     | Slide One   |
      | 1     | Slide Two   |
      | 2     | Slide Three |
      | 3     | Slide Four  |
      | 4     | Slide Five  |

  @positive @applitools
  Scenario: Enable slide selector
    Given I uncheck enableSlideSelector checkbox
    When I check enableSlideSelector checkbox
    Then slide selector is visible
      And Element displays correctly

  @positive @applitools
  Scenario: Disable slide selector
    When I uncheck enableSlideSelector checkbox
    Then slide selector is not visible
      And Element displays correctly

  @positive @applitools
  Scenario: Enable previous button
    Given I uncheck enablePreviousButton checkbox
    When I check enablePreviousButton checkbox
    Then previous button is visible
      And Element displays correctly

  @positive @applitools
  Scenario: Disable previous button
    When I uncheck enablePreviousButton checkbox
    Then previous button is not visible
      And Element displays correctly

  @positive @applitools
  Scenario: Enable next button
    Given I uncheck enableNextButton checkbox
    When I check enableNextButton checkbox
    Then next button is visible
      And Element displays correctly

  @positive @applitools
  Scenario: Disable next button
    When I uncheck enableNextButton checkbox
    Then next button is not visible
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Set transition to <transition> when I move <direction>
    Given I set transition to "<transition>"
    When I click carousel "<direction>" button
    Then transition is set to "<transition>" with "<direction>"
      And Element displays correctly
    Examples:
      | transition | direction |
      | slide      | left      |
      | fade       | left      |
      | slide      | right     |
      | fade       | right     |

  @positive @applitools
  Scenario Outline: Move Carousel left to <index>
    Given I select slideIndex to "<index>"
    When I move carousel "left"
    Then classic slide title is "<title>"
      And Element displays correctly
    Examples:
      | index | title       |
      | 1     | Slide One   |
      | 2     | Slide Two   |
      | 3     | Slide Three |
      | 4     | Slide Four  |
      | 0     | Slide Five  |

  @positive @applitools
  Scenario Outline: Move Carousel right to <index>
    Given I select slideIndex to "<index>"
    When I move carousel "right"
    Then classic slide title is "<title>"
      And Element displays correctly
    Examples:
      | index | title       |
      | 4     | Slide One   |
      | 0     | Slide Two   |
      | 1     | Slide Three |
      | 2     | Slide Four  |
      | 3     | Slide Five  |