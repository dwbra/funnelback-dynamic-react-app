import { useDataState } from "../context/DataState";

const TotalResults = () => {
  const { totalResults, query } = useDataState();
  const stringResult = totalResults?.toString();
  return (
    //Update this to query if you want to hide and only show when query exists in state.
    stringResult && (
      <div className="search__total-results">
        {stringResult} results found: <strong>{query}</strong>
      </div>
    )
  );
};

export default TotalResults;
