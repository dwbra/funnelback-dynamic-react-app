import DOMPurify from "dompurify";

const purify = (htmlString: string) => {
  return DOMPurify.sanitize(htmlString);
};

export default purify;
