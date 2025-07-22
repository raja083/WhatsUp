import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";
import { connectSocket, disconnectSocket } from "@/lib/socket";

const USER_API = "http://localhost:4000/user/api";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    //to register a new user
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "/signup",
        method: "POST",
        body: inputData,
      }),
    }),

    //to login a user
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      // function to execute when the query is started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));

          //  Connect socket here
          connectSocket(result.data.user._id);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    //get the loggedIn user
    loadUser: builder.query({
      query: () => ({
        url: "/getUser",
        method: "GET",
      }),
      // function to execute when the query is started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
          //dispatch the user slice and change the logged in user from null to result.data.user
          connectSocket(result.data.user._id);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    //logout the user
    logOutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      // function to execute when the query is started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedIn({ user: null }));

          // ✅ Disconnect the socket
          disconnectSocket();
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateUser: builder.mutation({
      query: (formData) => ({
        url: "/update-profile",
        method: "PUT",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useLogOutUserMutation,
  useUpdateUserMutation,
} = authApi;
