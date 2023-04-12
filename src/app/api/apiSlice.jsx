import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL + "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { access_token } = getState().auth;

    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    //refresh
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "GET",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(
        setCredentials({
          access_token: refreshResult.data.access_token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult?.error?.status === 403) {
      refreshResult.error.data.message = "Your login has expired";

      return refreshResult;
    }
  }

  return result;
};

export default createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({}),
});
