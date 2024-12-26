import {base_url} from "../../utils/constants.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserData, UserProfile, UserRegister} from "../../utils/types";
import {RootState} from "../../app/store.ts";

export const accountApi = createApi({
    reducerPath: 'account',
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: (headers, {getState, endpoint}) => {
            if (endpoint === 'updateUser') {
                const token = (getState() as RootState).token;
                headers.set('Authorization', `Basic ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: (user: UserRegister) => ({
                url: '/user',
                method: 'POST',
                body: user
            })
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: (token: string) => ({
                url: '/login',
                method: 'POST',
                headers: {
                    Authorization: `Basic ${token}`
                }
            }),
            providesTags: ['profile'],
        }),
        updateUser: builder.mutation<UserProfile, UserData>({
            query: (user: UserData) => ({
                url: '/user',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['profile']
        }),
        changePassword: builder.mutation<void, string[]>({
            query: (credentials) => ({
                url: '/user/password',
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${credentials[1]}`,
                    'X-Password': credentials[0]
                }
            }),
            invalidatesTags: ['profile']
        })
    })
})

export const {useRegisterUserMutation, useFetchUserQuery, useUpdateUserMutation, useChangePasswordMutation, useLazyFetchUserQuery} = accountApi;