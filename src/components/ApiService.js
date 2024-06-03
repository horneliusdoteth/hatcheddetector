export const fetchFloorPrice = async (collectionSlug) => {
  try {
    const response = await fetch(`https://jxl9d8011k.execute-api.us-east-1.amazonaws.com/floor-price/${collectionSlug}`);
    
    if (!response.ok) { 
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error fetching floor price:", error);
    return null;
  }
};