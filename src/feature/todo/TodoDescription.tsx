import { Button, Group, Modal, Paper, Text, Title } from '@mantine/core';
import { Link, useBlocker } from 'react-router';

export default function TodoDescription() {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname
  );
  return (
    <Paper>
      <Text my="lg">
        This content will be shown and it will not wait until data is loaded
      </Text>
      <Link to=".." viewTransition>
        <Button>Go back</Button>
      </Link>

      <Modal
        opened={blocker.state === 'blocked'}
        onClose={() => {}}
        withCloseButton={false}
        centered
        size={'lg'}
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
