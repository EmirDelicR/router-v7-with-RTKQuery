import { useRouteError } from "react-router";
import { Paper, Text, Title } from "@mantine/core";

export default function ErrorPage() {
  const error = useRouteError() as { status: number; data: string };

  return (
    <Paper>
      <Title>Error with status: {error?.status} occurred!</Title>
      <Text>
        {JSON.parse(error?.data)?.message || "Unknown error occurred!"}
      </Text>
    </Paper>
  );
}
