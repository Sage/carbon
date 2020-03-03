Feature: Carousel component
  I want to change Carousel properties

  Background: Open Carousel component page
    Given I open "Carousel" component page

  @positive
  Scenario: Initial slide title is Slide 3
    # commented because of BDD default scenario Given - When - Then
    # When I open "Carousel" component page
    Then slide 2 title is "Slide 3"

  @positive
  Scenario Outline: Set slide index to <index>
    When I select slideIndex to "<index>"
    Then slide <index> title is "<title>"
    Examples:
      | index | title                |
      | 0     | Slide 1              |
      | 1     | Full clickable slide |
      | 2     | Slide 3              |
      | 3     | Slide 4              |
      | 4     | Slide 5              |

  @positive
  Scenario Outline: Move Carousel left to <index>
    Given I select slideIndex to "<index>"
    When I move carousel "left"
    Then slide <index> title is "<title>"
    Examples:
      | index | title                |
      | 1     | Slide 1              |
      | 2     | Full clickable slide |
      | 3     | Slide 3              |
      | 4     | Slide 4              |

  @positive
  Scenario Outline: Move Carousel right to <index>
    Given I select slideIndex to "<index>"
    When I move carousel "right"
    Then slide <index> title is "<title>"
    Examples:
      | index | title                |
      | 0     | Full clickable slide |
      | 1     | Slide 3              |
      | 2     | Slide 4              |
      | 3     | Slide 5              |

  @positive
  Scenario: Carousel previous arrow is disabled
    When I select slideIndex to "0"
    Then previous button is disabled

  @positive
  Scenario: Carousel next arrow is disabled
    When I select slideIndex to "4"
    Then next button is disabled

  @positive
  Scenario: Verify the click event for a clickable slide
    Given I select slideIndex to "1"
      And clear all actions in Actions Tab
    When I click clickable slide 1
    Then click action was called in Actions Tab
