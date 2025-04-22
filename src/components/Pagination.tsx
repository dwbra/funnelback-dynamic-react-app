import { useEffect, useState } from "react";
import MUIPagination from "@mui/material/Pagination";
import { useDataState, useDataDispatch } from "../context/DataState";
import { createPortal } from "react-dom";

const Pagination = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const {
    fbConfig,
    currentStart,
    totalResults,
    results,
    selectors,
    templates,
  } = useDataState();
  const dispatch = useDataDispatch();

  useEffect(() => {
    if (selectors.pagination && selectors.pagination.parentNode) {
      const containerElement = document.querySelector(
        selectors.pagination.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.pagination]);

  // Local state to track pagination values synchronously
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const resultsPerPage = +fbConfig.numRanks || 10;

  useEffect(() => {
    // Ensure calculations are updated whenever global state changes
    setCurrentPage(Math.ceil((Number(currentStart) || 1) / resultsPerPage));
    setTotalPageCount(Math.ceil((Number(totalResults) || 0) / resultsPerPage));
  }, [currentStart, totalResults, resultsPerPage]);

  const handlePaginationClick = async (pageNumber: number) => {
    if (isNaN(pageNumber)) return;

    const offset = pageNumber * resultsPerPage - resultsPerPage + 1;

    dispatch({
      type: "setStartRank",
      startRank: offset.toString(),
    });
  };

  const handleChange = async (page: number) => {
    await handlePaginationClick(page);
    window.scrollTo(0, 0);
  };

  if (totalPageCount < 2) {
    return null;
  }

  const content = results && results?.length > 0 && (
    <MUIPagination
      onChange={(_, page) => handleChange(page)}
      page={currentPage}
      count={totalPageCount}
      {...templates.pagination.muiProps}
    />
  );

  if (!container) {
    return null;
  }

  return createPortal(content, container);
};

export default Pagination;
