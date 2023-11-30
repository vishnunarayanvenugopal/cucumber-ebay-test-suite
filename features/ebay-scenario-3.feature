Feature: Ebay product search,assert count & check out as guest

  Scenario: As a user not logged in, i should be able to search & checkout products

    Given I am on the home page
    When I search string MacBook in search bar
    When I navigate to first result in the search page
    When I apply selection for color and spec with the following data:
      | CoverColor | Spec |
      | Blue       | 8GB RAM + 256GB SSD |
    Then I check count above or below 50
    When I buy it and checkout as a guest
    When I fill the shipping address with the following data:
      | Country | FirstName | LastName | LastName | StreetAddress | City | State |  Email |  Zip |   phoneno | 
      | India   | sam | vincent | adress-1 | city-1 | state-1 |  Email-here |  Zip-here |   phoneno-here |