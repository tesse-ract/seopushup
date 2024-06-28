const axios = require("axios");
const cheerio = require("cheerio");

const returnValue=[];


// Function to fetch the HTML content of a web page
async function fetchHTML(url) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`Error fetching HTML from ${url}:`, error);
        return null;
    }
}

async function calculateTextToHTMLRatioChecker(url) {
    const htmlContent = await fetchHTML(url);
    if (!htmlContent) {
        return;
    }
    const $ = cheerio.load(htmlContent);
    $('*[style*="display: none"]').remove();
    const textContent =
        $("p").text() +
        $("h1").text() +
        $("h2").text() +
        $("h3").text() +
        $("h4").text() +
        $("h5").text() +
        $("h6").text() +
        $("li").text();

    const htmlLength = htmlContent.length;
    const textLength = textContent.length;
    const ratio = (textLength / htmlLength) * 100;
    return {htmlLength, textLength, ratio};
}
module.exports= calculateTextToHTMLRatioChecker;
