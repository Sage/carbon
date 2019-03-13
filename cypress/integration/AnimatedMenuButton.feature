Feature: Animated Menu Button component
  I want to change Animated Menu Button component properties

  @positive
  Scenario Outline: Change Animated Menu Button label
    Given I open Animated Menu Button component page
    When I set label to "<label>"
      And I trigger Animated Menu Button preview
    Then Animated Menu Button label on preview is "<label>"
    Examples:
      | label                    |
      | example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Animated Menu Button direction
    Given I open Animated Menu Button component page
    When I set direction to "<direction>"
    Then Animated Menu Button direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change Animated Menu Button size
    Given I open Animated Menu Button component page
    When I set component size to "<size>"
    Then Animated Menu Button size property on preview is "<size>"
    Examples:
      | size         |
      | extra-small  |
      | small        |
      | medium-small |
      | medium       |
      | medium-large |
      | large        |
      | extra-large  |
