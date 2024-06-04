const axios = require("axios");
const cheerio = require("cheerio");

async function fetchAlt(url) {
    try {
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const altTags = [];
        $("img").each((index, element) => {
            const altText = $(element).attr("alt");
            if (altText) {
                altTags.push(altText);
            }
        });

        return altTags;
    } catch (error) {
        console.error(`Error fetching the page: ${error}`);
        return [];
    }
}
async function getUrlforImg(url){
    const {data}= await axios.get(url);
    const $= cheerio.load(data);
    const imgElements= $('img');
    const imgUrls=[];
    imgElements.each((index, element)=>{
        const imgUrl= $(element).attr('src');
        if(imgUrl){
            imgUrls.push(imgUrl);
        }
    })
    return imgUrls;
}
const url = "https://www.coursera.org/in/articles/what-does-a-data-analyst-do-a-career-guide";
const keyword = "data analyst";
async function  imgAltChecker(url, keyword) {
    let alttags = await fetchAlt(url);
    keyword = keyword.toLowerCase();
    let checkLengthForEach = [];
    // console.log(alttags);
    let keywordMatch=[];
    let imgUrls= await getUrlforImg(url);
    for (let i = 0; i < alttags.length; i++) {
        let alt = alttags[i];
        let check= false;
        alt = alt.toLowerCase();
        if (alt.length > 125) {
            checkLengthForEach.push({isBadLength: true, alt:alt, length: alt.length});
        } else {
            checkLengthForEach.push({isBadLength: false, alt:alt, length:alt.length});
        }
        for (let j = 0; j < alt.length; j++) {
            if (alt[j] == keyword[0]) {
                let flag = true;
                let index = j;
                for (let k = 0; k < keyword.length; k++) {
                    if (index < alt.length && alt[index] != keyword[k]) {
                        flag = false;
                        break;
                    } else if (index >= alt.length) {
                        flag = false;
                        break;
                    }
                    index++;
                }

                if (flag == true) {
                    check = true;
                }
            }
        }
        keywordMatch.push(check);
    }
    let returnValue=[];
    for(let i=0; i<imgUrls.length; i++){
        const obj= {imgUrl:imgUrls[i], altText: checkLengthForEach[i].alt, isKeywordFound: keywordMatch[i],length:checkLengthForEach[i].length };
        returnValue.push(obj);
    }
    console.log(returnValue);
    return returnValue;
}

module.exports= imgAltChecker;

