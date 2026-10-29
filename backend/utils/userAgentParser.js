import Bowser from "bowser";

const parseUserAgent = (userAgent) => {
    if(!userAgent){
        return{
            browser: null,
            os: null,
            device: null
        };
    }

    const parser = Bowser.getParser(userAgent);

    const browser = parser.getBrowser();
    const os = parser.getOS();
    const platform = parser.getPlatform();

    return{
        browser: browser.name ?? null,
        os: os.name ?? null,
        device: platform.type ?? null
    };
};

export {parseUserAgent};