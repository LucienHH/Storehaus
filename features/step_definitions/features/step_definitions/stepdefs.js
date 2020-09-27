const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

//Sanity Check
  Given('a day is Sunday', function () {
    this.expected = 'Sunday';
  });
  
  When('I ask whether Friday is Sunday', function () {
    this.actual = `Nope`;
  });
  
  Then('I should be told Nope', function () {
    assert.notEqual(this.expected, this.actual)
  });