const extractFacetParam = (
  url: string,
  paramStartsWith: string
): { decodedFacetKey: string; decodedFacetValue: string } | null => {
  try {
    // Remove the leading '?' if present
    const query = url.startsWith("?") ? url.slice(1) : url;
    // Split the query string into individual parameters
    const params = query.split("&");

    for (const param of params) {
      // Look for the facet parameter which starts with 'f.'
      if (param.startsWith(`f.${paramStartsWith}`)) {
        const [facetKey, facetValue] = param.split("=");
        if (facetKey && facetValue) {
          const decodedFacetKey = decodeURIComponent(facetKey);
          const decodedFacetValue = decodeURIComponent(facetValue);
          return {
            decodedFacetKey,
            decodedFacetValue,
          };
        }
      }
    }

    return null;
  } catch (error) {
    console.warn(`Error in extractFacetParam: ${error}`);
    throw error;
  }
};

export default extractFacetParam;
