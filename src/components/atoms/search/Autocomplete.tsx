import { useState, useEffect, SyntheticEvent } from "react";
import { useDataDispatch, useDataState } from "../../../context/DataState";
import fetchSuggestions from "../../../helpers/fetchSuggestions";
import useDebounce from "../../../hooks/useDebounce";
import { Autocomplete as AutocompleteMui, TextField } from "@mui/material";
import purify from "../../../helpers/purify";

const Autocomplete = () => {
  const dispatch = useDataDispatch();
  const { fbConfig, templates, selectors } = useDataState();
  const [localQuery, setLocalQuery] = useState("");
  const [localSuggestions, setLocalSuggestions] = useState([]);
  const debouncedQuery = useDebounce(localQuery, 300);

  useEffect(() => {
    if (fbConfig.collection && !fbConfig.suggestUrl) {
      console.warn("No suggestUrl is set.");
      return;
    }

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
    console.log("submitted");
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

  // useEffect(() => {
  //   console.log(localQuery);
  // });

  const autocompleteTemplate = templates.search.autocomplete;
  const autoCompleteSelectors = selectors.search.autocomplete;

  return (
    <section
      className={autoCompleteSelectors?.parentSection ?? "autocomplete-section"}
    >
      {autocompleteTemplate?.title ? (
        <h2
          dangerouslySetInnerHTML={{
            __html: purify(`${autocompleteTemplate?.title}`),
          }}
        ></h2>
      ) : null}
      <form
        onSubmit={handleSubmit}
        className={autoCompleteSelectors?.form ?? "autocomplete-form"}
      >
        <div
          className={autoCompleteSelectors?.wrapper ?? "autocomplete-wrapper"}
        >
          <AutocompleteMui
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
            onChange={(_event, value: string) => {
              // For freeSolo, value is a string (or null)
              setLocalQuery(value);
            }}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  {...autocompleteTemplate?.inputElement}
                />
              </>
            )}
            {...autocompleteTemplate?.muiProps}
          />
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className={
          autoCompleteSelectors?.handleSubmit ?? "autocomplete-submit-btn"
        }
      >
        {autocompleteTemplate?.submitBtnText ?? "Submit"}
      </button>
      <button
        type="button"
        onClick={handleClear}
        className={
          autoCompleteSelectors?.handleClear ?? "autocomplete-clear-btn"
        }
      >
        {autocompleteTemplate?.clearBtnText ?? "Clear"}
      </button>
    </section>
  );
};

export default Autocomplete;
