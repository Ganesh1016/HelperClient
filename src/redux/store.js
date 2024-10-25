import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ user: userSlice });

const persistConfig = {
  key: "user",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Your reducers will be added under the 'reducer' key
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for now
    }),
});

export const persistore = persistStore(store);
