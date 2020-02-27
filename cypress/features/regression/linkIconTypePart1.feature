Feature: Link component
  I want to change Link component properties

  Background: Open Link component page
    Given I open "Link" component page

  @positive
  Scenario Outline: Change type of icon for a Link component to <icon>
    When I select icon to "<icon>"
    Then icon on link componenent preview is "<icon>"
    Examples:
      | icon                |
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
  Scenario Outline: Change type of icon for a Link component to <iconName>
    When I select icon to "<iconName>"
    Then icon on link componenent preview is "<iconDataElement>"
    Examples:
      | iconName | iconDataElement |
      | email    | message         |