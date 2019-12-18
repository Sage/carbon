Feature: Button Toggle component - set all possible icon and verify
  I want to change Button Toggle icon

  Background: Open Button Toggle component page
    Given I open "Button Toggle" component page

  @positive
  Scenario Outline: Change Button Toggle icon to <iconName>
    When I select buttonIcon to "<iconName>"
    Then Button icon on preview is "<iconName>"
    Examples:
      | iconName          |
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
      | minus             |
      | minus_large       |
      | mobile            |
      | pdf               |
      | people            |
      | person            |
      | phone             |
      | play              |
      | plus              |
      | plus_large        |
      | print             |
      | progress          |
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
      | video             |
      | view              |
      | warning           |

  @positive
  Scenario Outline: Change Button Toggle icon to <iconName>
    When I select buttonIcon to "<iconName>"
    Then Button icon on preview is "<iconDataElement>"
    Examples:
      | iconName          | iconDataElement |
      | messages          | message         |
      | help              | question        |