/* eslint-disable @typescript-eslint/no-explicit-any */
//Shares typing from the Results parent component.
const getMeta = (result: any, key: string): string | undefined => {
  const value = result?.listMetadata?.[key]?.[0];

  if (value === undefined) {
    return;
  }

  return value;
};

export default getMeta;
