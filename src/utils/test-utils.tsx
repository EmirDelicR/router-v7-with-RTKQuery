import React, { PropsWithChildren, ReactElement } from 'react';
import { render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { AppStore, createStore, RootState } from '@/store';
import { theme } from '@/theme';

// https://redux.js.org/usage/writing-tests

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState | Record<string, unknown>>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createStore({ preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): ReactElement {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </Provider>
      </BrowserRouter>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

interface ExtendedRenderHookOptions<TProps> extends RenderHookOptions<TProps> {
  preloadedState?: Partial<RootState | Record<string, unknown>>;
  store?: AppStore;
}

export function renderHookWithProviders<TProps, TResult>(
  hook: (props: TProps) => TResult,
  {
    preloadedState = {},
    store = createStore({ preloadedState }),
    ...renderHookOptions
  }: ExtendedRenderHookOptions<TProps> = {}
) {
  function Wrapper({ children }: PropsWithChildren<Record<string, unknown>>): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...renderHook(hook, { wrapper: Wrapper, ...renderHookOptions }),
  };
}
