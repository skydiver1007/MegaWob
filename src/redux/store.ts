import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import GlobalReducer from './reducers'

export const store = configureStore({
    reducer: {
        global: GlobalReducer,
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })]
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
