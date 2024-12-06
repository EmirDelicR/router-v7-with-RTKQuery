import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { Button, Paper, Stack, Text, Title } from "@mantine/core";

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  PropsWithChildren,
  State
> {
  state: Readonly<State> = {
    hasError: false,
    error: null,
  };

  constructor(props: PropsWithChildren) {
    super(props);
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error.message, info.componentStack);
    this.setState({ hasError: true, error });
  }

  resetErrorBoundary() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <AppErrorMessagePanel
          errorMessage={this.state.error?.message}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

function AppErrorMessagePanel({
  errorMessage,
  resetErrorBoundary,
}: Readonly<{
  errorMessage: string | undefined;
  resetErrorBoundary: () => void;
}>) {
  const navigate = useNavigate();

  const onButtonClick = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <Paper withBorder p="lg" m="auto" shadow="md">
      <Stack align="center">
        <Title>Error occurred</Title>
        <Text fw="bold">{`${errorMessage ? errorMessage : "We are sorry, an unexpected error occurred."}`}</Text>
        <Button onClick={onButtonClick} variant="outline">
          Go to home page
        </Button>
      </Stack>
    </Paper>
  );
}
