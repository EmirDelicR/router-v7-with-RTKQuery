import { combineReducers, configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { globalStoreSlice } from './globalState/globalStoreSlice';
import baseApi from './services/baseApi';

const rootReducer = combineReducers({
  [globalStoreSlice.name]: globalStoreSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true,
    ...options,
  });

export const store = createStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
