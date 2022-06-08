import React from 'react';
import { auth } from '../services/firebase/firebase';

export default function UserProfile() {
  return (
    <div className='w-full justify-center items-center h-screen flex bg-[#E5E7EB]'>
      <div className='w-8/12 h-[570px] flex flex-col bg-white border shadow-xl px-40 pt-10 items-center' >
            <img src={auth.currentUser.photoURL} alt="" className='w-32 h-32 rounded-full' />
            <span className='py-2 font-extrabold text-3xl font-mono mt-5'>{auth.currentUser.displayName}</span>
            <div>
              <span className='text-2xl font-mono'>Email : </span>
              <span className='font-mono font-semibold text-2xl'>{auth.currentUser.email}</span>
            </div>
      </div>
  </div>
  )
}
