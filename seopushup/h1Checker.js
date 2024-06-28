const axios = require("axios");
const cheerio = require("cheerio");
async function fetchH1tag(url) {
    try {
        // Fetch the HTML of the webpage
        const { data } = await axios.get(url);

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Extract the title
        const heading = $("h1").text();

        // Print the title
       
        return heading;
    } catch (error) {
        console.error("Error fetching the title:", error.message);
        return null;
    }
}
async function h1Checker(url, keyword) {
    let h1 = await fetchH1tag(url);
    if(h1=='' || h1==' ' || h1==null || h1==undefined){
        return { isKeywordFoundinh1: false, h1: undefined, h1length: 0};
    }
    let length= h1.length;
    h1 = h1.toLowerCase();
    h1= removeHyphen(h1);
    keyword = keyword.toLowerCase();
    let check = false;
    for (let i = 0; i < h1.length; i++) {
        if (h1[i] == keyword[0]) {
            let flag = true;
            let index = i;
            for (let j = 0; j < keyword.length; j++) {
                if (index < h1.length && h1[index] != keyword[j]) {
                    flag = false;
                    break;
                } else if (index >= h1.length) {
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
    return {isKeywordFoundinh1: check, h1: h1, h1length: length};
}
function removeHyphen(str){
    let temp='';
    for(let i=0; i<str.length; i++){
        if(str[i]!='-'){
            temp= temp + str[i];
        }
        else{
            temp= temp + ' ';
        }
    }
    return temp;
}
module.exports= h1Checker;