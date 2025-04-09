import { useDataState } from "../context/DataState";

const NoResults = () => {
  const { query } = useDataState();
  return (
    query && (
      <section className="search__no-results">
        <p>
          There are no results for your search. Please try entering another
          image title.
        </p>
      </section>
    )
  );
};

export default NoResults;
