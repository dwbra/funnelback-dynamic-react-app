/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from "react";
import funnelbackReducer from "../reducers/fbReducer";
import { DataStateTyping } from "./DataStateTyping";
import defaultState from "./defaultState";

// Correctly type contexts
const DataStateContext = createContext<DataStateTyping | undefined>(undefined);
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

const useDataState = (): DataStateTyping => {
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
