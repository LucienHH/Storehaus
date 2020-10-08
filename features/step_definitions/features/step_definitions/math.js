const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

//Sanity Check
  Given('a variable is 2', function () {
    two = 2;
  });
  
  When('I add the variables together', function () {
    four = two + two;
  });
  
  Then('I should get 4 as the answer', function () {
    assert.equal(four, two + two)
  });