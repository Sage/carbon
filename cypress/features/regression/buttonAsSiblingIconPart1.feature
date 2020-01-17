Feature: Button as a sibling component
  I want to check Button as a sibling component properties

  Background: Open Button as a sibling component page default
    Given I open "Button" component page as sibling in no iframe

  @positive
  Scenario Outline: Set Button icon to <iconType>
    When I check has icon checkbox
      And I select iconType to "<iconType>"
    Then Button as a sibling icon is set to "<iconType>"
    Examples:
      | iconType            |
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