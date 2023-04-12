import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";
import { setChat } from "./chatSlice";

const chatAdapter = createEntityAdapter({});

const initialState = chatAdapter.getInitialState();

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: () => ({
        url: "/chat",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (res) => {
        const loadedChats = res.map((chat) => {
          chat.id = chat._id;
          return chat;
        });
        return chatAdapter.setAll(initialState, loadedChats);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Chat", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Chat", id })),
          ];
        } else return { type: "Chat", id: "LIST" };
      },
    }),

    createChat: builder.mutation({
      query: (id) => ({
        url: "/chat",
        method: "POST",
        body: {
          userId: id,
        },
      }),

      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),

    createGroupChat: builder.mutation({
      query: (body) => ({
        url: "/chat/group",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),

    changeGroupName: builder.mutation({
      query: (body) => ({
        url: "/chat/group/rename",
        method: "PATCH",
        body,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setChat(data));
          }
        } catch (err) {
          console.log(err);
        }
      },

      invalidatesTags: (result, error, arg) => [
        {
          type: "Chat",
          id: arg.id,
        },
      ],
    }),

    addUsersToGroup: builder.mutation({
      query: (body) => ({
        url: "/chat/group/add-user",
        method: "PATCH",
        body,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setChat(data));
          }
        } catch (err) {
          console.log(err);
        }
      },

      invalidatesTags: (result, error, arg) => [
        {
          type: "Chat",
          id: arg.id,
        },
      ],
    }),

    removeUserFromGroup: builder.mutation({
      query: (body) => ({
        url: "/chat/group/remove-user",
        method: "PATCH",
        body,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setChat(data));
          }
        } catch (err) {
          console.log(err);
        }
      },

      invalidatesTags: (result, error, arg) => [
        {
          type: "Chat",
          id: arg.id,
        },
      ],
    }),

    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: "/chat/group/leave",
        method: "PATCH",
        body: { _id: chatId },
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            dispatch(setChat(null));
          }
        } catch (err) {
          console.log(err);
        }
      },

      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),
  }),
});

const getChatsResult = chatApiSlice.endpoints.getAllChats.select();

export const selectChatsData = createSelector(
  getChatsResult,
  (chatsResult) => chatsResult.data
);

export const {
  selectAll: selectAllChats,
  selectIds: selectChatsIds,
  selectById: selectChatById,
} = chatAdapter.getSelectors((state) => selectChatsData(state) ?? initialState);

export const {
  useLazyGetAllChatsQuery,
  useGetAllChatsQuery,
  useCreateChatMutation,
  useCreateGroupChatMutation,
  useChangeGroupNameMutation,
  useAddUsersToGroupMutation,
  useRemoveUserFromGroupMutation,
  useLeaveGroupMutation,
} = chatApiSlice;
