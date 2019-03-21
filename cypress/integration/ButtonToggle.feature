Feature: Button Toggle component
  I want to change Button Toggle children, button icon, button size, disabled, grouped properties

  Background: Open Button Toggle component page
    Given I open Button Toggle component page

  @positive
  Scenario Outline: Change Button Toggle childen
    When I set children to "<label>"
    Then Button Toggle label on preview is "<label>"
    Examples:
      | label                    |
      | Example Label Test       |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle icon
    When I set button icon to "<iconName>"
    Then Button icon on preview is "<iconName>"
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
      | help              |
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

  @negative
  Scenario: Change Button Toggle icon to null
    When I set button icon to "null"
    Then Button icon not exists on preview

  @positive
  Scenario Outline: Change button icon size property
    When I set button icon to "arrow_left"
      And I set button icon size to "<size>"
    Then Button icon size on preview is "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario Outline: Set Button Toggle size to small, large
    When I set component size to "<size>"
    Then Button Toggle size on preview is "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario: Disable Button
    Given I open Button Toggle component page
    When I disable Button
    Then Button Toggle is disabled

  @positive
  Scenario: Disable and enable Button
    Given I open Button Toggle component page
    When I disable Button
      And I enable Button
    Then Button Toggle is enabled

  @positive
  Scenario: Enable Button Toggle grouped property
    Given I open Button Toggle component page
    When I check grouped
    Then Button Toggle is grouped

  @positive
  Scenario: Enable and disable Button Toggle grouped property
    Given I open Button Toggle component page
    When I disable Button
      And I enable Button
    Then Button Toggle is not grouped
