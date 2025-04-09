import { Result } from "../components/Results";

//Shares typing from the Results parent component.
const getMeta = (
  result: Result,
  key: keyof Result["listMetadata"]
): string | undefined => {
  const value = result?.listMetadata?.[key]?.[0];

  if (value === undefined) {
    console.warn(`getMeta: Missing value for key "${key}" in result`, result);
    return;
  }

  return value;
};

export default getMeta;
