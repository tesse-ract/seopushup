const imgAltChecker= require('./imgAltChecker.js');
async function altTagLengthChecker(url, keyword){
    let altObj= await imgAltChecker(url, keyword);
    let returnValue= [];
    for(let i=0; i<altObj.length; i++){
        // Assuming 50 to 125 a good length
        let lengthCheck= (altObj[i].length>=50 && altObj[i].length<=125);
        if(lengthCheck== false){
            let obj= {imgUrl: altObj[i].imgUrl, altText: altObj[i].altText,  length: altObj[i].length, lengthCheck: lengthCheck};
            returnValue.push(obj);
        }
    }
    return returnValue;
}
module.exports= altTagLengthChecker;