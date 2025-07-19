import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar'
import { useLoadUserQuery } from '@/features/api/authApi';
import { Loader } from 'lucide-react';
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const isLoggedIn = true;
  const {data , isLoading, isError, } = useLoadUserQuery();

  if(isLoading) return(
        <LoadingSpinner/>
  )
  
  return (
    <div className='flex flex-col min-h-screen'>
       <Navbar/>
      <div className='flex-1'>
         <Outlet/> {/*  the children components will be displayed in outlet section */}
      </div>
    </div>
  )
}
