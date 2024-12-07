import { LoaderFunctionArgs } from 'react-router';
import TodoItem from '@/feature/todo/TodoItem';
import { getTodoLoader } from '@/feature/todo/store/todoApiSlice';
import { Grid } from '@mantine/core';
import TodoDescription from '@/feature/todo/TodoDescription';

export default function ItemPage() {
  return (
    <Grid>
      <Grid.Col span={6}>
        <TodoItem />
      </Grid.Col>
      <Grid.Col span={6}>
        <TodoDescription />
      </Grid.Col>
    </Grid>
  );
}

export function itemLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return getTodoLoader({ todoId: id! });
}
