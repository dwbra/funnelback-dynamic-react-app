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
      facetCheckbox: {
        handleChange: "checkbox-facet-handler",
      },
      facetSelect: {
        handleChange: "select-facet-handler",
      },
      facetRadio: {
        handleChange: "radio-facet-handler",
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
      result: {
        content: (result, getMeta) => {
          return `
         <li class="people-card grid-col-sm-full-inner grid-col-md-1of2 grid-col-lg-1of3 grid-col-xl-1of4">
              <a href="${result.liveUrl}">
                <div class="image-container">
                  <img class="people-card-img" src="${getMeta(
                    result,
                    "photoUrl"
                  )}" alt="${getMeta(result, "firstName")} ${getMeta(
            result,
            "lastName"
          )}" style="width:100%;">
                  <p class="card-header occupation">${getMeta(
                    result,
                    "jobTitle"
                  )}</p>
                  <p class="card-text name">                ${
                    getMeta(result, "title") ?? ""
                  } ${getMeta(result, "firstName")}${" "}
                ${getMeta(result, "lastName")}</p>
                  <svg>
                    <path d="M17.6881 11.8729C17.1238 11.2118 16.5347 10.2542 15.9208 9H16.9901C18.2475 10.4583 19.5842 11.5375 21 12.2375V12.7625C19.5842 13.4625 18.2475 14.5417 16.9901 16H15.9208C16.5347 14.7458 17.1238 13.7882 17.6881 13.1271H3V11.8729H17.6881Z"></path>
                  </svg>
                </div>
              </a>
            </li>
        `;
        },
      },
      results: {
        content: (innerHtml) => {
          return `<div class="results people-card-container grid-container-25 dark--theme" style="padding-top: 4vw;">${innerHtml}</div>`;
        },
      },
      totalResults: {
        className: "custom-total-results",
      },
      facets: [
        {
          name: "LastNameInitial",
          type: "radio",
          options: {
            singleChoice: false,
            facetsRestricted: true,
          },
          displayLabel: "Last Initial",
        },
      ],
      facetCheckbox: {
        content: (facet) => `
        <div class="facet checkbox">
          <h4>${facet.displayLabel}</h4>
          <ol>
            ${facet.allValues
              .map(
                (opt, i) => `
                  <li key="${facet.name}-cb-${i}">
                    <input
                      type="checkbox"
                      id="${facet.name}-cb-${i}"
                      name="${opt.label}"
                      value="${opt.toggleUrl}"
                      data-facet-name=${facet.name}
                      data-facet-value=${opt.data}
                      class="checkbox-facet-handler"
                    />
                    <label for="${facet.name}-cb-${i}">${opt.label}</label>
                  </li>
                `
              )
              .join("")}
          </ol>
        </div>
      `,
      },
      facetSelect: {
        content: (facet) => `
        <div class="facet select">
          <h4>${facet.displayLabel}</h4>
          <select class="select-facet-handler" data-facet-name=${facet.name}>
            <option value="">All</option>
            ${facet.allValues
              .map(
                (opt, i) => `
                  <option value="${opt.toggleUrl}" data-facet-value="${opt.data}">
                    ${opt.label}
                  </option>
                `
              )
              .join("")}
          </select>
        </div>
      `,
      },
      facetRadio: {
        content: (facet) => `
        <div class="facet radio">
          <h4>${facet.displayLabel}</h4>
          <ul>
            ${facet.allValues
              .map(
                (opt, i) => `
                  <li key="${facet.name}-rb-${i}">
                    <input
                      type="radio"
                      id="${facet.name}-rb-${i}"
                      name="${facet.name}"
                      value="${opt.toggleUrl}"
                      data-facet-name=${facet.name}
                      data-facet-value=${opt.data}
                      class="radio-facet-handler"
                    />
                    <label for="${facet.name}-rb-${i}">${opt.label}</label>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
      `,
      },
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
