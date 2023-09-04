import { apiSlice } from "./apiSlice";
const USERS_URL = '/api';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data
            })
        }),
        verify:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/otpverify`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        })
    })
})

export const { useLoginMutation,useRegisterMutation,useVerifyMutation,useLogoutMutation } = usersApiSlice;