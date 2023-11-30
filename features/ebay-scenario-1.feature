#Feature: Access a Product via category after applying multiple filters

#  Scenario: As a user not logged in, i should be able to navigate and apply filters to produce

#    Given I am on the home page
#    When I navigate to category with name : Cell phones & accessories
#    When I navigate to main menu Cell Phones & Smartphones
#    When I apply filters with the following conditions:
#      | Conditions | PriceRange | ItemLocation |
#      | New,Used   | 1000,5000  | Default      |
#    Then I should see 3 filters applied