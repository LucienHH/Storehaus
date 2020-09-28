Feature: Is it Friday yet?
  Everybody wants to know when it's Friday

  Scenario: Sunday isn't Friday
    Given a day is Sunday
    When I ask whether Friday is Sunday
    Then I should be told Nope