Feature: Animated Menu Button component
  I want to change Animated Menu Button component properties

  Background: Open Animated Menu Button component page
    Given I open Animated Menu Button component page

  @positive
  Scenario Outline: Change Animated Menu Button label
    When I set label to "<label>"
      And I trigger Animated Menu Button preview
    Then Animated Menu Button label on preview is "<label>"
    Examples:
      | label                    |
      | Example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Animated Menu Button direction
    When I set direction to "<direction>"
    Then Animated Menu Button direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change Animated Menu Button size
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
