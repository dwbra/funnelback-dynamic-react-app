# 🎯 A Basic & Modern Funnelback Implementation

## 🚀 React + TypeScript + Vite + Funnelback

This repository now uses a completely dynamic configuration model via a **configMap.js** file. By splitting configuration into separate mappings for Funnelback settings, DOM selectors, and dynamic HTML templates, you can easily customize every aspect of your search UI on the client side without having to modify core React code.

This repo demonstrates an efficient way to integrate **Squiz Matrix** and **Funnelback** with a React frontend. It compiles clean, minimal CSS and JavaScript files that are ideal for consumption by Matrix.

---

## 📦 Dynamic Configuration Mapping

### How It Works

Rather than hardcoding selectors, HTML snippets, and MUI props into your React components, we now define a dynamic configuration in **configMap.js**. This file exposes a Map (attached to `window.fbConfigMap`) with keys for:

- **fbConfig:**  
  Contains search endpoints, collection names, profiles, and other Funnelback parameters (such as `searchUrl`, `suggestUrl`, `collection`, and `additionalParams`). These values drive API requests and search logic in the React app.

- **selectors:**  
  Contains CSS selectors for each section of your UI. For example, it defines where the search block, facets, results list, pagination, and total results areas are located in the DOM. Each key (such as `search`, `totalResults`, `facets`, `results`, `pagination`, and `noResults`) includes properties like `parentNode` (or specific class names) that the app queries and uses to portal content.

- **templates:**  
  Contains configuration for how each part of the UI should be rendered. Templates may include:
  - **results:** A function (or a string returned by a function) that produces an HTML string for each search result.
  - **pagination:** An object that carries inline MUI props to customize the Pagination component (for example, using inline object literals for style overrides or class names).
  - **facets, search, totalResults, noResults, and skeleton:** Templates that either return HTML strings or objects with customization options.
  - For example, the **search** template includes sub-templates for both `autocomplete` and `manual` search modes. Each returns HTML as a string. These strings are later sanitized (using DOMPurify) and parsed into React nodes (via html-react-parser) so that dynamic event handlers and React state integrations occur seamlessly.

### configMap.js Example

```js
const fbConfigMap = new Map([
  [
    "fbConfig",
    {
      searchUrl: "https://ual-search.funnelback.squiz.cloud/s/search.json",
      suggestUrl: "https://ual-search.funnelback.squiz.cloud/s/suggest.json",
      collection: "ual~sp-people-prod",
      profile: "_default",
      numRanks: "12",
      defaultSort: "metalastName",
      defaultQuery: "!FunDoesNotExist:PadreNull",
      additionalParams: [{ key: "f.Type|type", value: "Staff" }],
    },
  ],
  [
    "selectors",
    {
      initialiserElement: ".react__ual-staff",
      search: {
        parentNode: ".search", // The container for search elements.
        autocomplete: {
          handleSubmit: "search-submit-handler",
          handleClear: "search-clear-handler",
          form: "search-form",
          wrapper: "search-wrapper",
          suggestions: "search-suggestions",
        },
        manual: {
          handleSubmit: "search-submit-handler",
          form: "search-submit-handler",
          handleClear: "search-clear-handler",
          inputField: "search-input",
        },
      },
      totalResults: {
        parentNode: ".total-results",
      },
      facets: {
        parentNode: ".facets",
        wrapper: "facet-wrapper",
      },
      results: {
        parentNode: ".results",
        ulClassName: "custom-results",
      },
      pagination: {
        parentNode: ".pagination",
      },
      noResults: {
        className: "no-results",
      },
      sort: {
        parentNode: ".sort",
        handleChange: "sort-fb",
      },
    },
  ],
  [
    "templates",
    {
      pagination: {
        muiProps: {
          sx: { "&.MuiPagination-root": { backgroundColor: "grey" } },
          size: "large",
          showFirstButton: true,
          showLastButton: true,
        },
      },
      skeleton: {
        muiProps: {
          variant: "rectangular",
          animation: "pulse",
        },
      },
      results: {
        content: (result, getMeta) => {
          return `
          <li>
            <div>
              <h3>
                ${getMeta(result, "title") ?? ""} ${
            getMeta(result, "firstName") ?? ""
          } 
                ${getMeta(result, "lastName") ?? ""}
              </h3>
              <p>jobTitle: ${getMeta(result, "jobTitle")}</p>
              <p>Bio: ${getMeta(result, "biography")}</p>
            </div>
          </li>
          `;
        },
      },
      totalResults: {
        className: "custom-total-results",
      },
      facets: [
        {
          name: "LastNameInitial",
          type: "checkbox",
          options: {
            singleChoice: false,
            facetsRestricted: true,
          },
          displayLabel: "Last Initial",
        },
      ],
      search: {
        type: "manual",
        autocomplete: {
          title: "Daniels Header",
          inputElement: {
            className: "search-input",
            name: "daniels-auto",
            placeholder: "Daniels new auto complete",
            title: "daniels-auto",
          },
          submitBtnText: "Submit New",
          clearBtnText: "Clear New",
          muiProps: {
            freeSolo: true,
          },
        },
        manual: {
          content: () => {
            return `
            <h2>Staff Directory</h2>
              <form id="search-form" class="search-submit-handler">
                <div>
                  <input 
                    type="text"
                    class="search-input"
                    name="searchquery"
                    value=""
                    placeholder="Search by title" />
                </div>
              </form>
              <button 
                type="button" 
                id="fbSubmitHandler" 
                class="search-submit-handler">
                Submit
              </button>
              <button 
                type="button" 
                id="fbClickHandler" 
                class="search-clear-handler">
                Clear
              </button>
            `;
          },
        },
      },
      noResults: {
        content: () => `<h3>No searches match your query—try again!</h3>`,
      },
      sort: {
        content: () =>
          `<div class="sort-wrapper">
          <label for="sort">Sort by:</label>
          <select class="sort-fb" name="sort">
            <option value="">Relevance</option>
            <option value="date">Newest</option>
            <option value="-date">Oldest</option>
            <option value="title">Title A–Z</option>
            <option value="-title">Title Z–A</option>
          </select>
        </div>`,
      },
    },
  ],
]);

window.fbConfigMap = fbConfigMap;
```

## ⚛️ React App Integration

The React application reads from this dynamic map (attached to `window.fbConfigMap` or imported as a module) and uses these settings throughout its components:

- **Selectors** are used to query specific DOM nodes for portaling content, wiring up event handlers, and positioning dynamic UI elements.

- **Templates** drive the dynamic rendering of HTML (for components such as Manual Search or Results). The HTML strings generated in templates are sanitized (using DOMPurify) and then parsed into React nodes (via html-react-parser). This allows your app to dynamically inject custom layouts as defined in your config file.

- **MUI Props** for components (e.g., Pagination) are defined in the configuration file and spread into components via the JSX spread operator. This ensures that the client can override defaults without modifying the source code.

For example, your Pagination component now looks up its container (as defined in selectors) and then renders the MUI Pagination using the inline props defined in the template’s pagination section. Similarly, the Manual Search component parses its HTML (from `templates.search.manual.content`) into React elements and attaches event handlers based on `selectors.search.manual`.

## 🛠️ Development Workflow

- **Dynamic Config Updates:**  
  All UI elements, class names, and component properties are now centralized in `configMap.js`, allowing you to adjust the UI dynamically from a single configuration file.

- **State & DOM Integration:**  
  React components use portals to insert dynamic HTML into designated DOM containers (identified via selectors). The app sanitizes the HTML (using DOMPurify) and parses it into React elements (via html-react-parser) so that state management and event handling work as expected.

- **Custom Client-Side Logic:**  
  Helper functions (e.g., `getMeta`) can be exposed to the configuration. Clients can write dynamic rendering logic in plain JavaScript—returning HTML strings that are later parsed into React elements—without modifying the core application code.

## 🧪 Getting Started

To begin local development, run the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
