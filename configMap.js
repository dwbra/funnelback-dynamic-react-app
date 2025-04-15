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
      scopedFacet: "f.Type|type=Staff",
      additionalParams: [{ "f.LastNameInitial|lastInitial": "B" }],
    },
  ],
  [
    "selectors",
    {
      search: {
        autocomplete: {
          parentSection: "search",
          handleSubmit: "search-submit-handler",
          handleClear: "search-clear-handler",
          form: "search-form",
          wrapper: "search-wrapper",
          suggestions: "search-suggestions",
        },
        manual: {
          parentNode: "search",
          handleSubmit: "search-submit-handler",
          handleClear: "search-clear-handler",
        },
      },
      pagination: ".pagination",
    },
  ],
  [
    "templates",
    {
      //MUI pagination props
      pagination: {
        className: "mui-pagination",
        muiProps: {
          size: "large",
          controls: ["showFirstButton", "showLastButton"],
          additionals: [],
        },
      },
      //MUI Skeleton props
      skeleton: {
        className: "mui-skeleton",
        muiProps: {
          variant: "rounded",
          width: "100%",
          height: "100%",
          animation: "pulse",
        },
      },
      results: (result, getMeta) => {},
      noResults: () => {},
      totalResults: (totalResults, query) => {},
      sort: (selectedValue) => {},
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
          <section class="search">
            <h2>Staff Directory</h2>
            <section class="search__form">
              <form id="search-form">
                <div>
                  <input 
                    type="text"
                    id="search-input" 
                    name="searchquery"
                    value=""
                    placeholder="Search by title" />
                </div>
              </form>
              <button 
                type="button" 
                id="fbSubmitHandler" 
                class="search__form--submit searchSubmitHandler">
                Submit
              </button>
              <button 
                type="button" 
                id="fbClickHandler" 
                class="search__form--clear">
                Clear
              </button>
            </section>
          </section>
        `;
          },
        },
      },
    },
  ],
]);

window.fbConfigMap = fbConfigMap;
