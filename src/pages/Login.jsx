import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Input from "../components/common/Input";
import GoogleLogo from "../assets/logos/google_logo.svg";
import quotes from "../services/quotes";
import Quote from "../components/common/Quote";
import GlobeIcon from "../assets/icons/GlobeIcon";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    // due to use of google auth api and intigrating them with firebase we have to try different approact..
    try {
      const googleAuth = await window.gapi.auth2.getAuthInstance();
      console.log('google auth',googleAuth);
      const googleUser = await googleAuth.signIn();
      console.log('google user',googleUser);
      const token = googleUser.getAuthResponse().id_token;
      console.log('token',token);
      // const credential = Auth.GoogleAuthProvider.credential(token);
      const credential = GoogleAuthProvider.credential(token);
      console.log('credential',credential);
       auth.signInWithCredential(credential).then(() => {
         toast.success("Logged in successfully");
         navigate("/app");
         });
    } catch (error) {
      console.log(error);
    }

    // const provider = new GoogleAuthProvider();

    // provider.addScope("https://www.googleapis.com/auth/calendar");

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     console.log('token aa gya ',credential,token);
    //     // The signed-in user info.
    //     const user = result.user;

    //     navigate("/app");
    //     // ...
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     toast.error('Error while logging in with Google');
    //     // ...

    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  const handleSubmit = (e) => {
    // for user login
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (!user.emailVerified) {
          navigate("/app/verify");
          return;
        }
        navigate("/app");
      })
      .catch((error) => {
        toast.error("Invalid email or password !");
      });
  };

  return (
    <div>
      <div className="sm:flex-wrap lg:flex  h-screen">
        <div className="bg-[#F6FCFC] lg:w-1/2 sm:w-full h-full">
          <div className="lg:mx-32 lg:pt-16 mx-20 pt-16">
            <Link to="/">
              <h1 className="font-bold text-5xl pt-2 text-[#09748A]">
                <span className="inline-block align-middle p-0 ">
                  <GlobeIcon />
                </span>
                <span className="mt-4 font-mono">Uptodo</span>
              </h1>
            </Link>
            <h1 className="text-5xl mt-16 font-semibold font-mono">
              Boost{" "}
              <span className="text-5xl align-middle ml-2 animate-bounce">
                🚀
              </span>{" "}
              Your
            </h1>
            <h1 className="text-5xl mt-2 font-semibold font-mono text-[#09748A]">
              Productivity{" "}
            </h1>
            <div>
              <Quote
                id={quotes[0].id}
                text={quotes[0].text}
                author={quotes[0].author}
              />
            </div>
          </div>
        </div>
        <div className="bg-white lg:w-1/2 sm:w-full h-full">
          <div
            className="lg:mx-40 lg:mt-36 mx-10 mt-10"
            // onSubmit={handleSubmit}
          >
            <h1 className="text-4xl text-[#083A41] my-2 font-semibold">
              Welcome Back
            </h1>
            <button
              onClick={handleGoogleAuth}
              className="rounded text-zinc-800 shadow p-0 my-2 w-full hover:bg-slate-100"
            >
              <span className="inline-block">
                <img
                  className="h-8 w-auto"
                  src={GoogleLogo}
                  alt="Google Logo"
                />
              </span>
              <span className="inline-block align-top p-1">
                Login with Google{" "}
              </span>
            </button>
            <Input
              required={true}
              type="email"
              title="Email Address"
              placeholder="enter email"
              value={email}
              setValue={setEmail}
            />
            <Input
              required={true}
              type="password"
              title="Password"
              placeholder="enter password"
              value={password}
              setValue={setPassword}
            />
            <span className="text-xs float-right mr-4 hover:underline hover:cursor-pointer">
              forget password?
            </span>
            <button
              onClick={handleSubmit}
              className="bg-[#09748a] w-full mt-4 px-4 py-2 text-white rounded font-medium uppercase shadow "
            >
              Login
            </button>
            <div className="text-center mt-1">
              <h1>
                Don't have account?
                <Link to="/register">
                  <span className="text-[#6AA7B3] hover:underline hover:cursor-pointer">
                    {" "}
                    Register
                  </span>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
