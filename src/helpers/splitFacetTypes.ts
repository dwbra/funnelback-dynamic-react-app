const splitFacetTypes = (types: string): string[] => {
  if (!types || !types.includes("-")) {
    return [types];
  }
  return types.split("-");
};

export default splitFacetTypes;
