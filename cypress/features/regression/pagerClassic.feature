Feature: Pager classic component
  I want to test Pager classic component properties

  Background: Open Pager component page classic
    Given I open "Pager" component page classic

  @positive
  Scenario: Pagination previous arrow is disabled
  # commented because of BDD default scenario Given - When - Then
  # When I open "Pager" component page
    Then previous pagination arrow is disabled

  @positive
  Scenario: Pagination next arrow is disabled
    When I click next 9 times
    Then next pagination arrow is disabled

  @positive
  Scenario: Pagination previous arrow is disabled after previous paginate
    When I type "10" to input pagination
      And I click previous 9 times
    Then previous pagination arrow is disabled

  @positive
  Scenario: Pagination previous and next arrow are disabled
    When I set totalRecords to "1"
      And I select pageSize to "10"
    Then previous pagination arrow is disabled
      And next pagination arrow is disabled