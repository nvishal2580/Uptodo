import React from "react";
import TeamImage from "../assets/logos/Team.jpg";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#FEFEFE]">
      {/* <h1 className='text-3xl my-12'>welcome to Uptodo App</h1>
        <Link to='/login'>
            <button className='bg-indigo-500 m-5 px-4 py-2 text-white rounded font-medium uppercase shadow hover:bg-indigo-400'>
                Login
            </button>
        </Link>
        <Link to="/register">
            <button className='bg-gray-500 m-5 px-4 py-2 text-white rounded font-medium uppercase shadow hover:bg-gray-400'>
                Register
            </button>
        </Link> */}
      <div className="flex">
        <div className="w-6/12 pl-32 pt-4">
          <span className="font-extrabold underline decoration-[#211D40] font-mono text-6xl text-[#E62552]">
            Uptodo
          </span>
          <div className="mt-20   text-7xl font-bold ">
            
            <span className="underline decoration-sky-500">A Collaborative </span>{" "}
            <span className="underline decoration-yellow-500">Task</span>{" "}
            <span className="underline decoration-red-500"> Mangaement</span> 
            
            <div className="underline decoration-[#3F964F]">Application</div>
          </div>
          <p className="mt-8 font-light text-lg">
            Alternative way of organising and planning your work to make sure it
            will be done.
          </p>
          <Link to='/login'>
            <button className='bg-[#343CB2] mt-8 px-4 py-2 text-white rounded-full font-semibold hover:underline hover:decoration-red-500 shadow-lg'>
                Gets Started
            </button>
        </Link>
        </div>
        <div className="w-6/12">
          <img src={TeamImage} alt="team" className="bg-cover" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
