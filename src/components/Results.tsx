import { useDataState } from "../context/DataState";
import NoResults from "./NoResults";
import ResultsLoading from "./ResultsLoading";
import Result from "./atoms/Result";

export interface Result {
  listMetadata: {
    assetId: string[];
    d: string[];
    c: string[];
    imageAlt?: string[];
    animalType: string[];
    locationFound: string[];
    imageUrl: string[];
  };
  liveUrl: string;
  title: string;
}

const Results = () => {
  const {
    results,
    networkRquestInProgress: { inProgress },
  } = useDataState();

  return inProgress ? (
    <ResultsLoading />
  ) : (
    <section className="search__results">
      <ul className="">
        {results && results.length > 0 ? (
          results.map((result: Result) => <Result result={result} />)
        ) : (
          <NoResults />
        )}
      </ul>
    </section>
  );
};

export default Results;
