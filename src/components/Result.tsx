/* eslint-disable @typescript-eslint/no-explicit-any */
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import getMeta from "../helpers/getMeta";
import { useDataState } from "../context/DataState";

const Result = ({ result }: any) => {
  const { templates } = useDataState();
  const rawHTML = templates.results.content(result, getMeta);
  // Sanitize the HTML string.
  const safeHTML = DOMPurify.sanitize(rawHTML);
  // Convert it to React nodes.
  const reactNodes = parse(safeHTML);

  return <>{reactNodes}</>;
};

export default Result;
