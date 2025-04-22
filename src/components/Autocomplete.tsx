import { useState, useEffect, SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { useDataState, useDataDispatch } from "../context/DataState";
import fetchSuggestions from "../helpers/fetchSuggestions";
import useDebounce from "../hooks/useDebounce";
import { Autocomplete as AutocompleteMui, TextField } from "@mui/material";
import DOMPurify from "dompurify";

const Autocomplete: React.FC = () => {
  const dispatch = useDataDispatch();
  const { fbConfig, templates, selectors } = useDataState();
  const [localQuery, setLocalQuery] = useState("");
  const [localSuggestions, setLocalSuggestions] = useState<string[]>([]);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const debouncedQuery = useDebounce(localQuery, 300);

  // Fetch suggestions when query changes.
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

    // Only fetch suggestions if the debounced query is not empty.
    if (debouncedQuery.length > 0) {
      fetchLocalSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleSubmit = (event: SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    console.log("submitted with query:", localQuery);
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

  // Retrieve autocomplete selectors and template from global state.
  const autoCompleteSelectors = selectors.search.autocomplete;
  const autocompleteTemplate = templates.search.autocomplete;

  // Build the JSX content to be portaled.
  const jsxContent = (
    <div className={"autocomplete"}>
      {autocompleteTemplate?.title && (
        <h2
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(autocompleteTemplate.title),
          }}
        />
      )}
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
            onInputChange={(_event, value: string) => setLocalQuery(value)}
            onChange={(_event, value: string, reason: string) => {
              if (reason === "clear") {
                setLocalQuery("");
              } else {
                setLocalQuery(value);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} {...autocompleteTemplate?.inputElement} />
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
    </div>
  );

  // Use useEffect to wait for the DOM to be ready and set the container.
  useEffect(() => {
    if (selectors.search && selectors.search.parentNode) {
      const containerElement = document.querySelector(
        selectors.search.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.search]);

  // Until the container is ready, return null so nothing is rendered.
  if (!container) {
    return null;
  }

  // Return the portal instead of direct JSX.
  return createPortal(jsxContent, container);
};

export default Autocomplete;
