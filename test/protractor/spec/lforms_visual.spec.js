var tp = require('./lforms_testpage.po.js');

// Units columns
describe('Hiding and showing Units column ', function() {

  it('should be able to dynamically hide and show Units column in the table template', function () {

    var unitsCol = element(by.id("th_Units"));
    tp.openFullFeaturedForm();

    // units column is shown
    expect(unitsCol.isDisplayed()).toBe(true);
    // hide the units column
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isPresent()).toBe(false);
    // show it again
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isDisplayed()).toBe(true);

    // open another form
    tp.openFormWithUserData();
    // units column is shown
    expect(unitsCol.isDisplayed()).toBe(true);
    // hide the units column
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isPresent()).toBe(false);
    // show it again
    element(by.id("toggle-units-col")).click();
    expect(unitsCol.isDisplayed()).toBe(true);
 });
});


describe('Change fields in form header ', function() {

  it('should be able to dynamically change form header fields', function () {

    tp.openFullFeaturedForm();
    var comment =element(by.id("comment"));
    var timeDone =element(by.id("time_done"));
    var dateDone =element(by.id("date_done"));
    var whereDone =element(by.id("where_done"));

    expect(comment.isDisplayed()).toBe(true);
    expect(timeDone.isDisplayed()).toBe(true);
    expect(dateDone.isDisplayed()).toBe(true);
    expect(whereDone.isDisplayed()).toBe(true);

    element(by.id("change-columns")).click();

    // obr has only two fields
    expect(comment.isPresent()).toBe(false);
    expect(timeDone.isPresent()).toBe(false);
    expect(dateDone.isDisplayed()).toBe(true);
    expect(whereDone.isDisplayed()).toBe(true);
  });

});

describe('Links on question codes', function() {

  it('should show a link on LOINC typed question code and no links for non-LOINC typed question codes.', function () {
    tp.openFullFeaturedForm();
    browser.wait(function() {
      return element(by.id('/type0/1')).isPresent();
    }, 5000);

    var codeCheckbox = tp.checkboxesFinder.get(0);
    codeCheckbox.click();

    var titleCode = element(by.css(".lf-form-title .lf-item-code span"));
    var titleCodeLink = element(by.css(".lf-form-title .lf-item-code a"));
    expect(titleCode.getText()).toBe("[all-in-one]");
    // form's code should not have a link
    expect(titleCodeLink.isPresent()).toBe(false);

    var itemCodeLink0 = element.all(by.css(".lf-de-label .lf-item-code a")).get(0);
    // the first question's code should have a link
    expect(itemCodeLink0.getText()).toBe("[type0]");
    var itemCode1 = element.all(by.css(".lf-de-label .lf-item-code span")).get(0);
    // the second question's code should not have a link
    expect(itemCode1.getText()).toBe("[type1]");
  });

});


describe('Question/section in question', function() {

  it('should all the questions/sections defined in the question-in-question form', function () {
    tp.openQuestionInQuestionForm();
    browser.wait(function() {
      return element(by.id('/q1/1')).isPresent();
    }, 5000);

    expect(element(by.id('/q1/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q1/q11/1/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q1/q12/1/1')).isDisplayed()).toBe(true);

    expect(element(by.id('/q2/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q2/q21/1/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q2/q22/q221/1/1/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q2/q22/q222/1/1/1')).isDisplayed()).toBe(true);

    expect(element(by.id('/q3/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q3/q31/1/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q3/q32/q321/1/1/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q3/q32/q322/1/1/1')).isDisplayed()).toBe(true);

    element(by.id('add-/q3/q31/1/1')).click();
    expect(element(by.id('/q3/q31/1/2')).isDisplayed()).toBe(true);

    element(by.id('add-/q3/q32/1/1')).click();
    expect(element(by.id('/q3/q32/q321/1/2/1')).isDisplayed()).toBe(true);
    expect(element(by.id('/q3/q32/q322/1/2/1')).isDisplayed()).toBe(true);

  });

});
