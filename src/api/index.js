import axios from 'axios'; //library to make api calls

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

//note the use of `` and $ for a dynamic string
export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '1d5e2fc23emsh6a2f4cbbfe989a3p135befjsndaac2a91652a'
            }
          });

        return data;
    } catch(error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
        params: {
          lat: lat,
          lon: lng
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '1d5e2fc23emsh6a2f4cbbfe989a3p135befjsndaac2a91652a'
        }
    })
    return data;
  } catch(error) {
    console.log(error)
  }
}