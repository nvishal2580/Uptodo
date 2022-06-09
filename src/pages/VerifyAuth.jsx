import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from "../services/firebase/Auth";
import { auth } from '../services/firebase/firebase';

function VerifyAuth() {

    const {currentUser} = useContext(AuthContext);
    const [mailSent,setMailSent] = useState(false);
    const naivgate = useNavigate();

    useEffect(() => {

        if(auth.currentUser.emailVerified){
            naivgate('/app');
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            // console.log('auth state changed',user)
            if(user.emailVerified){
                naivgate('/app');
            }
        })
        
        return () => unsubscribe();
    },[])

    const handleVerify = () => {
        setMailSent(true);
        auth.currentUser.sendEmailVerification().then(() => {
            toast.success('verification email sent');
            
        }).catch(error => {
            toast.error(error.message);
        })
    
    }

  return <div className='w-full justify-center items-center h-screen flex bg-[#F1F5F8]'>
      <div className='w-6/12 h-[600px] flex-col bg-white border shadow-xl px-40 pt-28' >
            <div className='text-center font-mono font-bold text-2xl mb-3'>
                Please verify your email address
            </div>
            <hr />
            <p className='text-center mt-10'>
            You've entered <span className='font-semibold'>{currentUser.email}</span> as the email address for your account.
            </p>
            <div className='text-center px-10 mt-20 mb-5'>
                <button disabled={mailSent} className={`bg-[#09748A] text-white w-full p-2 rounded ${mailSent === true ? "cursor-not-allowed" : ""}`} onClick={handleVerify} >Send Verification Link</button>
            </div>
            <p>If you have verified please refresh</p>
            <hr />
            <div className='flex justify-center mt-2'>
                <div className='mx-2'>
                    <a className='hover:underline' href='/'>Home</a>
                </div>
                <div className='mx-2'>
                    <a className='hover:underline' href='/login'>Login Page</a>
                </div>
            </div>
      </div>
  </div>;
}

export default VerifyAuth;
