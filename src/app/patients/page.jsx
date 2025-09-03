"use client";
import Header from "@/components/Header";
import { Navbar5 } from "@/components/navbar-5";
import React, { useEffect } from "react";
import Find from "@/components/Find";
import Results from "@/components/Results";
import Choose from "@/components/Choose";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonial from "@/components/Testimonial";
import Trusted from "@/components/Trusted";
import Footer from "@/components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "@/app/firebase.config";
import { useDispatch } from "react-redux";
import { setUser ,clearUser } from "../store/userSlice";

const page = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  console.log(user);


   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user logged in
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      } else {
        // user logged out
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);



  return (
    <div>
      <Navbar5 userinfo={auth} />
      <Header />
      <Find />
      <Results />
      <Choose />
      <Services />
      <Team />
      <Testimonial />
      <Trusted />
      <Footer />
    </div>
  );
};

export default page;
