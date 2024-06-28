const axios = require("axios");
const cheerio = require("cheerio");
const returnValue=[];

async function getDescription(url) {
  try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const description = $("meta[name='description']").attr("content");
      return description;
  } catch (error) {
      return '';
  }
}
async function MetaDescriptionChecker(url, keyword) {
    let description = await getDescription(url);
    if(description==undefined){
        description='';
    }
    description = description.toLowerCase();
    keyword = keyword.toLowerCase();
    let check = false;
    for (let i = 0; i < description.length; i++) {
        if (description[i] == keyword[0]) {
            let flag = true;
            let index = i;
            for (let j = 0; j < keyword.length; j++) {
                if (index < description.length && description[index] != keyword[j]) {
                    flag = false;
                    break;
                } else if (index >= description.length) {
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
   
    return { isKeywordFoundinMetaDescription:check, MetaDescription:description , metaDescriptionLength: description.length};
}
module.exports= MetaDescriptionChecker;

