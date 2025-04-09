/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, SyntheticEvent } from "react";
import { useDataDispatch, useDataState } from "../context/DataState";
import fetchSuggestions from "../helpers/fetchSuggestions";
import useDebounce from "../hooks/useDebounce";
import Results from "./Results";
import TotalResults from "./TotalResults";
import Pagination from "./Pagination";
import Facets from "./Facets";
import { Autocomplete, TextField } from "@mui/material";
import useSearchUpdater from "../hooks/useSearchUpdater";
import useFavouritesUpdater from "../hooks/useFavouritesUpdater";

const Search = () => {
  const dispatch = useDataDispatch();
  useSearchUpdater();
  useFavouritesUpdater();
  const { fbConfig } = useDataState();
  const [localQuery, setLocalQuery] = useState("");
  const [localSuggestions, setLocalSuggestions] = useState([]);
  const debouncedQuery = useDebounce(localQuery, 300);

  useEffect(() => {
    const fetchLocalSuggestions = async () => {
      const suggestions = await fetchSuggestions(
        `${fbConfig.suggestUrl}?collection=${fbConfig.collection}&profile=${fbConfig.profile}&partial_query=${localQuery}`
      );
      setLocalSuggestions(suggestions);
    };

    // Only call fetch if the debouncedQuery is not empty
    if (debouncedQuery.length > 0) {
      fetchLocalSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleSubmit = (event: SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    dispatch({
      type: "setQuery",
      query: localQuery,
    });
  };

  const handleClear = () => {
    setLocalQuery("");
    dispatch({
      type: "setQuery",
      query: "",
    });
  };

  return (
    <section className="search">
      <h2>Search for a pet:</h2>
      <section className="search__form">
        <form onSubmit={handleSubmit}>
          <div className="">
            <Autocomplete
              options={localSuggestions}
              value={localQuery}
              onInputChange={(
                _event: React.SyntheticEvent,
                value: string,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _reason: string
              ) => {
                setLocalQuery(value);
              }}
              freeSolo
              onClose={() => {
                handleClear();
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    name="search-input"
                    placeholder="Search by title"
                    title="Search Field"
                    className=""
                    id="search-input"
                  />
                </>
              )}
            />
          </div>
        </form>
        <button
          type="submit"
          onClick={handleSubmit}
          className="search__form--submit"
        >
          Submit
        </button>
        <button
          type="button"
          className="search__form--clear"
          onClick={handleClear}
        >
          Clear
        </button>
      </section>
      <TotalResults />
      <Facets />
      <Results />
      <Pagination />
    </section>
  );
};

export default Search;
