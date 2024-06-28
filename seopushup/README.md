
## Acknowledgements

 - A simple tool to manage on page SEO in node js


## Authors

- Ujval Gupta



## FAQ

#### What is the package?

This package is an npm tool designed to check and analyze on-page SEO for web pages, providing insights and recommendations to improve SEO performance.

#### What kind of SEO checks does this package perform?

This package performs a variety of on-page SEO checks including:
- Checking Page Speed insights
- Checking h1 and alt tags
- Getting keyword density for a web page
- Checking Meta Description
- Calculating text to HTML ratio 
- Checking title of the web page
- Checking for Broken Links
- Calculating word count for the web page 


## Features

- Provides Fast checking for attributes like FCP, LCP and TFIB for the web page
- Advance keyword matching with different tags
- Gives responses about various external links on the web page
## Feedback

If you have any feedback, please reach out to us at codewithujval@gmail.com


## Installation

Install my-project with npm

```bash
  npm install seopushup
```

## Tech Stack

Node js


# Description

A SEO tool that analyzes on page SEO and gives various results based on that


## Usage/Examples

```javascript
const seopushup= require('seopushup');

```

```javascript
async function run(url){
    const obj= await seopushup.ProtocolChecker(url);
    console.log(obj);
}
run(url);
```
```javascript
async function run(url){
    const obj= await seopushup.pageSpeedInsightsChecker(url);
    console.log(obj);
}
run(url);
```
```javascript
async function run(url, keyword){
    const obj= await seopushup.keywordDensityChecker(url, keyword);
    console.log(obj);
}
run(url, keyword);
```
```javascript
async function run(url, keyword){
    const obj= await seopushup.h1Checker(url, keyword);
    console.log(obj);
}
run(url, keyword);
```
```javascript
async function run(url, keyword){
    const obj= await seopushup.MetaDescriptionChecker(url, keyword);
    console.log(obj);
}
run(url, keyword);
```
```javascript
async function run(url){
    const obj= await seopushup.calculateTextToHTMLRatioChecker(url);
    console.log(obj);
}
run(url);
```
```javascript
async function run(url, keyword){
    const obj= await seopushup.UrlChecker(url, keyword);
    console.log(obj);
}
run(url, keyword);
```
```javascript
async function run(url){
    const obj= await seopushup.wordCountChecker(url);
    console.log(obj);
}
run(url);
```
```javascript
async function run(url){
    const obj= await seopushup.BrokenLinkChecker(url);
    console.log(obj);
}
run(url);
```
```javascript
async function run(url, keyword){
    const obj= await seopushup.imgAltChecker(url, keyword);
    console.log(obj);
}
run(url, keyword);
```
```javascript
async function run(url, keyword){
    const obj= await seopushup.pageTitleChecker(url, keyword);
    console.log(obj);
}
run(url, keyword);
```

```javascript
seopushup.CSVOutput(pathToCSVFile);
```