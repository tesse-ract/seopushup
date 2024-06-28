const axios = require("axios");
const cheerio = require("cheerio");
const returnValue=[];
async function fetchTitle(url) {
    try {
        // Fetch the HTML of the webpage
        const { data } = await axios.get(url);

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Extract the title
        const title = $("title").text();

        
        return title;
    } catch (error) {
        console.error("Error fetching the title:", error.message);
        return null;
    }
}
async function pageTitleChecker(url, keyword) {
    let title = await fetchTitle(url);
    if(title=='' || title==' ' || title==null || title==undefined){
        return {isKeywordFoundinTitle:false, MetaTitle:undefined, metaTitleLength:0};
    }
    title = title.toLowerCase();
    keyword = keyword.toLowerCase();
    let check = false;
    for (let i = 0; i < title.length; i++) {
        if (title[i] == keyword[0]) {
            let flag = true;
            let index = i;
            for (let j = 0; j < keyword.length; j++) {
                if (index < title.length && title[index] != keyword[j]) {
                    flag = false;
                    break;
                } else if (index >= title.length) {
                    flag = false;
                    break;
                }
                index++;
            }
            if (flag == true) {
                check = true;
                break;
            }
        }
    }
   
    return { isKeywordFoundinTitle:check, MetaTitle:title, metaTitleLength:title.length};
}

module.exports= pageTitleChecker;

