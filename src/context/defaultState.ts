import { DataStateTyping } from "./DataStateTyping";

// Provide default state
const defaultState: DataStateTyping = {
  fbConfig: {
    searchUrl: "",
    suggestUrl: "",
    collection: "",
    profile: "",
    numRanks: "",
    defaultQuery: "",
    defaultSort: "",
    scopedFacet: "",
    additionalParams: [],
  },
  selectors: { search: {}, noResults: "", totalResults: "", pagination: "" },
  templates: {
    results: () => null,
    noResults: () => null,
    totalResults: () => null,
    search: { type: "autocomplete" },
    pagination: {
      className: "",
      muiProps: {
        size: "",
        controls: [],
        additionals: [],
      },
    },
    skeleton: {
      variant: "",
      width: 0,
      height: 0,
      animation: "",
    },
  },
  results: [],
  currentStart: 0,
  nextStart: 0,
  totalResults: 0,
  query: "",
  facets: [],
  selectedFacets: [],
  startRank: "",
  networkRquestInProgress: { error: "", inProgress: false },
  favourites: [],
  favouriteKeys: ["test"],
};

export default defaultState;
