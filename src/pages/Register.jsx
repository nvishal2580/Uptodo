import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {auth,db} from '../services/firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';


import Quote from '../components/common/Quote';
import Input from '../components/common/Input';
import GoogleLogo from '../assets/logos/google_logo.svg';
import quotes from '../services/quotes';
import SpinIcon from '../assets/icons/SpinIcon';
import GlobeIcon from '../assets/icons/GlobeIcon';
import { updateProfile } from 'firebase/auth';

function Register() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [progress,setProgress] = useState(false);

    const validateData = (data) => {

        if(data.username.length < 3){
            toast.error('username must be atleast 3 characters long!');
            return false;
        }
        if(data.password.length < 6){
            toast.error('Password must be atleast 6 characters long!');
            return false;
        }
        return true;
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setProgress(true);
        const data = {
            email,password,username
        }
        console.log(data);
        if(!validateData(data)){
            setProgress(false);
            return;
        }

            auth.createUserWithEmailAndPassword(email,password).then(async(userCredential) => {
                // user singed in
                const user = userCredential.user;
                console.log(user);
                // userCredential.user.sendEmailVerification().then(() => {
                //     console.log('link opened by user');
                //     console.log(auth.currentUser);
                // });
                try {
                   await updateProfile(auth.currentUser, {
                        displayName : username
                      }) 
                   
                } catch (error) {
                    toast.error(error.message)
                }

                console.log(auth.currentUser.displayName);

                toast('verification email sent !');
                // auth.signOut();
                navigate('/login');
                
            })
            .catch(error => {
                toast.error(error.message);
            })
            setProgress(false);
    }

    return <div>
        <div className='sm:flex-wrap lg:flex  h-screen'>
            
            <div className='bg-[#F6FCFC] lg:w-1/2 sm:w-full h-full'>
                <div className='lg:mx-32 lg:pt-16 mx-20 pt-16'>
                    <Link to="/">
                    <h1 className='font-bold text-5xl pt-2 text-[#09748A]'>
                        <span className='inline-block align-middle p-0 '>
                            <GlobeIcon />
                        </span>
                        <span className='mt-4 font-mono'>
                            Uptodo
                        </span>
                    </h1>
                    </Link>
                    <h1 className='text-5xl mt-16 font-semibold font-mono'>Boost <span className='text-5xl align-middle ml-2 animate-bounce'>🚀</span> Your</h1>
                    <h1 className='text-5xl mt-2 font-semibold font-mono text-[#09748A]'>Productivity </h1>
                    <div>
                        <Quote id={quotes[1].id} text={quotes[1].text} author={quotes[1].author} />
                    </div>
                </div>
            </div>
            <div className='bg-white lg:w-1/2 sm:w-full h-full'>
                <form className='lg:mx-40 lg:pt-24 mx-10 pt-10' onSubmit={handleSubmit} >
                    <h1 className='text-4xl text-[#083A41] my-2 font-semibold'>Join us</h1>
                    <button className='rounded text-zinc-800 shadow p-0 my-2 w-full hover:bg-slate-100' >
                        <span className='inline-block'>
                              <img className='h-8 w-auto' src={GoogleLogo} alt="Google Logo" />
                        </span>
                       <span className='inline-block align-top p-1'>Register with Google </span> 
                    </button>
                    <Input type='email' title='Email Address' placeholder='enter email' value={email} setValue={setEmail} required={true} />
                    <Input type='password' title='Password' placeholder='set password' value={password} setValue={setPassword} required={true} />
                    <Input type='text' title='Username' placeholder='set username' value={username} setValue={setUsername} required={true} />
                    {/* <span className='text-xs float-right mr-4 hover:underline hover:cursor-pointer'>forget password?</span> */}
                    <button disabled={progress} type='submit' className='bg-[#09748a] flex content-center justify-center w-full mt-4 px-4 py-2 text-white rounded font-medium uppercase shadow '>
                       <SpinIcon className={progress === true ? "" : "hidden"} /> 
                       <div>Register</div> 
                    </button>
                    <div className='text-center mt-1'>
                        <h1>Already have account? 
                            <Link to="/login">
                            <span className='text-[#6AA7B3] hover:underline hover:cursor-pointer'> Login here</span>
                            </Link>
                            </h1>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}

export default Register;
