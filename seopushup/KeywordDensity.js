const axios = require('axios');
const cheerio = require("cheerio");
const returnValue=[];

// Function to fetch HTML content from a URL
async function fetchHTML(url) {
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Function to analyze webpage and calculate keyword density
async function keywordDensityChecker(url, phrase) {
  const html = await fetchHTML(url);
  if (!html) return;

  const $ = cheerio.load(html);
  $('*[style*="display: none"]').remove();
  let text =
    $("p").text() +
    $("h1").text() +
    $("h2").text() +
    $("h3").text() +
    $("h4").text() +
    $("h5").text() +
    $("h6").text() +
    $("li").text(); 
  // console.log(text);
  text = text.toLowerCase();
  // console.log(text.length);
  const fillerWordsRegex = new RegExp(
    `(?:\\b(?:${fillerWords.join("|")})\\b|[\\/,<\\[\\{\\}\\]>?|\\\\$#@!%^*()+=\\-_{2}])|\\s+`,
    "gi",
  );

  // Removing filler words, special characters, and spaces
  const filteredText = text.replace(fillerWordsRegex, " ").trim();

  let wordarray = convertToArray(filteredText);

  let freq = matchPhrase(text, phrase);
  // console.log(`Frequency of ${phrase} is ${freq}`);
  let density = ((freq / wordarray.length) * 100).toFixed(2);
  // console.log(density + "%");
  return { frequency:freq, density}; // Here we are returning the freq and density of the phrase
}


// const url ='https://www.coursera.org/in/articles/what-does-a-data-analyst-do-a-career-guide';
// const keyword = "learning";
// const phrase = "machine learning";
// async function run(url, keyword){
//   let obj= await analyzeWebpage(url, '', keyword);
//   console.log(obj);
// }
// run(url, phrase);
const fillerWords = [
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "of",
  "to",
  "in",
  "on",
  "at",
  "with",
  "by",
  "as",
  "from",
  "is",
  "are",
  "am",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "can",
  "could",
  "will",
  "would",
  "shall",
  "should",
  "might",
  "must",
  "may",
  "there",
  "here",
  "it",
  "its",
  "they",
  "them",
  "their",
  "that",
  "those",
  "this",
  "these",
  "we",
  "us",
  "our",
  "you",
  "your",
  "he",
  "him",
  "his",
  "she",
  "her",
  "hers",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "themselves",
  "my",
  "mine",
  "me",
  "i",
  "we",
  "us",
  "our",
  "you",
  "your",
  "yours",
  "you",
  "your",
  "yours",
  "he",
  "him",
  "his",
  "she",
  "her",
  "hers",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "whose",
  "where",
  "when",
  "why",
  "how",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
  "d",
  "ll",
  "m",
  "o",
  "re",
  "ve",
  "y",
  "ain",
  "aren",
  "couldn",
  "didn",
  "doesn",
  "hadn",
  "hasn",
  "haven",
  "isn",
  "ma",
  "mightn",
  "mustn",
  "needn",
  "shan",
  "shouldn",
  "wasn",
  "weren",
  "won",
  "wouldn",
];
function convertToArray(text) {
  let wordarray = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] == " ") {
      continue;
    } else {
      let str = "";
      while (i < text.length && text[i] != " ") {
        str = str + text[i];
        i++;
      }
      wordarray.push(str);
    }
  }
  return wordarray;
}

function matchPhrase(text, phrase) {
  phrase = phrase.toLowerCase();
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] == phrase[0]) {
      let index = i;
      let isfound = true;
      for (let j = 0; j < phrase.length; j++) {
        if (index >= text.length || text[index] != phrase[j]) {
          isfound = false;
          break;
        }
        index++;
      }
      if (isfound) {
        count++;
      }
    }
  }
  return count;
}
module.exports= keywordDensityChecker;