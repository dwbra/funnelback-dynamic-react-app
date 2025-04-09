/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import axiosRetry from "axios-retry";
import jitterDelay from "./jitterDelay";

// Create a custom axios instance
const axiosInstance = axios.create({});

// Apply axios-retry to the axios instance
axiosRetry(axiosInstance, {
  retries: 3, // Number of retry attempts
  retryDelay: (retryCount: number) => {
    const jitter = jitterDelay(2000 * Math.pow(2, retryCount), 0.2);
    console.log(`Retry attempt #${retryCount}`);
    // Exponential backoff with jitter
    return jitter;
  },
  retryCondition: (error: any) => {
    // Retry on network errors or 5xx status codes
    const status = error.response.status;
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || status >= 500;
  },
});

export default axiosInstance;
