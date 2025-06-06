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
    additionalParams: [],
  },
  selectors: {
    search: { parentNode: "" },
    pagination: { parentNode: "" },
    noResults: {},
    totalResults: { parentNode: "" },
    facets: {
      parentNode: "",
      wrapper: "",
    },
    results: { parentNode: "", ulClassName: "" },
    facetCheckbox: {
      handleChange: ".facet-checkbox-input",
    },
    facetSelect: {
      handleChange: ".facet-select-element",
    },
    facetRadio: {
      handleChange: ".facet-radio-input",
    },
  },
  templates: {
    facets: [],
    results: { content: () => "" },
    result: { content: () => "" },
    noResults: { content: () => "" },
    facetCheckbox: { content: () => "" },
    facetSelect: { content: () => "" },
    facetRadio: { content: () => "" },
    sort: { content: () => "" },
    totalResults: {},
    search: { type: "autocomplete" },
    pagination: {
      muiProps: {},
    },
    skeleton: {
      variant: "text",
      width: 0,
      height: 0,
      animation: false,
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
  networkRequest: { error: "", inProgress: false },
  favourites: [],
  favouriteKeys: ["test"],
  sort: "",
};

export default defaultState;
