async function UrlChecker(url, keyword){
    url= url.toLowerCase();
    keyword= keyword.toLowerCase();
    url= removeHyphen(url);
    let check= false;
    for(let i=0; i<url.length; i++){
        if(url[i]==keyword[0]){
            let flag= true;
            let index=i;
            for(let j=0; j<keyword.length; j++){
                if(index>=url.length || url[index]!=keyword[j]){
                    flag= false;
                    break;
                }
                index++;
            }
            if(flag== true){
                check= true;
                break;
            }
        }
    }
    return {isKeywordFoundinUrl: check};
}
function removeHyphen(url){
    let temp='';
    for(let i=0; i<url.length; i++){
        if(url[i]!='-'){
            temp= temp + url[i];
        }
        else{
            temp= temp + ' '; 
        }
    }
    return temp;
}
module.exports= UrlChecker;