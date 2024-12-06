import { store } from '@/store';
import baseApi from '@/store/services/baseApi';

export interface Todo {
  id: string;
  title: string;
  description: string;
}

interface PaginatedData<T> {
  items: T[];
  numberOfPages: number;
  totalCount: number;
}
const LIMIT = 5;
export const todoApiSlice = baseApi
  .enhanceEndpoints({ addTagTypes: ['TodoApiSlice'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPaginatedTodos: builder.query<PaginatedData<Todo>, { limit?: number; offset?: number }>({
        query: ({ limit = LIMIT, offset = 0 }) => `/todos?_start=${offset}&_limit=${limit}`,
        providesTags: ['TodoApiSlice'],
      }),

      getTodo: builder.query<Todo, { todoId: string }>({
        query: ({ todoId }) => `/todos/${todoId}`,
        providesTags: ['TodoApiSlice'],
      }),
    }),
  });

export const { useGetPaginatedTodosQuery } = todoApiSlice;

export const getPaginatedTodosLoader = async ({ page = 1 }: { page?: number }) => {
  const offset = (page - 1) * LIMIT;

  const { data, isError, error } = await store.dispatch(
    todoApiSlice.endpoints.getPaginatedTodos.initiate({ limit: LIMIT, offset })
  );

  if (isError) {
    const { status } = error as { status: string };
    throw new Response(JSON.stringify({ message: 'Fail to fetch todos!' }), {
      status: Number(status),
    });
  }

  return data;
};

export const getTodoLoader = async ({ todoId }: { todoId: string }) => {
  const { data, error, isError } = await store.dispatch(
    todoApiSlice.endpoints.getTodo.initiate({ todoId })
  );

  if (isError) {
    const { status } = error as { status: string };
    throw new Response(JSON.stringify({ message: 'Fail to fetch todo!' }), {
      status: Number(status),
    });
  }

  return data;
};
