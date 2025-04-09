import axiosInstance from "../utils/axiosInstance";

/* eslint-disable @typescript-eslint/no-explicit-any */
const fetchData = async (queryUrl: string) => {
  try {
    const { data } = await axiosInstance.get(queryUrl);

    const results = data?.response?.resultPacket?.results || [];
    const currentStart =
      data?.response?.resultPacket?.resultsSummary?.currStart;
    const nextStart = data?.response?.resultPacket?.resultsSummary?.nextStart;
    const totalResults =
      data?.response?.resultPacket?.resultsSummary?.totalMatching;
    const facets = data?.response?.facets;

    return {
      results,
      currentStart,
      nextStart,
      totalResults,
      facets,
    };
  } catch (e: any) {
    console.error("Data fetch failed:", e);
    throw new Error(e);
  }
};

export default fetchData;
