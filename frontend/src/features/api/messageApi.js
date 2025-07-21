import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const MESSAGE_API = "http://localhost:4000/message/api"

export const messageApi = createApi({
    reducerPath:"messageApi",
    baseQuery:fetchBaseQuery({
        baseUrl:MESSAGE_API,
        credentials:"include"
    }),
    endpoints : (builder) =>({


        getAllUsers: builder.query({
            query:()=>({
                url:"/users",
                method:"GET"
            })
        }),

        getAllMessages: builder.query({
            query:(id)=>({
                url:`/${id}`,
                method:"GET"
            })
        }),

        sendMessage:builder.mutation({
            query:({id,text,image})=>({
                url:`/send/${id}`,
                method:"POST",
                body:{text,image}
            })
        })
    })

})

export const {useGetAllUsersQuery,useGetAllMessagesQuery, useSendMessageMutation} = messageApi;