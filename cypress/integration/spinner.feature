Feature: Spinner component
  I want to change Spinner component properties
# according to https://jira.sage.com/browse/FE-1415
# component's name will be changed to Loader

  Background: Open Spinner component page
    Given I open "Spinner" component page

  @positive
  Scenario Outline: I set Spinner component as to <as>
    When I select as to "<as>"
    Then Spinner as is set to "<as>"
    Examples:
      | as          |
      | default     |
      | error       |
      | help        |
      | info        |
      | maintenance |
      | new         |
      | success     |
      | warning     |

  @positive
  Scenario Outline: I set Spinner component size to <size>
    When I select size to "<size>"
    Then Spinner size is set to "<size>"
    Examples:
      | size         |
      | extra-small  |
      | small        |
      | medium-small |
      | medium       |
      | medium-large |
      | large        |
      | extra-large  |
