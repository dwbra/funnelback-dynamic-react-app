import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDataState } from "../context/DataState";
import NoResults from "./NoResults";
import ResultsLoading from "./ResultsLoading";
import Result from "./Result";

const Results = () => {
  const {
    results,
    networkRequest: { inProgress },
    selectors,
  } = useDataState();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // Use a callback ref to measure the wrapper element when it mounts.
  const setWrapperRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // Initial measurement using offsetHeight.
      setContainerHeight(node.offsetHeight);

      // Set up a ResizeObserver to update the height on dimension changes.
      const observer = new ResizeObserver(() => {
        // Use requestAnimationFrame to measure after the layout has updated.
        requestAnimationFrame(() => {
          setContainerHeight(node.offsetHeight);
        });
      });
      observer.observe(node);

      // Disconnect the observer when the node is removed.
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // Locate the container for the portal using the provided selectors.
  useEffect(() => {
    if (selectors.results && selectors.results.parentNode) {
      const containerElement = document.querySelector(
        selectors.results.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.results]);

  const content = (
    <div ref={setWrapperRef} className="results__wrapper">
      {inProgress ? (
        <ResultsLoading height={containerHeight} />
      ) : (
        <ul
          style={{ margin: 0, padding: 0 }} // Remove default spacing from the ul if any.
          className={`${selectors.results.ulClassName ?? "search__results"}`}
        >
          {results && results.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            results.map((result: any) => (
              <Result key={result.rank} result={result} />
            ))
          ) : (
            <NoResults />
          )}
        </ul>
      )}
    </div>
  );

  if (!container) {
    return null;
  }

  return createPortal(content, container);
};

export default Results;
