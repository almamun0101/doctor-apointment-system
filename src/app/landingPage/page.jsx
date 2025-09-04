"use client";
import Header from "@/app/components/Header";
import { Navbar5 } from "@/app/components/navbar-5";
import React, { useEffect } from "react";
import Find from "@/app/components/Find";
import Results from "@/app/components/Results";
import Choose from "@/app/components/Choose";
import Services from "@/app/components/Services";
import Team from "@/app/components/Team";
import Testimonial from "@/app/components/Testimonial";
import Trusted from "@/app/components/Trusted";
import Footer from "@/app/components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "@/app/firebase.config";
import { useDispatch } from "react-redux";
import { setUser ,clearUser } from "../store/userSlice";

const page = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();



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
    <div className="">
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
