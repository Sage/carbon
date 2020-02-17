Feature: Carousel component
  I want to change Carousel properties

  Background: Open Carousel component page
    Given I open "Carousel" component page

  @positive
  Scenario: Initial slide title is Slide 3
  # When step is run on background as Given
    Then "<index>" slide title is "Slide 3"

  @positive
  Scenario Outline: Set slide index to <index>
    When I select slideIndex to "<index>"
    Then "<index>" slide title is "<title>"
    Examples:
      | index | title                |
      | 0     | Slide 1              |
      | 1     | Full clickable slide |
      | 2     | Slide 3              |
      | 3     | Slide 4              |
      | 4     | Slide 5              |

  @positive
  Scenario Outline: Move Carousel left to <index>
    When I select slideIndex to "<index>"
      And I move carousel "left"
    Then "<index>" slide title is "<title>"
    Examples:
      | index | title                |
      | 1     | Slide 1              |
      | 2     | Full clickable slide |
      | 3     | Slide 3              |
      | 4     | Slide 4              |

  @positive
  Scenario Outline: Move Carousel right to <index>
    When I select slideIndex to "<index>"
      And I move carousel "right"
    Then "<index>" slide title is "<title>"
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
  Scenario Outline: Use slide selector to choose slide
    When I select slideIndex to "<index>"
    Then "<index>" slide title is "<title>"
    Examples:
      | index | title                |
      | 0     | Slide 1              |
      | 1     | Full clickable slide |
      | 2     | Slide 3              |
      | 3     | Slide 4              |
      | 4     | Slide 5              |

  @positive
  Scenario: Verify the click function for a clickable slide
    Given I select slideIndex to "1"
      And clear all actions in Actions Tab
    When I click clickable slide
    Then click action was called in Actions Tab