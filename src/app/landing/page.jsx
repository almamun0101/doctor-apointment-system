"use client"
import Header from '@/components/Header'
import { Navbar5 } from '@/components/navbar-5'
import React from 'react'
import Find from '@/components/Find'
import Results from '@/components/Results'
import Choose from '@/components/Choose'
import Services from '@/components/Services'
import Team from '@/components/Team'
import Testimonial from '@/components/Testimonial'
import Trusted from '@/components/Trusted'
import Footer from '@/components/Footer'
import { getAuth } from "firebase/auth";
import firebaseConfig from "@/app/firebase.config";


const page = () => {
    const auth = getAuth()
  // console.log(auth)

  return (
    <div>
      <Navbar5 userinfo={auth}/>
      <Header/>
      <Find/>
      <Results/>
      <Choose/>
      <Services/>
      <Team/>
      <Testimonial/>
      <Trusted/>
      <Footer/>
    </div>
  )
}

export default page