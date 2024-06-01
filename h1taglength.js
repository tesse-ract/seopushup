const axios = require('axios');
const cheerio = require('cheerio');
async function getFirstH1Tag(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const firstH1 = $('h1').first().text();
        // Optimum length for h1 tag is 60 chars
        let checkH1length= firstH1.length<=60;
        return {firstH1, checkH1length};
    } catch (error) {
        console.error('Error fetching the page:', error);
        return null;
    }
}
// let url='https://www.geeksforgeeks.org/web-technology/?ref=shm';
// async function run(url){
//     try{
//         let obj= await getFirstH1Tag(url);
//         console.log(obj);
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// run(url);
module.exports= getFirstH1Tag;
