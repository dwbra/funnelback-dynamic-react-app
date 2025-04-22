import { useEffect } from "react";
import Search from "./components/Search";
import { useDataDispatch, useDataState } from "./context/DataState";
import buildQueryUrl from "./helpers/buildQueryUrl";
import fetchData from "./helpers/fetchData";
import "./styles/main.scss";
import useSearchUpdater from "./hooks/useSearchUpdater";
import TotalResults from "./components/TotalResults";
import Facets from "./components/Facets";
import Results from "./components/Results";
import Pagination from "./components/Pagination";
import Sort from "./components/Sort";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ fbConfig, templates, selectors }: any) {
  const { favouriteKeys } = useDataState();
  const dispatch = useDataDispatch();
  useSearchUpdater();

  // Set configs always on initial render
  useEffect(() => {
    dispatch({
      type: "setInitialData",
      fbConfig,
      templates,
      selectors,
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

  return (
    <>
      <Search />
      <TotalResults />
      <Facets />
      <Results />
      <Pagination />
      <Sort />
    </>
  );
}

export default App;
