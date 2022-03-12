import React from 'react';
import { Link } from 'react-router-dom';
import ManageTeam from '../components/project/ManageTeam';

function LandingPage() {
    return <div className='text-center'>
        <h1 className='text-3xl my-12'>welcome to Uptodo App</h1>
        {/* <ManageTeam /> */}
        <Link to='/login'>
            <button className='bg-indigo-500 m-5 px-4 py-2 text-white rounded font-medium uppercase shadow hover:bg-indigo-400'>
                Login
            </button>
        </Link>
        <Link to="/register">
            <button className='bg-gray-500 m-5 px-4 py-2 text-white rounded font-medium uppercase shadow hover:bg-gray-400'>
                Register
            </button>
        </Link>
    </div>;
}

export default LandingPage;
