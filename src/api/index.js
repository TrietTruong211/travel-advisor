import axios from 'axios'; //library to make api calls

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';



export const getPlacesData = async (sw, ne) => {
    try {
        const { data: {data}} = await axios.get(URL, {
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