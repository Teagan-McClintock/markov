"use strict";

const { MarkovMachine } = require("./markov.js");

const STD_BRANCHED_TEXT = "the cat in the hat";

describe("chain generation tests", function() {

  test("should generate chain for normal input", function() {
    const machine = new MarkovMachine(STD_BRANCHED_TEXT);
    const chains = machine.getChains();
    expect(chains).toEqual({
      the: [ 'cat', 'hat' ],
      cat: [ 'in' ],
      in: [ 'the' ],
      hat: [ null ] });
  });

  test("should generate null chain for blank input", function() {
    const machine = new MarkovMachine("");
    const chains = machine.getChains();
    expect(chains).toEqual({"": [null]});
  });
});

describe("branched text tests", function() {

  let machine;
  let text;

  beforeEach(function() {
    machine = new MarkovMachine(STD_BRANCHED_TEXT);
    text = machine.getText();
  });

  test("should generate some string for normal input", function(){
    expect(text).toEqual(expect.any(String));
  });

  test("generated text for normal input should start with first word", function(){
    expect(text.startsWith("the")).toEqual(true);
  });

  test("generated text for normal input should end with last word", function(){
    expect(text.endsWith("hat")).toEqual(true);
  });

  test("generated text for normal input should have length of >=7", function(){
    expect(text.length).toBeGreaterThanOrEqual(7);
  });

  test("generated text for normal input follows rules for Markov machine",
    function(){
      const textSplit = text.split(/[ \r\n]+/); //might only need space here?
      for (let i = 0; i < textSplit.length - 1; i++){
        expect(machine.chains[textSplit[i]]).toContain(textSplit[i + 1]);
      }
    });

  test("last word has null in its Markov chain", function(){
    const textSplit = text.split(/[ \r\n]+/);
    const lastWord = textSplit[textSplit.length - 1];
    expect(machine.chains[lastWord]).toContain(null);
  });
});

describe("unbranched text tests", function() {

  test("should generate input string", function() {
    const machine = new MarkovMachine('No branch test text.');
    const text = machine.getText();
    expect(text).toEqual('No branch test text.');
  });

});

describe("empty text tests", function() {

  test("should generate empty string", function() {
    const machine = new MarkovMachine('');
    const text = machine.getText();
    expect(text).toEqual('');
  });

});
