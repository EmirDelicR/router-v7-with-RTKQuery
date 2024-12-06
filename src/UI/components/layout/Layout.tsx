import { Suspense } from "react";
import { NavLink, Outlet } from "react-router";
import {
  AppShell,
  Box,
  Burger,
  Divider,
  Group,
  LoadingOverlay,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "@/store";
import { ColorSchemeToggle } from "@/UI/components/colorSchemeToggle/ColorSchemeToggle";
import ErrorBoundary from "@/UI/components/error/ErrorBoundary";
import Logo from "@/UI/components/logo/Logo";
import classes from "./Layout.module.css";

const NAVIGATION = [
  { link: "/", label: "Home" },
  { link: "/work", label: "Work" },
];

export function Layout() {
  const [opened, { toggle }] = useDisclosure();
  const appName = useAppSelector((state) => state.app_data.name);
  const appVersion = useAppSelector((state) => state.app_data.version);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" align="center" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Logo />
            {appName}
          </Group>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Box>
            {NAVIGATION.map((item) => (
              <NavLink
                key={item.label}
                className={({ isActive }) =>
                  `${classes.link} ${isActive ? classes.active : ""}`
                }
                to={item.link}
                viewTransition
              >
                <UnstyledButton>{item.label}</UnstyledButton>
              </NavLink>
            ))}
          </Box>
          <Box>
            <Divider mb="md" />
            <Group justify="space-between">
              <Logo height={40} />
              @ED - {appVersion}
            </Group>
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <ErrorBoundary>
          <Suspense
            fallback={
              <Box pos="relative" h="90vh">
                <LoadingOverlay
                  zIndex={1000}
                  overlayProps={{ radius: "sm", blur: 2 }}
                />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </AppShell.Main>
    </AppShell>
  );
}
