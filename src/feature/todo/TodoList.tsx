import { IconInfoCircle } from '@tabler/icons-react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router';
import {
  List,
  ListItem,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Todo } from './store/todoApiSlice';
import CustomPagination from '@/UI/components/pagination/Pagination';

export default function TodoList() {
  const navigation = useNavigation();
  const data = useLoaderData<Todo[]>();
  const navigate = useNavigate();

  const navigateToItemDetails = (id: string) => () => {
    navigate(`${id}`, { viewTransition: true });
  };

  return (
    <Paper m="xl">
      <Stack align="center">
        <List
          spacing="xs"
          size="sm"
          pos="relative"
          icon={
            <ThemeIcon bg="none" variant="light">
              <IconInfoCircle />
            </ThemeIcon>
          }
        >
          <LoadingOverlay visible={navigation.state === 'loading'} />
          {data?.map((item) => (
            <ListItem
              data-testid="list-item"
              key={item.id}
              maw="600px"
              style={{
                border: '1px solid lightblue',
                padding: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={navigateToItemDetails(item.id)}
            >
              <Title order={3}>
                {item.id} : {item.title}
              </Title>
              <Text>{item.description}</Text>
            </ListItem>
          ))}
        </List>

        <CustomPagination totalCount={4} />
      </Stack>
    </Paper>
  );
}
