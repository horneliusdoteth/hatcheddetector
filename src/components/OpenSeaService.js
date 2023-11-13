import axios from "axios";

export const fetchFloorPrice = async (
  collectionSlug
) => {
  try {
    const response = await axios.get(
      `https://jxl9d8011k.execute-api.us-east-1.amazonaws.com/floor-price/${collectionSlug}`
    );
    console.log("API response:", response.data);
    return response.data.floorPrice;
  } catch (error) {
    console.error(
      "Error fetching floor price:",
      error
    );
    return null;
  }
};
