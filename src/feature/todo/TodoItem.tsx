import { IconBriefcase } from "@tabler/icons-react";
import {
  Link,
  useBlocker,
  useLoaderData,
  useRouteLoaderData,
} from "react-router";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { User } from "@/store/globalState/globalApiSlice";
import { Todo } from "./store/todoApiSlice";

export default function TodoItem() {
  const item = useLoaderData<Todo>();
  const user = useRouteLoaderData<User>("user-detail");
  console.log("USER FROM TOP ROUTE: ", user);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname
  );

  return (
    <Paper pos="relative" m="xl">
      <Title order={3}>Hello {user?.name}</Title>
      <Divider mb={"lg"} />
      <Flex direction="column" gap="lg">
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

        <Link to=".." viewTransition>
          <Button>Go back</Button>
        </Link>
      </Flex>
      <Modal
        opened={blocker.state === "blocked"}
        onClose={() => {}}
        withCloseButton={false}
        centered
        size={"lg"}
      >
        <Title>Are you sure you want to leave?</Title>

        <Group my="xl" grow>
          <Button onClick={() => blocker?.proceed?.()}>Proceed</Button>
          <Button onClick={() => blocker?.reset?.()} variant="light">
            Cancel
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
}
