const axios = require('axios');
const cheerio = require('cheerio');
async function wordCountChecker(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const bodyText = $('p').text() + $('h1').text() + $('h2').text() +  $('h3').text() + $('h4').text() + $('h5').text() + $('h6').text() + $('li').text();
        const words = bodyText.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        return {wordCount}
    } catch (error) {
        console.error('Error fetching the page:', error);
        return undefined;
    }
}
module.exports= wordCountChecker;
