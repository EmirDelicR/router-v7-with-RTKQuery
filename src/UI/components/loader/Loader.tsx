import { Center, Loader, Paper, rem } from "@mantine/core";

export default function CustomLoader() {
  return (
    <Paper>
      <Center mt={rem(100)}>
        <Loader />
      </Center>
    </Paper>
  );
}
