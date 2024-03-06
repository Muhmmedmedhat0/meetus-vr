// import { configureStore } from '@reduxjs/toolkit';
// import user from './features/user-slice';
// import task from './features/task-slice';

// export const store = configureStore({
//   reducer: {
//     user,
//     task,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });



import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './features/user-slice';
import task from './features/task-slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user'],
};
const authPersistConfig = {
  key: 'user',
  storage: storageSession,
  blacklist: ['somethingTemporary'],
};
const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, user),
  task,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;