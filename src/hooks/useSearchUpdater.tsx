import { useEffect } from "react";
import { useDataState, useDataDispatch } from "../context/DataState";
import buildQueryUrl from "../helpers/buildQueryUrl";
import fetchData from "../helpers/fetchData";

const useSearchUpdater = () => {
  const { fbConfig, selectedFacets, startRank, query } = useDataState();
  const dispatch = useDataDispatch();

  useEffect(() => {
    if (!fbConfig.collection) return;

    const fetchAndUpdate = async () => {
      dispatch({ type: "setNetworkRequest", inProgress: true, error: "" });

      try {
        const freshQuery = buildQueryUrl(fbConfig.searchUrl, {
          fbConfig,
          selectedFacets,
          startRank,
          query,
        });

        const { results, currentStart, nextStart, totalResults } =
          await fetchData(freshQuery);

        dispatch({ type: "setResults", results });
        dispatch({
          type: "setPagination",
          currentStart,
          nextStart,
          totalResults,
        });
      } catch (error) {
        console.error("Fetch error: ", error);
        dispatch({ type: "setNetworkRequest", error, inProgress: false });
      } finally {
        dispatch({ type: "setNetworkRequest", inProgress: false, error: "" });
      }
    };

    fetchAndUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFacets, startRank, query, fbConfig]);
};

export default useSearchUpdater;
