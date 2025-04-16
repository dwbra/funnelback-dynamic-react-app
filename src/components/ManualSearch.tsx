import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataState, useDataDispatch } from "../context/DataState";
import DOMPurify from "dompurify";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element as DomElement,
  DOMNode,
} from "html-react-parser";

const ManualSearch: React.FC = () => {
  const dispatch = useDataDispatch();
  const { selectors, templates } = useDataState();
  const [localQuery, setLocalQuery] = useState("");
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (selectors.search.parentNode) {
      const containerElement = document.querySelector(
        selectors.search.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.search.parentNode]);

  const handleSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    dispatch({
      type: "setQuery",
      query: localQuery,
    });
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLocalQuery("");
    dispatch({
      type: "setQuery",
      query: "",
    });
  };

  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  // Get and sanitize your raw HTML string from the template.
  const rawHTML = templates.search?.manual?.content();
  if (!rawHTML) {
    console.error("Search content not found");
    return null;
  }
  const cleanHTML = DOMPurify.sanitize(rawHTML);

  // Get the selectors (assumed to be provided with a leading dot)
  const submitClass = selectors.search.manual.handleSubmit;
  const clearClass = selectors.search.manual.handleClear;
  const formClass = selectors.search.manual.form;
  const inputClass = selectors.search.manual.inputField;

  // Define parser options for html-react-parser.
  // Replace matching elements with React elements that include event handlers.
  const parserOptions: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode.type === "tag" &&
        domNode instanceof DomElement &&
        domNode.attribs
      ) {
        // Split the element's class attribute into an array.
        const classList = domNode.attribs.class?.split(" ") || [];

        // Replace button elements with the submit handler.
        if (domNode.name === "button" && classList.includes(submitClass)) {
          return (
            <button
              id={domNode.attribs.id}
              className={domNode.attribs.class}
              type="button"
              onClick={handleSubmit}
            >
              {domToReact(
                domNode.children as unknown as DOMNode[],
                parserOptions
              )}
            </button>
          );
        }

        // Replace button elements with the clear handler.
        if (domNode.name === "button" && classList.includes(clearClass)) {
          return (
            <button
              id={domNode.attribs.id}
              className={domNode.attribs.class}
              type="button"
              onClick={handleClear}
            >
              {domToReact(
                domNode.children as unknown as DOMNode[],
                parserOptions
              )}
            </button>
          );
        }

        // Replace form elements with an onSubmit handler.
        if (domNode.name === "form" && classList.includes(formClass)) {
          return (
            <form
              id={domNode.attribs.id}
              className={domNode.attribs.class}
              onSubmit={handleSubmit}
            >
              {domToReact(
                domNode.children as unknown as DOMNode[],
                parserOptions
              )}
            </form>
          );
        }

        // Replace input elements with an onChange handler and bind to local state.
        if (domNode.name === "input" && classList.includes(inputClass)) {
          return (
            <input
              id={domNode.attribs.id}
              className={domNode.attribs.class}
              type={domNode.attribs.type || "text"}
              name={domNode.attribs.name}
              placeholder={domNode.attribs.placeholder}
              value={localQuery}
              onChange={handleLocalInputChange}
            />
          );
        }
      }
      // Return undefined to keep the original node if no replacement is needed.
      return undefined;
    },
  };

  // Convert the sanitized HTML string into React nodes.
  const reactContent = parse(cleanHTML, parserOptions);

  if (!container) {
    return null;
  }

  return createPortal(reactContent, container);
};

export default ManualSearch;
