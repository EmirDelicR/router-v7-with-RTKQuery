import { expect, vi } from 'vitest';
import { createStore } from '@/store';
import { INITIAL_DEFAULT_DATA, setVersion } from './globalStoreSlice';

describe('globalStoreSlice redux state', () => {
  const store = createStore();

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should set initial data for user', () => {
    const globalState = store.getState().app_data;

    expect(globalState).toEqual(INITIAL_DEFAULT_DATA);
  });

  it('Should set data for user and call setToken from localStorageHelper', () => {
    store.dispatch(setVersion({ version: 'v5' }));
    const globalState = store.getState().app_data;

    expect(globalState).toEqual({
      ...INITIAL_DEFAULT_DATA,
      version: 'v5',
    });
  });
});
