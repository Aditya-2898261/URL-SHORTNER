import {isbot} from "isbot";

const isBotUserAgent = (userAgent) => {
    if(!userAgent){
        return null;
    }

    return isbot(userAgent);
};

export {isBotUserAgent};