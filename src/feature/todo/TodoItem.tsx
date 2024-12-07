import { IconBriefcase } from '@tabler/icons-react';
import { useLoaderData, useNavigation, useRouteLoaderData } from 'react-router';
import {
  Box,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { User } from '@/store/globalState/globalApiSlice';
import { Todo } from './store/todoApiSlice';

export default function TodoItem() {
  const navigation = useNavigation();
  const item = useLoaderData<Todo>();
  const user = useRouteLoaderData<User>('user-detail');
  console.log('USER FROM TOP ROUTE: ', user);

  return (
    <Paper pos="relative" m="xl">
      <Title order={3}>Hello {user?.name}</Title>
      <Divider mb="lg" />
      <Container pos="relative">
        <LoadingOverlay visible={navigation.state === 'loading'} />
        <Stack gap="lg">
          <Title order={2}>
            <Group>
              <IconBriefcase />
              {item.title}
            </Group>
          </Title>
          <Box>
            <Title order={4}>Description:</Title>
            <Text>{item.description}</Text>
          </Box>
          <Box>
            <Title order={4}>ID:</Title>
            <Text>{item.id}</Text>
          </Box>
        </Stack>
      </Container>
    </Paper>
  );
}
