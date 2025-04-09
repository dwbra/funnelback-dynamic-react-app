import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DataStateProvider } from "./context/DataState.tsx";

const ntuImageSearchSelector = document.querySelectorAll(
  ".react__ntu-image-search"
);

if (ntuImageSearchSelector.length > 0) {
  ntuImageSearchSelector.forEach((element) => {
    const el = element as HTMLElement; // Explicitly cast to HTMLElement

    const resultsUrl = el.dataset.searchUrl || "";
    const suggestionsUrl = el.dataset.suggestUrl || "";
    const collection = el.dataset.collection || "";
    const defaultQuery = el.dataset.defaultQuery || "";
    const profile = el.dataset.profile || "";
    const numRanks = el.dataset.numRanks || "";
    const defaultSort = el.dataset.defaultSort || "";

    const fbConfig = {
      searchUrl: resultsUrl,
      suggestUrl: suggestionsUrl,
      collection: collection,
      defaultQuery: defaultQuery,
      profile: profile,
      numRanks: numRanks,
      defaultSort: defaultSort,
    };

    createRoot(element).render(
      <DataStateProvider>
        <App fbConfig={fbConfig} />
      </DataStateProvider>
    );
  });
}
