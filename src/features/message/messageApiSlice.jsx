import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import { chatApiSlice } from "../chat/chatApiSlice";

const messageAdapter = createEntityAdapter({});

const initialState = messageAdapter.getInitialState();

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: (chatId) => ({
        url: `/message/${chatId}`,
        method: "GET",
      }),

      keepUnusedDataFor: 0.1,

      transformResponse: (resData) => {
        const loadedData = resData.map((message) => {
          message.id = message._id;

          return message;
        });

        return messageAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Message", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Message", id })),
          ];
        } else return { type: "Message", id: "LIST" };
      },
    }),

    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/message",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Message", id: "LIST" }],

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(
              chatApiSlice.util.invalidateTags([{ type: "Chat", id: "LIST" }])
            );
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

const getMessagesFromResult = messageApiSlice.endpoints.fetchMessages.select();

export const selectMessagesData = createSelector(
  getMessagesFromResult,
  (messagesResult) => messagesResult.data
);

export const {
  selectAll: selectAllMessages,
  selectIds: selectMessagesIds,
  selectById: selectMessageById,
} = messageAdapter.getSelectors(
  (state) => selectMessagesData(state) ?? initialState
);

export const { useFetchMessagesQuery, useSendMessageMutation } =
  messageApiSlice;
