"use strict";

const { MarkovMachine } = require("./markov.js");

const STANDARD_INPUT = "the cat in the hat";

describe("chain tests", function(){

  test("should generate chain for normal input", function(){
    const machine = new MarkovMachine(STANDARD_INPUT);
    const chains = machine.getChains();
    expect(chains).toEqual({
      the: [ 'cat', 'hat' ],
      cat: [ 'in' ],
      in: [ 'the' ],
      hat: [ null ] });
  })

  test("should generate null chain for blank input", function(){
    const machine = new MarkovMachine("");
    const chains = machine.getChains();
    expect(chains).toEqual({"": [null]});
  })
})

describe("valid text tests", function(){

  let text;

  beforeEach(function(){
    const machine = new MarkovMachine(STANDARD_INPUT);
    text = machine.getText();
  })

  test("should generate some string for normal input", function(){
    expect(text).toEqual(expect.any(String));
  })

  test("generated text for normal input should start with first word", function(){
    expect(text.startsWith("the")).toEqual(true);
  })
})