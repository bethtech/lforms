// Tests for the HL7 generation library
var hl7 = require('../../app/scripts/lib/lforms-hl7');
var assert = require('assert');

describe('HL7 library', function() {
  describe('itemToField', function() {
    it('should use LOINC as the default code system', function() {
      formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'value': {'text': 'United States', 'code': 'USA'}, 'dataType': 'CWE',
        '_idPath': '/1'};
      var out = hl7.itemToField(itemData, formInfo);
      assert.equal(out.trim(),
        'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
        '^LN|1|'+itemData.value.code+'^'+itemData.value.text+'^LN|');
    });


    it('should use answerCodeSystem when provided', function() {
      formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'AA',
        'value': {'text': 'United States', 'code': 'USA'}, 'dataType': 'CWE',
        '_idPath': '/1'};
      var out = hl7.itemToField(itemData, formInfo);
      assert.equal(out.trim(),
        'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
        '^LN|1|'+itemData.value.code+'^'+itemData.value.text+'^AA|');
    });


    it('should put uncoded CWE answers into OBX5.9', function() {
      formInfo = {obxIndex: 1};
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'AA',
        'value': {'text': 'United States'}, 'dataType': 'CWE',
        '_idPath': '/1'};
      var out = hl7.itemToField(itemData, formInfo);
      assert.equal(out.trim(),
        'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
        '^LN|1|^^^^^^^^'+itemData.value.text+'|');
      // Try a multi-answer field
      var itemData = {'question': 'Country', 'questionCode': 'X1234-5',
        'answerCodeSystem': 'AA',
        'value': [{'text': 'Canada'}, {'text': 'United States', 'code': 'USA'}],
         'dataType': 'CWE', '_idPath': '/1'};
      var out = hl7.itemToField(itemData, formInfo);
      assert.equal(out.trim(),
        'OBX|1|CWE|'+itemData.questionCode+'^'+itemData.question+
        '^LN|1|^^^^^^^^Canada~ USA^United States^AA|');
    });
  });

});
