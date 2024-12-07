import { Await, LoaderFunctionArgs, useLoaderData } from 'react-router';
import TodoItem from '@/feature/todo/TodoItem';
import { getTodoLoader } from '@/feature/todo/store/todoApiSlice';
import { Grid } from '@mantine/core';
import TodoDescription from '@/feature/todo/TodoDescription';
import { Suspense } from 'react';
import CustomLoader from '@/UI/components/loader/Loader';

export default function ItemPage() {
  const { todoItem } = useLoaderData();
  return (
    <Grid>
      <Grid.Col span={6}>
        <Suspense fallback={<CustomLoader />}>
          <Await resolve={todoItem}>
            {(loadedTodo) => <TodoItem item={loadedTodo} />}
          </Await>
        </Suspense>
      </Grid.Col>
      <Grid.Col span={6}>
        <TodoDescription />
      </Grid.Col>
    </Grid>
  );
}

export function itemLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return {
    todoItem: getTodoLoader({ todoId: id! }),
  };
}
