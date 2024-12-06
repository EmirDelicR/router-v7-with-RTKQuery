import { Container, Stack, Text, Title } from "@mantine/core";
import HomeButton from "../components/homeButton/HomeButton";

export default function NotFoundPage() {
  return (
    <Container>
      <Stack align="center" justify="center" mih="80vh">
        <Title>Something is not right...</Title>
        <Text c="dimmed" size="lg" ta="center">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <HomeButton />
      </Stack>
    </Container>
  );
}
