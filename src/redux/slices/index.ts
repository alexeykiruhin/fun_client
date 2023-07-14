import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menu';
import { api } from '../api';
import socketMiddleware from '../cm';
// import { composeWithDevTools } from 'redux-devtools-extension';


export const store = configureStore({
  reducer: {
    menu: menuReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(socketMiddleware),
  // enhancers: [composeWithDevTools()],
});

// export default configureStore({
//   reducer: {
//     menu: menuReducer,
//   },
// });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
