Feature: Link component
  I want to change Link component properties

  Background: Open Link component page
    Given I open "Link" component page

  @positive
  Scenario Outline: Change type of icon for a Link component to <icon>
    When I select icon to "<icon>"
    Then icon on link componenent preview is "<icon>"
    Examples:
      | icon         |
      | feedback     |
      | filter       |
      | filter_new   |
      | fit_height   |
      | fit_width    |
      | folder       |
      | gift         |
      | graph        |
      | grid         |
      | home         |
      | image        |
      | in_progress  |
      | in_transit   |
      | info         |
      | individual   |
      | key          |
      | link         |
      | list_view    |
      | locked       |
      | location     |
      | logout       |
      | lookup       |
      | marker       |
      | message      |
      | minus        |
      | minus_large  |
      | mobile       |
      | pause_circle |
      | pdf          |
      | people       |
      | person       |
      | phone        |
      | play         |
      | play_circle  |
      | plus         |
      | plus_large   |
      | print        |
      | progress     |
      | progressed   |
      | question     |
      | refresh      |
      | remove       |
      | save         |
      | scan         |
      | search       |
      | services     |
      | settings     |
      | share        |
      | shop         |
      | sort_down    |
      | sort_up      |
      | submitted    |
      | sync         |
      | tick         |
      | unlocked     |
      | upload       |
      | uploaded     |
      | video        |
      | view         |
      | warning      |

  @positive
  Scenario Outline: Change type of icon for a Link component to <iconName>
    When I select icon to "<iconName>"
    Then icon on link componenent preview is "<iconDataElement>"
    Examples:
      | iconName | iconDataElement |
      | messages | message         |
      | help     | question        |