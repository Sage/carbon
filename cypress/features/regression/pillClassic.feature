Feature: Pill classic component
  I want to test Pill classic component properties

  Background: Open Pill component page classic
    Given I open "Pill" component page classic

  @positive
  Scenario Outline: Set Pill as align to <as> and check the proper color as <color>
    When I select as to "<as>"
    Then Pill on preview has "<color>"
    Examples:
      | as          | color              |
      | default     | rgb(51, 91, 109)   |
      | error       | rgb(199, 56, 79)   |
      | help        | rgb(255, 171, 0)   |
      | info        | rgb(21, 115, 230)  |
      | maintenance | rgb(255, 125, 0)   |
      | new         | rgb(102, 51, 153)  |
      | success     | rgb(80, 184, 72)   |
      | warning     | rgb(255, 125, 0)   |
      | disabled    | rgb(204, 214, 218) |

  @positive
  Scenario Outline: Enable and disable fill checkbox for a Pill component
    Given I check fill checkbox
    When I uncheck fill checkbox
    Then Pill component has no backgroundColor "<color>"
      And Pill borderColor has "<color>" color
    Examples:
      | color            |
      | rgb(51, 91, 109) |

  @positive
  Scenario: Enable fill checkbox for a Pill component
    When I check fill checkbox
    Then Pill component has "rgb(51, 91, 109)" fill color