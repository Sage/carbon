Feature: InlineInputs component
  I want to test InlineInputs component properties

  @positive
  Scenario Outline: Change InlineInputs label to <label>
    When I open default-story "Inline Inputs" component with "inlineInputs" json from "commonComponents" using "<nameOfObject>" object name
    Then label is set to <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Change first inline input to <label>
    Given I open "Inline Inputs" component page "default story"
    When I set 1st inline input to <label>
    Then 1st inline input on preview is <label>
    Examples:
      | label                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Change second inline input to <input>
    Given I open "Inline Inputs" component page "default story"
    When I set 2nd inline input to <input>
    Then 2nd inline input on preview is <input>
    Examples:
      | input |
      | 99999 |
      | 1     |

  @positive
  Scenario Outline: Change third inline input element select to <select>
    Given I open "Inline Inputs" component page "default story"
    When I set 3rd inline input to <select>
    Then 3rd inline input on preview is <select>
    Examples:
      | select |
      | Brown  |
      | Green  |
      | Orange |
      | Yellow |
