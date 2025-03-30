import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "@/store/index";

import "@/theme/unistyles";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack />
      </PersistGate>
    </Provider>
  );
}
