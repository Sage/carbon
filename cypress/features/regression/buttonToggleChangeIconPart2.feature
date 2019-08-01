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
