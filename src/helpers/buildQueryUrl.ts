interface QueryUrl {
  fbConfig: {
    searchUrl: string;
    suggestUrl: string;
    collection: string;
    defaultQuery: string;
    profile: string;
    numRanks: string;
    defaultSort: string;
  };
  query?: string;
  startRank?: string;
  selectedFacets?: Array<{
    facetKey: string;
    facetValue: string;
  }>;
}

const buildQueryUrl = (
  url: string,
  {
    fbConfig: { collection, defaultQuery, profile, numRanks, defaultSort },
    query,
    startRank,
    selectedFacets,
  }: QueryUrl
) => {
  const params = new URLSearchParams();

  // Always add required parameters
  params.set("collection", collection);
  params.set("profile", profile);
  params.set("num_ranks", numRanks);

  // Conditionally add optional parameters
  if (defaultSort) {
    params.set("sort", defaultSort);
  }
  if (startRank) {
    params.set("start_rank", startRank);
  }
  // Use query if provided; otherwise, fall back to the default query.
  params.set("query", query || defaultQuery);

  // Add facets if any exist from the array
  if (selectedFacets && selectedFacets.length > 0) {
    selectedFacets.forEach(({ facetKey, facetValue }) => {
      params.append(facetKey, facetValue);
    });
  }

  let queryString = params.toString();
  // Replace '%2B' with '+'
  // Needed to make faceted queries run.
  queryString = queryString.replace(/%2B/g, "+");

  return `${url}?${queryString}`;
};

export default buildQueryUrl;
