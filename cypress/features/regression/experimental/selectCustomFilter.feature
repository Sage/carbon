Feature: Experimental Select component customFilter story
  I want to test Experimental Select component properties in customFilter story

  Background: Open Experimental Select component page customFilter story
    Given I open "Experimental Select" component page customFilter

  @positive
  Scenario Outline: Verify Select component input <value> could be selected using synonyms <synonyms>
    When Type "<synonyms>" text into input and select the value
    Then Select input has "<value>" value
    Examples:
      | synonyms         | value           |
      | payment received | Book collection |
      | bank             | Book collection |
      | bill payed       | Book collection |
      | payed            | Book collection |
      | New Document     | Document entry  |
      | Opportunity      | Document entry  |
      | Lead             | Document entry  |
      | Offer            | Document entry  |
      | piece            | Articles        |
      | thing            | Articles        |