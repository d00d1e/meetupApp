Feature: Filter Events By City

Scenario: When user hasnt searched for a city, show upcoming events based on the users location by default.
  Given user had not searched for a city
  When user opens the app
  Then user should see the list of upcoming events from their location

Scenario: User should see a list of suggestions when they search for a city.
  Given main page is opened
  When user starts typing in the city text box
  Then user should receive a list of cities (suggestions) that match what they've typed

Scenario: User can select a city from the suggested list.
  Given user is typing their city in the city text box
  And the list of suggested cities is showing
  When user selects a city from the list
  Then their city should be changed to that city
  And user should receive a list of upcoming events in that city