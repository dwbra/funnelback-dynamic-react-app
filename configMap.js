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
        parentNode: ".search",
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
                ${getMeta(result, "title") ?? ""} ${getMeta(
            result,
            "firstName"
          )}${" "}
                ${getMeta(result, "lastName")}
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
        content: () => {
          return `<h3>No serches match your query try again!</h3>`;
        },
      },
      sort: {
        content: () => {
          return `
          <label for="sort">Sort by:</label>
            <select name="sort" class="sort-fb">
              <option value="">Relevance</option>
              <option value="date">Newest</option>
              <option value="adate">Oldest</option>
              <option value="title">Title A–Z</option>
              <option value="dtitle">Title Z–A</option>
            </select>
          `;
        },
      },
    },
  ],
]);

window.fbConfigMap = fbConfigMap;
