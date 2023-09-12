import { apiSlice } from "./apiSlice";

const DOCTORS_URL = '/api/doctors';

export const doctorsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${DOCTORS_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${DOCTORS_URL}/register`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${DOCTORS_URL}/logout`,
                method:'POST'
            })
        })
    })
})

export const { useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
 } = doctorsApiSlice;