import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataStateProvider } from "./context/DataState";

const funnelbackReactApp = () => {
  // Access the global configMap
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configMap = (window as any).fbConfigMap;
  const fbConfig = configMap ? configMap.get("fbConfig") : null;
  const templates = configMap ? configMap.get("templates") : null;
  const selectors = configMap ? configMap.get("selectors") : null;

  if (!selectors) {
    console.error(
      "FB Dynamic App - Global configuration 'selectors' not found."
    );
    return;
  }

  if (!fbConfig) {
    console.error(
      "FB Dynamic App - Global configuration 'fbConfig' not found."
    );
    return;
  }

  if (!templates) {
    console.error(
      "FB Dynamic App - Global configuration 'templates' not found."
    );
    return;
  }

  if (!selectors.initialiserElement) {
    console.error(
      "FB Dynamic App - Global configuration 'selectors.initialiserElement' has not been set."
    );
    return;
  }

  const container = document.querySelector(selectors.initialiserElement);

  if (!container) {
    console.error("FB Dynamic App - React container not found in the DOM.");
    return;
  }

  if (container && fbConfig && templates && selectors) {
    createRoot(container).render(
      <DataStateProvider>
        <App fbConfig={fbConfig} templates={templates} selectors={selectors} />
      </DataStateProvider>
    );
  }
};

funnelbackReactApp();
