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

  if (!fbConfig) {
    console.error("Global configuration 'fbConfig' not found.");
    return;
  }

  if (!templates) {
    console.error("Global configuration 'templates' not found.");
    return;
  }

  if (!selectors) {
    console.error("Global configuration 'selectors' not found.");
    return;
  }

  const container = document.querySelector(".react__ual-staff");
  if (container && fbConfig && templates && selectors) {
    createRoot(container).render(
      <DataStateProvider>
        <App fbConfig={fbConfig} templates={templates} selectors={selectors} />
      </DataStateProvider>
    );
  }
};

funnelbackReactApp();
