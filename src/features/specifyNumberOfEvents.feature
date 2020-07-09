Feature: Specify Number of Events

Scenario: When user hasnt specified a number, 32 is the default number
  Given the list of events had been loaded
  When user is viewing the list of events
  Then a list 32 events should be displayed
Scenario: User can change the number of events they want to see
  Given the list of events had been loaded
  When user changes the number of events shown
  Then the page should updated to reflect the number of events specified