import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataState } from "../context/DataState";

const TotalResults = () => {
  const { totalResults, query, selectors, templates } = useDataState();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (selectors.totalResults && selectors.totalResults.parentNode) {
      const containerElement = document.querySelector(
        selectors.totalResults.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.totalResults]);

  const tResults =
    totalResults && totalResults > 0 ? totalResults.toString() : "0";
  const content = (
    <div
      className={`${
        templates?.totalResults?.className ?? "search__total-results"
      }`}
    >
      <p>
        {tResults} results found: <strong>{query}</strong>
      </p>
    </div>
  );

  if (!container) {
    return null;
  }

  return createPortal(content, container);
};

export default TotalResults;
