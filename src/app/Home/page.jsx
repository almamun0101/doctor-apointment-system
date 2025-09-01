"use client"
import Header from '@/components/Header'
import { Navbar5 } from '@/components/navbar-5'
import React from 'react'
import Find from '@/components/Find'
import Results from '@/components/Results'
import Choose from '@/components/Choose'
const page = () => {
  return (
    <div>
      <Navbar5/>
      <Header/>
      <Find/>
      <Results/>
      <Choose/>
    </div>
  )
}

export default page