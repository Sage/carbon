Feature: Link component
  I want to change Link component properties

  Background: Open Link component page
    Given I open "Link" component page

  @positive
  Scenario Outline: Change Link children
    When I set children to "<children>"
    Then children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario: enable Link component
    When I disable Link component
    Then Link is disabled

  @positive
  Scenario: Disable and enable Link component
    When I disable Link component
      And I enable Link component
    Then Link is enabled

  @positive
  Scenario Outline: Change Link href
    When I set href to "<href>"
    Then Link on preview href is set to "<href>"
    Examples:
      | href                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change type of icon for a Link component
    When I select icon to "<icon>"
    Then icon on link componenent preview is "<icon>"
    Examples:
      | icon              |
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

@positive
  Scenario Outline: Change link component icon align position
    When I select icon to "add"
      And I select iconAlign to "<iconAlign>"
    Then icon align is set to "<iconAlign>"
    Examples:
      | iconAlign |
      | left      |
      | right     |
     
  @positive
  Scenario Outline: Change tooltip align
    When I select icon to "add"
      And I set tooltipMessage to "sample message"
      And I select tooltipAlign to "<tooltipAlign>"
      And I hover mouse onto icon
    Then tooltipAlign is set to "<tooltipAlign>"
    Examples:
      | tooltipAlign |
      | left         |
      | right        |
      | top          |
      | bottom       |
      | center       |

  @positive
  Scenario Outline: Change tooltip position
    When I select icon to "add"
      And I set tooltipMessage to "sample message"
      And I select tooltipPosition to "<tooltipPosition>"
      And I hover mouse onto icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition |
      | left            |
      | right           |
      | top             |
      | bottom          |

  @positive
  Scenario: Check tabbable and focus the link componenent
    When I check tabbable checkbox
    Then Link is tabbable
      And I hit Tab key
      And I hit Tab key
      And Link component is focused

  @positive
  Scenario: Uncheck tabbable
    When I check tabbable checkbox
      And I uncheck tabbable checkbox
    Then Link is not tabbable
      And I hit Tab key
      And I hit Tab key
      And Link component is not focused