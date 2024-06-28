const imgAltChecker= require('./imgAltChecker.js');
async function altTagKeywordChecker(url, keyword){
    let altObj=  await imgAltChecker(url, keyword);
    let returnValue=[];
    for(let i=0; i<altObj.length; i++){
        if(altObj[i].isKeywordFound== false){
            let obj= {imgUrl:altObj[i].imgUrl,  altText: altObj[i].altText};
        returnValue.push(obj);
        }
    }
    return returnValue;
}
module.exports= altTagKeywordChecker;