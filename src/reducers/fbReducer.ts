import { DataStateTyping } from "../context/DataStateTyping";

/* eslint-disable @typescript-eslint/no-explicit-any */
const dataStateReducer = (state: DataStateTyping, action: any) => {
  switch (action.type) {
    case "setInitialData":
      return {
        ...state,
        fbConfig: { ...state.fbConfig, ...action.fbConfig },
        selectors: action.selectors,
        templates: action.templates,
      };
    case "setQuery":
      return { ...state, query: action.query };
    case "setResults":
      return {
        ...state,
        results: action.results,
      };
    case "setStartRank":
      return {
        ...state,
        startRank: action.startRank,
      };
    case "setNetworkRequest":
      return {
        ...state,
        networkRequest: {
          ...state.networkRequest,
          error: action.error,
          inProgress: action.inProgress,
        },
      };
    case "setPagination":
      return {
        ...state,
        currentStart: action.currentStart,
        nextStart: action.nextStart,
        totalResults: action.totalResults,
        fbRequestInProgress: false,
      };
    case "resetState":
      return { ...action.initialState };
    case "clearData":
      return {
        ...state,
        query: "",
        results: [],
        totalResults: "",
      };
    case "setFacets": {
      const { facetData } = action;
      return {
        ...state,
        facets: [...facetData],
      };
    }
    case "setCheckedFacet": {
      const { facetKey, facetValue, facetType } = action;
      return {
        ...state,
        selectedFacets: [
          ...state.selectedFacets,
          { facetKey, facetValue, facetType },
        ],
      };
    }
    case "removeCheckedFacet": {
      const { facetKey } = action;
      const updatedFacets = state.selectedFacets.filter(
        (facet: any) => facet.facetKey !== facetKey
      );
      return {
        ...state,
        selectedFacets: [...updatedFacets],
      };
    }
    case "updateSelectFacet": {
      const { facetKey, facetValue, facetType } = action;
      const selectObj = state.selectedFacets.find(
        (facet: any) => facet.facetType === facetType
      );

      if (selectObj) {
        return {
          ...state,
          selectedFacets: state.selectedFacets.map((facet) =>
            facet.facetType === facetType ? { ...facet, facetValue } : facet
          ),
        };
      } else {
        return {
          ...state,
          selectedFacets: [
            ...state.selectedFacets,
            { facetKey, facetValue, facetType },
          ],
        };
      }
    }
    case "clearAllSelectedFacets": {
      return {
        ...state,
        selectedFacets: [],
      };
    }
    case "setFavourites": {
      const { favourites } = action;
      return {
        ...state,
        favourites: [...favourites],
      };
    }
    case "addFavourite": {
      const { key, data } = action;
      return {
        ...state,
        favourites: [...state.favourites, { key, data }],
      };
    }
    case "removeFavourite": {
      const { key } = action;
      const updatedFavs = state.favourites.filter(
        (fav: any) => fav.key !== key
      );
      return {
        ...state,
        favourites: [...updatedFavs],
      };
    }
    case "clearAllFavourites":
      return { ...state, favourites: [] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default dataStateReducer;
