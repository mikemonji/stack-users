import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer as createPersistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["localUsersApi"],
};

export const persistReducer = (rootReducer: any) =>
  createPersistReducer(persistConfig, rootReducer);
