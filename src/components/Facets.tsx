// Facets.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataDispatch, useDataState } from "../context/DataState";
import extractFacetParam from "../helpers/extractFacetParam";
// import buildFacetParam from "../helpers/buildFacetParam";
import DOMPurify from "dompurify";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element as DomElement,
  DOMNode,
} from "html-react-parser";

const Facets: React.FC = () => {
  const { facets, selectedFacets, selectors, templates } = useDataState();
  const dispatch = useDataDispatch();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const sel = selectors.facets?.parentNode;
    if (!sel) return;
    const el = document.querySelector(sel);
    if (el instanceof HTMLElement) setContainer(el);
  }, [selectors.facets]);

  // Only accept facets from the configMap.js
  // Sort them into alphabetical order at least
  // Attach more data to the original facet object from the config
  const activeFacets = facets!
    .filter((f) => templates.facets.some((t) => t.name === f.name))
    .map((f) => {
      const tpl = templates.facets.find((t) => t.name === f.name)!;
      const sorted = [...f.allValues].sort((a, b) =>
        a.label.localeCompare(b.label)
      );
      const selectedEntry = selectedFacets.find(
        (sf) => sf.facetKey === tpl.name
      );
      return {
        ...f,
        type: tpl.type,
        displayLabel: tpl.displayLabel,
        allValues: sorted,
        selectedValue: selectedEntry?.facetValue ?? "",
      };
    });

  const cbClass = selectors.facetCheckbox?.handleChange;
  const slClass = selectors.facetSelect?.handleChange;
  const rbClass = selectors.facetRadio?.handleChange;

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const classList = Array.from(target.classList);
    const facetName = target.dataset.facetName || null;

    if (!facetName)
      throw new Error(
        "No facetName is set on the data attribute for this html element."
      );

    let facetType: "checkbox" | "select" | "radio";
    if (classList.includes(cbClass)) {
      facetType = "checkbox";
    } else if (classList.includes(slClass)) {
      facetType = "select";
    } else if (classList.includes(rbClass)) {
      facetType = "radio";
    } else {
      // not one of our facets, ignore it
      return;
    }

    // extract the facet key/value from the URL
    const info = extractFacetParam(target.value, facetName);

    if (!info) {
      dispatch({ type: "clearAllSelectedFacets" });
      return;
    }
    const { decodedFacetKey, decodedFacetValue } = info;

    if (facetType === "checkbox") {
      const exists = selectedFacets.some(
        (sf) => sf.facetValue === decodedFacetValue
      );
      dispatch({
        type: exists ? "removeCheckedFacet" : "setCheckedFacet",
        facetKey: decodedFacetKey,
        facetValue: decodedFacetValue,
        facetType,
      });
    } else {
      // radio & select both use updateSelectFacet
      dispatch({
        type: "updateSelectFacet",
        facetKey: decodedFacetKey,
        facetValue: decodedFacetValue,
        facetType,
      });
    }
  };

  const rawHtml = activeFacets
    .map((facet) => {
      switch (facet.type) {
        case "checkbox":
          return templates.facetCheckbox.content({ facet });
        case "select":
          return templates.facetSelect.content({ facet });
        case "radio":
          return templates.facetRadio.content({ facet });
        default:
          return "";
      }
    })
    .join("");

  const cleanHtml = DOMPurify.sanitize(rawHtml);

  // attach onChange and selected to inputs/selects
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type !== "tag" || !(domNode instanceof DomElement)) {
        return;
      }

      const { name, attribs, children } = domNode;
      const classList = attribs.class?.split(" ") || [];
      const facetValue = attribs["data-facet-value"] ?? null;

      const mapProps = () => {
        const { class: _class, ...rest } = attribs;
        return { className: _class, ...rest };
      };

      // checkbox inputs
      if (name === "input" && classList.includes(cbClass)) {
        return (
          <input
            {...mapProps()}
            checked={selectedFacets.some((sf) => sf.facetValue === facetValue)}
            onChange={(e) =>
              onChangeHandler(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        );
      }

      // select dropdowns
      if (name === "select" && classList.includes(slClass)) {
        return (
          <select
            {...mapProps()}
            defaultValue=""
            onChange={(e) =>
              onChangeHandler(e as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            {domToReact(children as DOMNode[], parserOptions)}
          </select>
        );
      }

      // radio inputs
      if (name === "input" && classList.includes(rbClass)) {
        return (
          <input
            {...mapProps()}
            checked={selectedFacets.some((sf) => sf.facetValue === facetValue)}
            onChange={(e) =>
              onChangeHandler(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        );
      }

      return;
    },
  };

  const facetNodes = parse(cleanHtml, parserOptions);

  if (!container) return null;
  return createPortal(
    <div className={selectors.facets.wrapper}>{facetNodes}</div>,
    container
  );
};

export default Facets;
