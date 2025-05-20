/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";

export interface FacetItem {
  count: number;
  data: string;
  label: string;
  selected: boolean;
  toggleUrl: string;
}

interface FacetTemplateData {
  name: string;
  displayLabel: string;
  allValues: FacetItem[];
}

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
    totalResults: { parentNode: string };
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
    facetCheckbox: { handleChange: string };
    facetSelect: { handleChange: string };
    facetRadio: { handleChange: string };
  };

  templates: {
    // Facet templates
    facets: Array<{
      name: string;
      type: string;
      options: any;
      displayLabel: string;
    }>;
    facetCheckbox: {
      content: (args: { facet: FacetTemplateData }) => string;
    };
    facetSelect: {
      content: (args: {
        facet: FacetTemplateData & { selectedValue: string };
      }) => string;
    };
    facetRadio: {
      content: (args: {
        facet: FacetTemplateData & { selectedValue: string };
      }) => string;
    };
    // Result templates
    results: {
      content: (innerHtml: ReactNode) => string;
    };
    result: {
      content: (result: any, getMeta: any) => string;
    };
    noResults: {
      content: () => string;
    };
    totalResults?: { className?: string };

    // Search templates
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

    sort?: {
      content: () => string | undefined;
    };

    // Pagination & skeleton
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
    listMetadata: Record<string, any[]>;
    liveUrl: string;
    title: string;
    rank: number;
  }>;

  networkRequest: {
    error: string;
    inProgress: boolean;
  };

  currentStart: number;
  nextStart: number | null;
  totalResults: number;
  query?: string;

  facets?: Array<{
    allValues: FacetItem[];
    name: string;
    order: string[];
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
  favouriteKeys: string[];

  sort: string;
}
