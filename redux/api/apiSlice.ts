import info from '@/hooks/info';
import {
    BaseQueryFn,
    createApi,
    EndpointBuilder,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env?.NEXT_PUBLIC_API_URL, // || '/', // Use env variable in Next.js'/api',
    prepareHeaders: (headers) => {
        const token = window.localStorage.getItem('token'); // Example: JWT token
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        headers.set('Accept', 'application/json');
        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (
        builder: EndpointBuilder<
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            never,
            'api'
        >
    ) => ({
        getFunders: builder.query({ query: () => '/funder' }),
        storeFunder: builder.mutation({
            query: (body) => ({ url: '/funder/', method: 'POST', body }),

            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    // Wait for the query to complete successfully
                    const { data } = await queryFulfilled;

                    // Here, you can update the state by refetching the relevant query
                    // For example, if there's a `getFunders` query, you can trigger a cache update
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getFunders',
                            undefined,
                            (draft) => {
                                // Add the new funder data to the list in cache
                                draft.push(data?.data);
                            }
                        )
                    );
                } catch (error) {
                    console.error('Failed to store funder data:', error);
                }
            },
        }),
        changeVerifyStatus: builder.mutation({
            query: ({ id, passKey, type }) => ({
                // url: `/funder?id=${id}&pass-key=${passKey}&type=${type}`,
                url: `/funder/${id}?pass-key=${passKey}&type=${type}`,
                method: 'PATCH',
            }),

            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    // Wait for the query to complete successfully
                    const { data } = await queryFulfilled;
                    info(true, 'apiSlice - changeVerifyStatus', { data, body });

                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getFunders',
                            undefined,
                            (draft) => {
                                // Add the new funder data to the list in cache
                                const index: number = draft.findIndex(
                                    (f: { id: number }) => f.id === body?.id
                                );

                                switch (body?.type) {
                                    case 'change':
                                        draft[index].isVerified =
                                            !draft[index]?.isVerified;
                                        break;
                                    case 'delete':
                                        draft?.splice(index, 1);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        )
                    );
                } catch (error) {
                    console.error('Failed to update funder data:', error);
                }
            },
        }),
    }),
});

export const {
    useGetFundersQuery,
    useStoreFunderMutation,
    useChangeVerifyStatusMutation,
} = apiSlice;
export default apiSlice;
