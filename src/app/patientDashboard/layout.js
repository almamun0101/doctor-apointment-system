"use client";
import { Provider } from "react-redux";

import AuthProvider from "../store/AuthProvider";
import { store } from "../store/store";
import { Navbar5 } from "@/components/navbar-5";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Navbar5 />

        {children}
        <Footer />
      </AuthProvider>
    </Provider>
  );
}
