const fs = require("fs");

const { Trie } = require("./trie");

const trie = new Trie();

const { performance } = require('perf_hooks');

/**
 * To check if the word is a concatenation of small words
 *
 * @param {String} word - word to check
 */


var startTime = performance.now();


const prefixChecker = (word) => {
  let idx = 1;

  while (idx <= word.length) {
    const length = trie.find(word.substr(0, idx)).length;

    if (!(length > 1) && idx === 1) {
      return false;
    } else if (!(length > 1)) {
      // recursive call to prefixChecker
      return prefixChecker(word.substr(idx - 1, word.length));
    } else {
      idx++;
    }
  }
  return true;
};

/**
 * To find the longest string in the array
 *
 * @param {Array} arr - array of text
 */
const findLongestString = (arr) => {
  let longestString = arr.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });
  return longestString;
};

/**
 * Main function to search concatenation words
 *
 * @param {String} fileName - name of the text file
 * @param {Number} noOfResults - number of results
 */
const searchConcatWords = (fileName, noOfResults) => {
  const res = [];

  const text = fs.readFileSync(fileName, "utf-8").split("\r\n");

  // Insertion into the trie
  text.forEach((item) => {
    trie.insert(item);
  });

  //To find LongestConcatStrings
  while (noOfResults) {
    let longestStrings = findLongestString(text);
    text.splice(text.indexOf(longestStrings), 1);

    if (prefixChecker(longestStrings)) {
      res.push(longestStrings);
      noOfResults--;
    }
  }

  return res;
};

//Showing the results

const result1 = searchConcatWords("./Input_01.txt", 2);

console.log("First Longest :" +result1[0], "\n");
console.log("Second Longest :" +result1[1], "\n");

const result2 = searchConcatWords("./Input_02.txt", 2);

console.log("First Longest :" +result2[0], "\n");
console.log("Second Longest :" +result2[1], "\n");


var endTime = performance.now()

console.log(`Total Time to execute Script : ${endTime - startTime} milliseconds`)