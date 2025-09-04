// app/store/AuthProvider.jsx
"use client";

import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase.config"; // ✅ import initialized app
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(); // ✅ pass initialized app

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        router.push("/landingPage"); // logged in
      } else {
        router.push("/signin"); // not logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
