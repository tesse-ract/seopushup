async function ProtocolChecker(url){
    let check= url[4]=='s';
    let protocol;
    if(check== true){
        protocol= 'HTTPS'
    }
    else{
        protocol= 'HTTP';
    }
    return protocol;
}
module.exports= ProtocolChecker;