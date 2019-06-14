Feature: Detail component
  I want to change Detail component properties

  Background: Open Detail component page
    Given I open "Detail" component page

  @positive
  Scenario Outline: Change Detail children to <children>
    When I set children to "<children>"
    Then detail children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Detail footnote to <footnote>
    When I set footnote to "<footnote>"
    Then detail footnote on preview is "<footnote>"
    Examples:
      | footnote                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @negative
  Scenario: Change Detail icon to null
    When I set detail icon to "null"
    Then icon not exists on preview

  @positive
  Scenario Outline: Change Detail icon to <iconName>
    When I set detail icon to "<iconName>"
    Then icon on preview is "<iconName>"
    Examples:
      | iconName          |
      | add               |
      | alert             |
      | analysis          |
      | arrow_down        |
      | arrow_left        |
      | arrow_right       |
      | arrow_up          |
      | attach            |
      | basket            |
      | bin               |
      | blocked           |
      | blocked_square    |
      | bulk_destroy      |
      | business          |
      | calendar          |
      | call              |
      | camera            |
      | card_view         |
      | caret_down        |
      | cart              |
      | chat              |
      | chart_bar         |
      | chart_line        |
      | chart_pie         |
      | chat_notes        |
      | chevron_down      |
      | chevron_left      |
      | chevron_right     |
      | chevron_up        |
      | clock             |
      | close             |
      | collaborate       |
      | copy              |
      | connect           |
      | credit_card       |
      | credit_card_slash |
      | cross             |
      | csv               |
      | delete            |
      | delivery          |
      | disputed          |
      | download          |
      | drag              |
      | drag_vertical     |
      | draft             |
      | dropdown          |
      | duplicate         |
      | edit              |
      | edited            |
      | email             |
      | error             |
      | favourite         |
      | favourite_lined   |
      | fax               |
      | feedback          |
      | filter            |
      | filter_new        |
      | fit_height        |
      | fit_width         |
      | folder            |
      | gift              |
      | graph             |
      | grid              |
      | home              |
      | image             |
      | in_progress       |
      | in_transit        |
      | info              |
      | individual        |
      | key               |
      | link              |
      | list_view         |
      | locked            |
      | location          |
      | logout            |
      | marker            |
      | message           |
      | messages          |
      | minus             |
      | mobile            |
      | pdf               |
      | people            |
      | person            |
      | phone             |
      | plus              |
      | print             |
      | progressed        |
      | question          |
      | refresh           |
      | remove            |
      | save              |
      | search            |
      | services          |
      | settings          |
      | share             |
      | shop              |
      | sort_down         |
      | sort_up           |
      | submitted         |
      | sync              |
      | tick              |
      | unlocked          |
      | upload            |
      | uploaded          |
      | view              |
      | warning           |
      | white-tick        |
