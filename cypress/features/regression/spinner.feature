Feature: Loader component
  I want to change Loader component properties

  Background: Open Loader component page
    Given I open "Loader" component page legacy spinner

  @positive
  Scenario Outline: I set Loader component as to <as>
    When I select as to "<as>"
    Then Loader "border-top-color" color is set to "<border-top-color>"
      And Loader "border-left-color" color is set to "0.7" gradient of "<border-top-color>" base color
      And Loader "border-right-color" color is set to "0.3" gradient of "<border-top-color>" base color
    Examples:
      | as          | border-top-color  |
      | default     | rgb(51, 92, 109)  |
      | error       | rgb(199, 56, 79)  |
      | help        | rgb(255, 171, 0)  |
      | info        | rgb(21, 115, 230) |
      | maintenance | rgb(255, 125, 0)  |
      | new         | rgb(102, 51, 153) |
      | success     | rgb(80, 184, 72)  |
      | warning     | rgb(255, 125, 0)  |

  @positive
  Scenario Outline: I set Spinner component size to <size>
    When I select size to "<size>"
    Then Loader width and height is set to "<px>"
    Examples:
      | size         | px |
      | extra-small  | 8  |
      | small        | 12 |
      | medium-small | 20 |
      | medium       | 25 |
      | medium-large | 32 |
      | large        | 40 |
      | extra-large  | 45 |
