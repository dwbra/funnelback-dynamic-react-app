// Facets.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataDispatch, useDataState } from "../context/DataState";
import extractFacetKey from "../helpers/extractFacetParam";
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

  // 1) find portal target
  useEffect(() => {
    const sel = selectors.facets?.parentNode;
    if (!sel) return;
    const el = document.querySelector(sel);
    if (el instanceof HTMLElement) setContainer(el);
  }, [selectors.facets]);

  // 2) massage facet data
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

  // 3) your delegated handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeHandler = (e: React.ChangeEvent<any>) => {
    const input = e.target as HTMLInputElement;
    const facetType = input.dataset.facetType!;
    const info = extractFacetKey(input.value);
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
      // radio & select both map to updateSelectFacet
      dispatch({
        type: "updateSelectFacet",
        facetKey: decodedFacetKey,
        facetValue: decodedFacetValue,
        facetType,
      });
    }
  };

  // 4) build pure-HTML string
  const rawHtml = activeFacets
    .map((facet) => {
      switch (facet.type) {
        case "checkbox":
          return templates.facetCheckbox.content({
            facet,
            isSelected: (v: string) =>
              selectedFacets.some((sf) => sf.facetValue === v),
          });
        case "select":
          return templates.facetSelect.content({ facet });
        case "radio":
          return templates.facetRadio.content({ facet });
        default:
          return "";
      }
    })
    .join("");

  // 5) sanitize
  const cleanHtml = DOMPurify.sanitize(rawHtml);

  // 6) parser options: attach onChange to inputs/selects by data-facet-type
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type !== "tag" || !(domNode instanceof DomElement)) {
        return;
      }
      const { name, attribs, children } = domNode;
      const type = attribs["data-facet-type"];

      if (name === "input" && type) {
        return (
          <input
            {...attribs}
            onChange={(e) =>
              onChangeHandler(e as React.ChangeEvent<HTMLInputElement>)
            }
          />
        );
      }

      if (name === "select" && type === "select") {
        return (
          <select
            {...attribs}
            onChange={(e) =>
              onChangeHandler(e as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            {domToReact(children as DOMNode[], parserOptions)}
          </select>
        );
      }

      // leave everything else alone
      return;
    },
  };

  // 7) parse into React nodes
  const facetNodes = parse(cleanHtml, parserOptions);

  // 8) portal it
  if (!container) return null;
  return createPortal(
    <div className={selectors.facets.wrapper}>{facetNodes}</div>,
    container
  );
};

export default Facets;
