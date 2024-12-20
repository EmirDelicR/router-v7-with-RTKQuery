import { Anchor, Button, Flex, Text, Title } from "@mantine/core";
import { useAppDispatch } from "@/store";
import { setVersion } from "@/store/globalState/globalStoreSlice";
import classes from "./Welcome.module.css";

export function Welcome() {
  const dispatch = useAppDispatch();
  const updateVersion = () => {
    dispatch(setVersion({ version: "v2" }));
  };

  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn
        more on Mantine + Vite integration follow{" "}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        .
      </Text>
      <Flex mt="lg" justify="center" gap="md">
        <Button onClick={updateVersion}>Update version</Button>
      </Flex>
    </>
  );
}
