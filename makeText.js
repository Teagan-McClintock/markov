"use strict";

const { MarkovMachine } = require("./markov.js");

const fsP = require('fs/promises');

const argv = process.argv;

/** Read file for inputted file path str and log contents of file
 * Print error if given path of non-existant file */

async function getFileText(filePath) {

  try {
    const contents = await fsP.readFile(filePath, 'utf8');
    return contents;
  } catch (err) {
    console.error(err.toString());
    process.exit(1);
  }
}

/** Use input url and read content of url. Return content
 * Print error if url fetch does not yield valid result. */

async function getWebText(url) {

  try {
    const response = await fetch(url);
    const contents = await response.text();
    return contents;
  } catch (err) {
    console.error(err.toString());
    process.exit(1);
  }
}

async function main(textSource) {
  if (URL.canParse(textSource)) {
    const baseText = await getWebText(textSource);
    const machine = new MarkovMachine(baseText);
    console.log(machine.getText());
  }
  else {
    const baseText = await getFileText(textSource);
    const machine = new MarkovMachine(baseText);
    console.log(machine.getText());
  }
}

main(argv[2]);