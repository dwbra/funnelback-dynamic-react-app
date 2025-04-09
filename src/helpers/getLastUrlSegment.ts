const getLastUrlSegment = (url: string) => {
  return url.split("/").pop();
};

export default getLastUrlSegment;
