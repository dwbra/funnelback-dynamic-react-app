import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDataState } from "../context/DataState";
import NoResults from "./NoResults";
import ResultsLoading from "./ResultsLoading";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import getMeta from "../helpers/getMeta";

const Results = () => {
  const {
    results,
    networkRequest: { inProgress },
    selectors,
    templates,
  } = useDataState();

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [containerHeight, setHeight] = useState(0);

  const setWrapperRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    setHeight(node.offsetHeight);
    const obs = new ResizeObserver(() =>
      requestAnimationFrame(() => setHeight(node.offsetHeight))
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const sel = selectors.results?.parentNode;
    if (!sel) return;
    const el = document.querySelector(sel);
    if (el instanceof HTMLElement) setContainer(el);
  }, [selectors.results]);

  // 1) if loading, stub out a placeholder DIV with known height;
  //    otherwise join all of your <li> strings
  const innerHtml = inProgress ? (
    <ResultsLoading height={containerHeight} />
  ) : results && results.length > 0 ? (
    results.map((result) => templates.result.content(result, getMeta)).join("")
  ) : (
    <NoResults />
  );

  // 2) ask your wrapper to wrap it
  const rawWrapper = templates.results.content(innerHtml);

  // 3) sanitize + parse into React nodes
  const safeHtml = DOMPurify.sanitize(rawWrapper);
  const parsed = parse(safeHtml);

  if (!container) return null;
  return createPortal(
    <div ref={setWrapperRef} className="results__wrapper">
      {parsed}
    </div>,
    container
  );
};

export default Results;
