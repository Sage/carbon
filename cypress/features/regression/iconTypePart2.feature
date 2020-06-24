Feature: Icon component
  I want to change Icon component properties

  Background: Open Icon component page
    Given I open "Icon" component page

  @ignore
  Scenario Outline: Change type to <type>
    When I select type to "<type>"
    Then icon on preview is "<type>"
    Examples:
      | type               |
      | feedback           |
      | file_excel         |
      | file_generic       |
      | file_image         | 
      | file_pdf           |
      | file_word          | 
      | files_leaning      |
      | filter             |
      | filter_new         |
      | fit_height         |
      | fit_width          |
      | folder             |
      | gift               |
      | graph              |
      | grid               |
      | home               |
      | image              |
      | in_progress        |
      | in_transit         |
      | info               |
      | individual         |
      | italic             |
      | key                |
      | ledger             |
      | ledger_arrow_left  |
      | ledger_arrow_right |
      | link               |
      | list_view          |
      | locked             |
      | location           |
      | logout             |
      | lookup             |
      | marker             |
      | message            |
      | minus              |
      | minus_large        |
      | mobile             |
      | money_bag          |
      | pause_circle       |
      | pdf                |
      | people             |
      | people_switch      |
      | person             |
      | person_info        |
      | person_tick        |
      | phone              |
      | play               |
      | play_circle        |
      | plus               |
      | plus_large         |
      | print              |
      | progress           |
      | progressed         |
      | question           |
      | refresh            |
      | refresh_clock      |
      | remove             |
      | save               |
      | scan               |
      | search             |
      | services           |
      | settings           |
      | share              |
      | shop               |
      | sort_down          |
      | sort_up            |
      | spanner            |
      | split              |
      | split_container    |
      | stacked_boxes      |
      | stacked_squares    |
      | submitted          |
      | sync               |
      | tag                |
      | three_boxes        |
      | tick               |
      | tick_circle        |
      | unlocked           |
      | upload             |
      | uploaded           |
      | video              |
      | view               |
      | warning            |

  @ignore
  Scenario Outline: Change type to <iconName>
    When I select type to "<iconName>"
    Then icon on preview is "<iconDataElement>"
    Examples:
      | iconName | iconDataElement |
      | messages | message         |
      | help     | question        |