import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";// localStorage use hoga
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./AuthSlice";

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // sirf auth slice ko persist karna hai
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // persist ke liye
    }),
});

export const persistor = persistStore(store);

// Hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
