/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DataStateTyping {
  fbConfig: {
    searchUrl: string;
    suggestUrl: string;
    collection: string;
    profile: string;
    numRanks: string;
    defaultSort: string;
    defaultQuery: string;
    additionalParams: Array<Record<string, string>>;
  };
  selectors: {
    search: {
      parentNode: string;
      autocomplete?: {
        handleSubmit: string;
        handleClear: string;
        form: string;
        wrapper: string;
        suggestions?: string;
      };
      manual?: any;
    };
    totalResults: {
      parentNode: string;
    };
    facets: {
      parentNode: string;
      wrapper: string;
    };
    results: {
      parentNode: string;
      ulClassName: string;
    };
    pagination: { parentNode: string };
    noResults?: { className?: string };
    sort?: any;
  };
  templates: {
    facets: Array<{
      name: string;
      type: string;
      options: any;
      displayLabel: string;
    }>;
    results: { content: (result: any, getMeta: any) => string };
    noResults: { content: () => string };
    totalResults?: { className?: string };
    search: {
      type: string;
      autocomplete?: {
        title: string;
        inputElement: {
          className: string;
          name: string;
          placeholder: string;
          title: string;
        };
        muiProps: any;
        submitBtnText: string;
        clearBtnText: string;
      };
      manual?: {
        content: () => string | undefined;
      };
    };
    sort?: { content: () => string | undefined };
    // A plain object for pagination-related templates and/or props.
    pagination: {
      muiProps: { [key: string]: any };
    };
    skeleton: {
      variant: "text" | "rectangular" | "rounded" | "circular";
      width: number | string;
      height: number | string;
      animation: false | "pulse" | "wave";
    };
  };
  results?: Array<{
    listMetadata: Record<string, []>;
    liveUrl: string;
    title: string;
  }>;
  networkRequest: { error: string; inProgress: boolean };
  currentStart: number;
  nextStart: number | null;
  totalResults: number;
  query?: string;
  facets?: Array<{
    allValues: Array<{
      label: string;
      count: number;
      data: string;
      selected: boolean;
      toggleUrl: string;
    }>;
    name: string;
    order: Array<string>;
    selected: boolean;
    selectionType: string;
    unselectAllUrl: string;
  }>;
  selectedFacets: Array<{
    facetKey: string;
    facetValue: string;
    facetType: string;
  }>;
  startRank: string;
  favourites: Array<{
    data: any;
    key: string;
  }>;
  favouriteKeys: Array<string>;
  sort: string;
}
