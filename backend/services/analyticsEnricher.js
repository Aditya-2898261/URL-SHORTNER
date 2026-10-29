import { parseUserAgent } from "../utils/userAgentParser.js";
import { isBotUserAgent } from "../utils/botDetector.js";
import { getGeoLocation } from "./geoLocationService.js";

const enrichClickEvent = async (clickEvent) => {

    const userAgentInfo = parseUserAgent(clickEvent.userAgent);
    const isBot = isBotUserAgent(clickEvent.userAgent);
    const location = await getGeoLocation(clickEvent.ip);

    return {
        ...clickEvent,
        ...userAgentInfo,
        isBot,
        location
    };
};

export {enrichClickEvent};