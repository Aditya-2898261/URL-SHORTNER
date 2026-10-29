const getGeoLocation = async(ip) => {
    if(!ip){
        return null;
    }

    try{
      const url = new URL("https://api.ip2location.io/");
      url.searchParams.set("ip",ip);
      const apiKey = process.env.IP2LOCATION_API_KEY;
      if(apiKey){
        url.searchParams.set("key",apiKey);
      }

      const response = await fetch(url,{
        signal: AbortSignal.timeout(5000)
      });

      if(!response.ok){
        throw new Error(
            `IP2Location request failed: ${response.status}`
        );
      }

      const data = await response.json();
      return {
            country: data.country_name ?? null,
            countryCode: data.country_code ?? null,
            region: data.region_name ?? null,
            city: data.city_name ?? null
      };

    }catch(error){
      console.error("Geolocation failed: ",error.message);
      return null;
    }
};

export {getGeoLocation};