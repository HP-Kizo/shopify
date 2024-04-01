import axios from "axios";
import { useState, useEffect } from "react";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
function useFetch(url) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchURL = async () => {
      try {
        setIsLoading(true);
        const res = await instance.get(url);
        setData(res.data);
        setStatus(res.status);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    };
    fetchURL(url);
  }, [url]);
  const reFetch = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get(url);
      setData(res.data);
      setStatus(res.status);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      setError(err);
    }
  };
  return { data, isLoading, status, error, reFetch };
}

export default useFetch;
