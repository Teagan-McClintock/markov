/** Textual markov chain generator. */

const _ = require("lodash");


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    //it's like a freq counter

    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const currChain = chains[this.words[i]] || [];
      currChain.push(this.words[i + 1] || null);
      chains[this.words[i]] = currChain;
    }

    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let wordToAdd = this.words[0];
    let outputText = '';

    while (wordToAdd) {
      outputText += `${wordToAdd} `;
      wordToAdd = _.sample(this.chains[wordToAdd]);
    }

    return outputText.trimEnd();
  }
}

module.exports = { MarkovMachine };
