import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataState, useDataDispatch } from "../../../context/DataState";
import purify from "../../../helpers/purify";

const ManualSearch = () => {
  const dispatch = useDataDispatch();
  const { selectors, templates } = useDataState();
  const [localQuery, setLocalQuery] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
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

  // Determine the container and the content to render
  const searchSelector = selectors.search.manual;
  const container = document.querySelector(`.${searchSelector.parentNode}`);
  const searchContent = templates.search?.manual?.content();

  useEffect(() => {
    // Only add event listeners if the elements exist in the document
    const submitEl = document.querySelector(`.${searchSelector.handleSubmit}`);
    const clearEl = document.querySelector(`.${searchSelector.handleClear}`);

    if (submitEl) {
      submitEl.addEventListener("click", handleSubmit);
    }
    if (clearEl) {
      clearEl.addEventListener("click", handleClear);
    }

    // Cleanup event listeners on unmount or when dependencies change
    return () => {
      if (submitEl) {
        submitEl.removeEventListener("click", handleSubmit);
      }
      if (clearEl) {
        clearEl.removeEventListener("click", handleClear);
      }
    };
  }, [selectors, templates, localQuery]);

  // If container or content is not available, just return null
  if (!container || !searchContent) {
    return null;
  }

  const cleanHTML = purify(searchContent!);

  const portalContent = <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;

  // Return the portal so the content is rendered in the desired container
  return createPortal(portalContent, container);
};

export default ManualSearch;
