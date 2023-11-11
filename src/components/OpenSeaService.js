import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENSEA_API_KEY;

export const fetchFloorPrice = async (collectionSlug) => {
    try {
        const response = await axios.get(`https://api.opensea.io/api/v1/collection/${collectionSlug}/stats`, {
          headers: {
            'X-API-KEY': apiKey
          }
        });
        return response.data.stats.floor_price;
      } catch (error) {
        console.error('Error fetching floor price:', error);
        return null;
      }
};