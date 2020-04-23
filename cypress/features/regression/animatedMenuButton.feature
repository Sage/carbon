Feature: Animated Menu Button component
  I want to change Animated Menu Button component properties

  Background: Open Animated Menu Button component page
    Given I open "Animated Menu Button" component page

  @positive
  Scenario Outline: Change Animated Menu Button label to <label>
    When I set label to "<label>"
      And I trigger Animated Menu Button preview
    Then Animated Menu Button label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Change Animated Menu Button direction to <direction>
    When I select direction to "<direction>"
    Then Animated Menu Button direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change Animated Menu Button size to <size>
    When I select size to "<size>"
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