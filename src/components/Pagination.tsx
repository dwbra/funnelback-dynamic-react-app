import { useEffect, useState } from "react";
import MUIPagination from "@mui/material/Pagination";
import { useDataState, useDataDispatch } from "../context/DataState";

const Pagination = () => {
  const { fbConfig, currentStart, totalResults, results } = useDataState();
  const dispatch = useDataDispatch();

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

  return (
    results &&
    results?.length > 0 && (
      <section className="search__pagination">
        <MUIPagination
          onChange={(_, page) => handleChange(page)}
          page={currentPage}
          count={totalPageCount}
          size="large"
          showFirstButton
          showLastButton
          variant="outlined"
        />
      </section>
    )
  );
};

export default Pagination;
