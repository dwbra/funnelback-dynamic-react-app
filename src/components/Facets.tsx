/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useDataDispatch, useDataState } from "../context/DataState";
import extractFacetKey from "../helpers/extractFacetParam";
import { createPortal } from "react-dom";

const Facets = () => {
  const { facets, selectedFacets, selectors, templates } = useDataState();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeFacets, setActiveFacets] = useState<any[]>([]);
  const dispatch = useDataDispatch();

  useEffect(() => {
    if (selectors.facets && selectors.facets.parentNode) {
      const containerElement = document.querySelector(
        selectors.facets.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.facets]);

  useEffect(() => {
    if (!templates.facets.length || !facets?.length) return;

    const matchingFacets = facets
      .filter((obj1) =>
        templates.facets.some((obj2) => obj2.name === obj1.name)
      )
      .map((obj1) => {
        const templateMatch = templates.facets.find(
          (obj2) => obj2.name === obj1.name
        );
        return {
          ...obj1,
          type: templateMatch?.type,
          additionalInfo: templateMatch,
        };
      });

    if (matchingFacets && matchingFacets.length > 0) {
      setActiveFacets(matchingFacets);
    }
  }, [templates.facets, facets]);

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

  interface FacetItem {
    count: number;
    data: string;
    label: string;
    selected: boolean;
    toggleUrl: string;
  }

  const sortOptions = (options: Array<FacetItem>) => {
    return options.sort((a, b) => a.label.localeCompare(b.label));
  };

  const facetsContent = (
    <div className={`${selectors.facets.wrapper ?? "search__facets"} `}>
      {activeFacets.map((facet, i) => {
        if (facet.type === "checkbox") {
          sortOptions(facet.allValues);
          return (
            <div className="facet checkbox" key={i}>
              <h4>{facet.additionalInfo.displayLabel}</h4>
              <ol>
                {facet.allValues.map((option: FacetItem, index: number) => (
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
              </ol>
            </div>
          );
        } else if (facet.type === "select") {
          return (
            <div className="facet select" key={i}>
              <h4>{facet.additionalInfo.displayLabel}</h4>
              <select
                id=""
                onChange={(e) => onChangeHandler(e, "select")}
                defaultValue=""
              >
                {facet.allValues.map((option: FacetItem, index: number) => {
                  return (
                    <option
                      key={`${option.label}-${index}`}
                      value={option.toggleUrl}
                    >
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        } else if (facet.type === "radio") {
          return (
            <div className="facet" key={i}>
              <h4>{facet.additionalInfo.displayLabel}</h4>
              <ul>
                {facet.allValues.map((option: FacetItem) => (
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
    </div>
  );

  if (!container) {
    return null;
  }

  return createPortal(facetsContent, container);
};

export default Facets;
