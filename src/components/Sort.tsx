import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDataState, useDataDispatch } from "../context/DataState";
import DOMPurify from "dompurify";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element as DomElement,
  DOMNode,
} from "html-react-parser";

const Sort = () => {
  const dispatch = useDataDispatch();
  const { selectors, templates } = useDataState();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (selectors.sort?.parentNode) {
      const containerElement = document.querySelector(
        selectors.sort?.parentNode
      );
      if (containerElement instanceof HTMLElement) {
        setContainer(containerElement);
      }
    }
  }, [selectors.sort?.parentNode]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLocalSelectChange = (e: any) => {
    dispatch({
      type: "setSort",
      query: e.target.value,
    });
  };

  const rawHTML = templates?.sort?.content();
  if (!rawHTML) {
    console.error("Sort content not found");
    return null;
  }
  const cleanHTML = DOMPurify.sanitize(rawHTML);

  // Get the selectors (assumed to be provided with a leading dot)
  const changeClass = selectors.sort?.handleChange;
  if (!changeClass) {
    console.error("Sort.handleChange selector not defined");
    return null;
  }

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

        // Replace input elements with an onChange handler and bind to local state.
        if (domNode.name === "select" && classList.includes(changeClass)) {
          return (
            <select
              id={domNode.attribs.id}
              className={domNode.attribs.class}
              name={domNode.attribs.name}
              onChange={handleLocalSelectChange}
            >
              {domToReact(
                domNode.children as unknown as DOMNode[],
                parserOptions
              )}
            </select>
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

export default Sort;
