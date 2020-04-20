Feature: InlineInputs component
  I want to change InlineInputs component properties

  Background: Open InlineInputs component default page
    Given I open "InlineInputs" component page

  @positive
  Scenario Outline: Change InlineInputs label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change first inline input to <label>
    When I set 1st inline input to "<label>"
    Then 1st inline input on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change second inline input to <input>
    When I set 2nd inline input to "<input>"
    Then 2nd inline input on preview is "<input>"
    Examples:
      | input      |
      | 99999      |
      | 1          |

  @positive
  Scenario Outline: Change third inline input element select to <select>
    When I set 3rd inline input to "<select>"
    Then 3rd inline input on preview is "<select>"
    Examples:
      | select |
      | Brown  |
      | Green  |
      | Orange |
      | Yellow |