import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const INITIAL_DEFAULT_DATA = {
  name: 'Demo App',
  version: 'v1',
};

export const globalStoreSlice = createSlice({
  name: 'app_data',
  initialState: INITIAL_DEFAULT_DATA,
  reducers: {
    setVersion: (state, action: PayloadAction<{ version: string }>) => {
      state.version = action.payload.version;
    },
  },
});

export const { setVersion } = globalStoreSlice.actions;
