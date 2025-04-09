/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from "react";
import funnelbackReducer from "../reducers/fbReducer";

// Define types for the state
export interface DataState {
  fbConfig: {
    searchUrl: string;
    suggestUrl: string;
    collection: string;
    defaultQuery: string;
    profile: string;
    numRanks: string;
    defaultSort: string;
  };
  results?: Array<{
    listMetadata: {
      assetId: string[];
      d: string[];
      c: string[];
      imageAlt: string[];
      animalType: string[];
      locationFound: string[];
      imageUrl: string[];
    };
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
  facetTypes: Array<string>;
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

// Provide default state
const defaultState: DataState = {
  fbConfig: {
    searchUrl: "",
    suggestUrl: "",
    collection: "",
    profile: "",
    numRanks: "",
    defaultQuery: "",
    defaultSort: "",
  },
  results: [],
  currentStart: 0,
  nextStart: 0,
  totalResults: 0,
  query: "",
  facets: [],
  facetTypes: [],
  selectedFacets: [],
  startRank: "",
  networkRquestInProgress: { error: "", inProgress: false },
  favourites: [],
  favouriteKeys: ["test"],
};

// Correctly type contexts
const DataStateContext = createContext<DataState | undefined>(undefined);
const DataDispatchContext = createContext<Dispatch<any> | undefined>(undefined);

const DataStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(funnelbackReducer, defaultState);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider
        value={(action) => {
          if (action.type === "resetState") {
            dispatch({
              type: "resetState",
              initialState: defaultState,
            });
          } else {
            dispatch(action);
          }
        }}
      >
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataState = (): DataState => {
  const context = useContext(DataStateContext);
  if (!context) {
    throw new Error("useDataState must be used within a DataStateProvider");
  }
  return context;
};

const useDataDispatch = (): Dispatch<any> => {
  const context = useContext(DataDispatchContext);
  if (!context) {
    throw new Error("useDataDispatch must be used within a DataStateProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DataStateProvider, useDataState, useDataDispatch };
