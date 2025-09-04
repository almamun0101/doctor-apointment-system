"use client";
import { Provider } from "react-redux";

import AuthProvider from "../store/AuthProvider";
import { store } from "../store/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
