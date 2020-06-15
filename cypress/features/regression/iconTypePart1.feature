Feature: Icon component
  I want to change Icon component properties

  Background: Open Icon component page
    Given I open "Icon" component page

  @positive
  Scenario Outline: Change type to <type>
    When I select type to "<type>"
    Then icon on preview is "<type>"
    Examples:
      | type                    |
      | add                     |
      | alert                   |
      | analysis                |
      | arrow_down              |
      | arrow_left              |
      | arrow_left_boxed        |
      | arrow_left_small        |
      | arrow_right             |
      | arrow_right_small       |
      | arrow_up                |
      | attach                  |
      | bank                    |
      | basket                  |
      | basket_with_squares     |
      | bin                     |
      | blocked                 |
      | blocked_square          |
      | block_arrow_right       |
      | bold                    |
      | boxed_shapes            |
      | bullet_list             |
      | bullet_list_dotted      |
      | bullet_list_numbers     |
      | bulk_destroy            |
      | business                |
      | calendar                |
      | calendar_today          |
      | call                    |
      | camera                  |
      | card_view               |
      | caret_down              |
      | cart                    |
      | chat                    |
      | chart_bar               |
      | chart_line              |
      | chart_pie               |
      | chat_notes              |
      | chevron_down            |
      | chevron_left            |
      | chevron_right           |
      | chevron_up              |
      | circles_connection      |
      | clock                   |
      | close                   |
      | coins                   |
      | collaborate             |
      | computer_clock          |
      | copy                    |
      | connect                 |
      | credit_card             |
      | credit_card_slash       |
      | cross                   |
      | cross_circle            |
      | csv                     |
      | delete                  |
      | delivery                |
      | disputed                |
      | document_right_align    |
      | document_tick           |
      | document_vertical_lines |
      | download                |
      | drag                    |
      | drag_vertical           |
      | draft                   |
      | dropdown                |
      | duplicate               |
      | edit                    |
      | edited                  |
      | ellipsis_horizontal     |
      | ellipsis_vertical       |
      | error                   |
      | error_square            |
      | factory                 |
      | favourite               |
      | favourite_lined         |
      | fax                     |

  @positive
  Scenario Outline: Change type to <iconName>
    When I select type to "<iconName>"
    Then icon on preview is "<iconDataElement>"
    Examples:
      | iconName | iconDataElement |
      | email    | message         |