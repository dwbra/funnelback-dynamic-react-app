/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface DataStateTyping {
  fbConfig: {
    searchUrl: string;
    suggestUrl: string;
    collection: string;
    profile: string;
    numRanks: string;
    defaultSort: string;
    defaultQuery: string;
    scopedFacet: string;
    additionalParams: Array<Record<string, string>>;
  };
  selectors: {
    search: {
      autocomplete?: {
        parentSection: string;
        handleSubmit: string;
        handleClear: string;
        form: string;
        wrapper: string;
        suggestions: string;
      };
      manual?: any;
    };
    noResults: string;
    totalResults: string;
    pagination: string;
    sort?: string;
  };
  templates: {
    results: (result: any, getMeta: any) => ReactNode;
    noResults: () => ReactNode;
    totalResults: (totalResults: number, query: string) => ReactNode;
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
    sort?: (selectedValue: any) => ReactNode;
    // A plain object for pagination-related templates and/or props.
    pagination: {
      className: string;
      muiProps: {
        size: string;
        controls: string[];
        additionals: any[]; // Adjust this type if needed.
      };
    };
    skeleton: {
      variant: string;
      width: number;
      height: number;
      animation: string;
    };
  };
  results?: Array<{
    listMetadata: Record<string, []>;
    liveUrl: string;
    title: string;
  }>;
  networkRquestInProgress: { error: string; inProgress: boolean };
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
}
