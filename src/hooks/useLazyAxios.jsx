import axios from "axios";
import axiosClient from "../app/api/axiosClient";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../features/auth/authSlice";

const SUCCESS_STATUS = [200, 201, 202, 203, 204, 205];

const useLazyAxios = ({ url, method, options = {} }) => {
  const access_token = useSelector(selectAccessToken);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const fetch = async (body) => {
    let cancelToken;

    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel("Canceled due to new Request");
    }

    cancelToken = axios.CancelToken.source();

    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      setError("");

      let result = null;

      if (method !== "get") {
        result = await axiosClient[method](url, body, {
          ...options,
          cancelToken: cancelToken.token,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      } else {
        result = await axiosClient.get(url, {
          ...options,
          cancelToken: cancelToken.token,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
      }

      if (SUCCESS_STATUS.some((status) => status === result.status)) {
        setData(result.data);
        setIsLoading(false);
        setIsSuccess(true);
        setIsError(false);
        setError("");
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
      setError(error.message);
      setData("");
    }
  };

  return [fetch, { data, isLoading, isSuccess, isError, error }];
};

export default useLazyAxios;
