import axiosInstance from "../utils/axiosInstance";

/* eslint-disable @typescript-eslint/no-explicit-any */
const fetchSuggestions = async (queryUrl: string) => {
  try {
    const { data } = await axiosInstance.get(queryUrl);
    return data;
  } catch (e: any) {
    console.error("Data fetch failed:", e);
    throw new Error(e);
  }
};

export default fetchSuggestions;
