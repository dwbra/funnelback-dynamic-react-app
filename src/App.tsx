import { useEffect } from "react";
import Search from "./components/Search";
import { useDataDispatch, useDataState } from "./context/DataState";
import buildQueryUrl from "./helpers/buildQueryUrl";
import fetchData from "./helpers/fetchData";
import "./styles/main.scss";

interface MatrixProps {
  fbConfig: {
    searchUrl: string;
    suggestUrl: string;
    collection: string;
    defaultQuery: string;
    profile: string;
    numRanks: string;
    defaultSort: string;
  };
}

function App({ fbConfig }: MatrixProps) {
  const { favouriteKeys } = useDataState();
  const dispatch = useDataDispatch();

  // Set configs always on initial render
  useEffect(() => {
    dispatch({
      type: "setInitialData",
      fbConfig,
    });

    const initialRequest = async () => {
      const url = buildQueryUrl(fbConfig.searchUrl, { fbConfig });
      const { facets } = await fetchData(url);

      //By setting facets only once in state we ensure toggleUrls are static.
      //This is important to ensure if any placeholders are used to display all
      //that we can determine which to reset selectedFacets on.
      dispatch({
        type: "setFacets",
        facetData: facets || [],
      });
    };

    //If a FB implementation is using favourites, this will automatically
    //detect them from the global state and load them into state for us.
    const setFavourites = () => {
      if (favouriteKeys.length > 0) {
        const favourites = favouriteKeys.map((key: string) => {
          const item = localStorage.getItem(key);
          if (item === null) {
            return;
          }
          const data = JSON.parse(item);
          return { key, data };
        });
        dispatch({
          type: "setFavourites",
          favourites,
        });
      }
    };

    initialRequest();
    setFavourites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Search />;
}

export default App;
