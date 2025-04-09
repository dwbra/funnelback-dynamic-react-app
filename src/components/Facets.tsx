/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDataDispatch, useDataState } from "../context/DataState";
import extractFacetKey from "../helpers/extractFacetParam";

const Facets = () => {
  const { facets, selectedFacets, facetTypes } = useDataState();
  const dispatch = useDataDispatch();

  const isSelected = (value: string) => {
    return selectedFacets.some((facet) => facet.facetValue === value);
  };

  const onChangeHandler = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: any,
    facetType: string
  ) => {
    const facet = extractFacetKey(event.target.value);

    if (!facet) {
      dispatch({
        type: "clearAllSelectedFacets",
      });
    } else {
      const { decodedFacetKey, decodedFacetValue } = facet;
      if (facetType === "checkbox" || facetType === "radio") {
        if (!isSelected(decodedFacetValue)) {
          dispatch({
            type: "setCheckedFacet",
            facetKey: decodedFacetKey,
            facetValue: decodedFacetValue,
            facetType,
          });
        } else {
          dispatch({
            type: "removeCheckedFacet",
            facetKey: decodedFacetKey,
            facetType,
          });
        }
      } else if (facetType === "select") {
        dispatch({
          type: "updateSelectFacet",
          facetKey: decodedFacetKey,
          facetValue: decodedFacetValue,
          facetType,
        });
      }
    }
  };

  //You must have your facetTypes variable length match
  // the number of facets returned from Funnelback.
  return facets && facets.length > 0 && facetTypes.length === facets.length ? (
    <section className="search__facets">
      <h2>Facets</h2>
      {facets.map((facet, i) => {
        if (facetTypes[i] === "checkbox") {
          return (
            <div className="facet checkbox" key={i}>
              <h4>Facet Name: {facet.name}</h4>
              <ul>
                {facet.allValues.map((option, index) => (
                  <li key={`${option.label}-${index}`}>
                    <input
                      type="checkbox"
                      name={option.label}
                      value={option.toggleUrl}
                      checked={isSelected(option.data)}
                      onChange={(e) => {
                        onChangeHandler(e, "checkbox");
                      }}
                    />
                    <label htmlFor={option.label}>{option.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else if (facetTypes[i] === "select") {
          return (
            <div className="facet select" key={i}>
              <h4>Facet Name: {facet.name}</h4>
              <select
                id=""
                onChange={(e) => onChangeHandler(e, "select")}
                defaultValue=""
              >
                {facet.allValues.map((option, optionIndex) => {
                  return (
                    <option
                      key={`${option.label}-${optionIndex}`}
                      value={option.toggleUrl}
                    >
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        } else if (facetTypes[i] === "radio") {
          return (
            <div className="facet" key={i}>
              <h4>Facet Name: {facet.name}</h4>
              <ul>
                {facet.allValues.map((option) => (
                  <li key={option.label}>
                    <input
                      onChange={(e) => onChangeHandler(e, "radio")}
                      type="radio"
                      name={facet.name}
                      value={option.toggleUrl}
                    />
                    <label htmlFor={option.label}>{option.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          console.warn(`Facet type does not match: ${facet}`);
          return null;
        }
      })}
    </section>
  ) : null;
};

export default Facets;
