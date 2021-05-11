Feature: Carousel component
  I want to check Carousel properties

  @positive
  Scenario Outline: Set slide index to <index>
    When I open default "Carousel Test" component in noIFrame with "carousel" json from "commonComponents" using "<nameOfObject>" object name
    Then slide <index> title is "<title>"
    Examples:
      | index | title                | nameOfObject |
      | 0     | Slide 1              | slideIndex0  |
      | 1     | Full clickable slide | slideIndex1  |
      | 2     | Slide 3              | slideIndex2  |
      | 3     | Slide 4              | slideIndex3  |
      | 4     | Slide 5              | slideIndex4  |

  @positive
  Scenario Outline: Move Carousel left to <index>
    Given I open default "Carousel Test" component in noIFrame with "carousel" json from "commonComponents" using "<nameOfObject>" object name
    When I move carousel "left"
    Then slide <indexSlide> title is "<title>"
    Examples:
      | index | indexSlide | title                | nameOfObject |
      | 1     | 0          | Slide 1              | slideIndex1  |
      | 2     | 1          | Full clickable slide | slideIndex2  |
      | 3     | 2          | Slide 3              | slideIndex3  |
      | 4     | 3          | Slide 4              | slideIndex4  |

  @positive
  Scenario Outline: Move Carousel right to <index>
    Given I open default "Carousel Test" component in noIFrame with "carousel" json from "commonComponents" using "<nameOfObject>" object name
    When I move carousel "right"
    Then slide <indexSlide> title is "<title>"
    Examples:
      | index | indexSlide | title                | nameOfObject |
      | 0     | 1          | Full clickable slide | slideIndex0  |
      | 1     | 2          | Slide 3              | slideIndex1  |
      | 2     | 3          | Slide 4              | slideIndex2  |
      | 3     | 4          | Slide 5              | slideIndex3  |

  @positive
  Scenario: Carousel previous arrow is disabled
    When I open default "Carousel Test" component in noIFrame with "carousel" json from "commonComponents" using "slideIndex0" object name
    Then previous button is disabled

  @positive
  Scenario: Carousel next arrow is disabled
    Given I open default "Carousel Test" component in noIFrame with "carousel" json from "commonComponents" using "slideIndex4" object name
    Then next button is disabled

  @positive
  Scenario: Verify the click event for a clickable slide
    Given I open "Carousel Test" component page "default"
      And I select slideIndex to "1"
      And I wait 500
      And clear all actions in Actions Tab
    When I click clickable slide
    Then click action was called in Actions Tab