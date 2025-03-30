import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useNetInfo } from "@react-native-community/netinfo";

import { store, persistor } from "@/store/index";

import "@/theme/unistyles";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const connection = useNetInfo();

  if (!connection.isConnected) {
    Toast.show({ type: "info", text1: "You are offline" });
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack />
      </PersistGate>
    </Provider>
  );
}
