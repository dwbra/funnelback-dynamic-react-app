import { useDataState } from "../context/DataState";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const NoResults = () => {
  const { templates, selectors } = useDataState();
  return (
    <section
      className={`${selectors?.noResults?.className ?? "search__no-results"}`}
    >
      {parse(DOMPurify.sanitize(templates.noResults.content())) ?? (
        <p>There are no results for your search.</p>
      )}
    </section>
  );
};

export default NoResults;
