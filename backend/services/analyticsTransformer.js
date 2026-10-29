
const normalizeGeoValue = (value) =>{
    if(!value || value === "-"){
        return null;
    }
    return value;
}

const transformAnalytics = (enrichedData) => {
    const {
        eventId,
        shortCode,
        timestamp,
        location,
        browser,
        os,
        device,
        isBot,
        referrer,
        query
    } = enrichedData;

    return{
        _id: eventId,
        shortCode,
        clickedAt: new Date(timestamp),

        country: normalizeGeoValue(location?.country),
        countryCode: normalizeGeoValue(location?.countryCode),
        region: normalizeGeoValue(location?.region),
        city: normalizeGeoValue(location?.city),

        browser: browser ?? null,
        os: os ?? null,
        device: device ?? null,
        isBot,

        referrer: referrer ?? null,

        utmSource: query?.utm_source ?? null,
        utmMedium: query?.utm_medium ?? null,
        utmCampaign: query?.utm_campaign ?? null,
        utmTerm: query?.utm_term ?? null,
        utmContent: query?.utm_content ?? null
    };
};

export {transformAnalytics};