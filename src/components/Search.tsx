import { useDataState } from "../context/DataState";
import Autocomplete from "./Autocomplete";
import ManualSearch from "./ManualSearch";

const Search = () => {
  const { templates } = useDataState();
  if (templates.search.type === "autocomplete") {
    return <Autocomplete />;
  } else if (templates.search.type === "manual") {
    return <ManualSearch />;
  } else {
    console.warn("search type is incorrectly defined.");
    return null;
  }
};

export default Search;
