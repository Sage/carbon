Feature: Icon component
  I want to change Heading component properties

  Background: Open Icon component page
    Given I open "Icon" component page

  @positive
  Scenario Outline: Change type to <type>
    When I select type to "<type>"
    Then icon on preview is "<type>"
    Examples:
      | type                |
      | add                 |
      | alert               |
      | analysis            |
      | arrow_down          |
      | arrow_left          |
      | arrow_left_small    |
      | arrow_right         |
      | arrow_right_small   |
      | arrow_up            |
      | attach              |
      | basket              |
      | bin                 |
      | blocked             |
      | blocked_square      |
      | bulk_destroy        |
      | business            |
      | calendar            |
      | calendar_today      |
      | call                |
      | camera              |
      | card_view           |
      | caret_down          |
      | cart                |
      | chat                |
      | chart_bar           |
      | chart_line          |
      | chart_pie           |
      | chat_notes          |
      | chevron_down        |
      | chevron_left        |
      | chevron_right       |
      | chevron_up          |
      | clock               |
      | close               |
      | coins               |
      | collaborate         |
      | copy                |
      | connect             |
      | credit_card         |
      | credit_card_slash   |
      | cross               |
      | csv                 |
      | delete              |
      | delivery            |
      | disputed            |
      | download            |
      | drag                |
      | drag_vertical       |
      | draft               |
      | dropdown            |
      | duplicate           |
      | edit                |
      | edited              |
      | ellipsis_horizontal |
      | ellipsis_vertical   |
      | error               |
      | favourite           |
      | favourite_lined     |
      | fax                 |

  @positive
  Scenario Outline: Change type to <iconName>
    When I select type to "<iconName>"
    Then icon on preview is "<iconDataElement>"
    Examples:
      | iconName | iconDataElement |
      | email    | message         |