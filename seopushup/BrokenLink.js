const axios = require("axios");
const cheerio = require("cheerio");
const { link } = require("fs");
const axiosRetry= require('axios-retry').default;
axiosRetry(axios, {
    retries: 20, // Number of retries
    retryDelay: (retryCount) => {
      return axiosRetry.exponentialDelay(retryCount);
    },
    retryCondition: (error) => {
      return error.response && error.response.status === 503; // Retry only on 503 status
    },
  });
async function checkLink(url) {
    try {
        const response = await axios.get(url);
        return {
            url: url,
            status: response.status,
        };
    } catch (error) {
        return {
            url: url,
            status: "Error",
            error: error.message,
        };
    }
}

async function BrokenLinkChecker(pageUrl) {
    try {
        const response = await axios.get(pageUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        const links = [];
        const anchortext=[];
        $('a').each((index, element) => {
            const anchorText = $(element).text();
            anchortext.push(anchorText);
        });
        $("a").each((_, element) => {
            const href = $(element).attr("href");
            if (href && !href.startsWith("#")) {
                links.push(href);
            }
        });
        let faultLinks=[];
        const linkStatusPromises = links.map((link) => checkLink(link));
        const linkStatuses = await Promise.all(linkStatusPromises);

        // console.log(`Checked links on page: ${pageUrl}`);
        // linkStatuses.forEach((linkStatus) => {
        //     // console.log(linkStatus.status);
        //     if (linkStatus.status === 200) {
        //         // console.log(`OK: ${linkStatus.url}`);
        //     } else if (linkStatus.status >= 400 && linkStatus.status <= 511 && checkHttp(linkStatus.url)) {
        //         // console.log(
        //         //     `BROKEN: ${linkStatus.url} - Status: ${linkStatus.status} ${linkStatus.error ? "- Error: " + linkStatus.error : ""}`,
        //         // );
        //         let linkObject={blink:linkStatus.url, statusCode:linkStatus.status};
        //         faultLinks.push(linkObject);
        //     }
        //     if(linkStatus.status=='Error' && checkHttp(linkStatus.url)){
        //         // console.log(
        //         //     `BROKEN: ${linkStatus.url} - Status: ${linkStatus.status} ${linkStatus.error ? "- Error: " + linkStatus.error : ""}`,
        //         // );
        //         let linkObject={Faultylink:linkStatus.url};
        //         faultLinks.push(linkObject);
        //     }
        // });

        for(let i=0; i<linkStatuses.length; i++){
            let linkStatus= linkStatuses[i];
            if (linkStatus.status === 200) {
                // console.log(`OK: ${linkStatus.url}`);
            } 
            else if (linkStatus.status >= 400 && linkStatus.status <= 511 && checkHttp(linkStatus.url)) {
                let linkObject={anchortext:anchortext[i], Url:linkStatus.url};
                faultLinks.push(linkObject);
            }
            if(linkStatus.status=='Error' && checkHttp(linkStatus.url)){
                // console.log(
                //     `BROKEN: ${linkStatus.url} - Status: ${linkStatus.status} ${linkStatus.error ? "- Error: " + linkStatus.error : ""}`,
                // );
                let linkObject={anchorText: anchortext[i], Url: linkStatus.url};
                faultLinks.push(linkObject);
            }
        }
        // console.log(faultLinks);
        return faultLinks;
    } catch (error) {
        console.error(`Error fetching the page: ${pageUrl}`, error.message);
        return [];
    }
}
function checkHttp(url){
    if(url[0]=='h' && url[1]=='t' && url[2]=='t' && url[3]=='p'){
        return true;
    }
    return false;
}
// async function BrokenLinkInOneText(url){
//     let faultLinks= await  checkLinksOnPage(url);
//     let text='';
//     for(let i=0; i<faultLinks.length; i++){
//         text= text + faultLinks[i].blink;
//         text = text + " ";
//         text= text + faultLinks[i].statusCode
//         text = text + '/n';
//     }
//     console.log(text);
//     return {text: text};
// }
// let url='https://www.adpushup.com/blog/best-native-ad-networks/';
// async function run(url){
//     let obj= await BrokenLinkChecker(url);
//     console.log(obj);
// }
// run(url);
let url='https://www.coursera.org/in/articles/what-does-a-data-analyst-do-a-career-guide';
module.exports= BrokenLinkChecker;
