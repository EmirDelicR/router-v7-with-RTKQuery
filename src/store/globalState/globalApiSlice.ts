import { store } from '@/store';
import baseApi from '@/store/services/baseApi';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const globalApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, {}>({
      query: () => '/users/1',
    }),
  }),
});

export const { useGetUserQuery } = globalApiSlice;

export const getUserLoader = async () => {
  const { data, isError, error } = await store.dispatch(
    globalApiSlice.endpoints.getUser.initiate({})
  );

  if (isError) {
    const { status } = error as { status: string };
    throw new Response(JSON.stringify({ message: 'Fail to fetch user!' }), {
      status: Number(status),
    });
  }

  return data;
};
