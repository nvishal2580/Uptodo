import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/logos/404_page.svg';

function NotFound() {
    return <div className='h-screen '>
        <div className="flex">
            <div>
                <img className='h-screen' src={PageNotFound} alt="404...page not found!" />
            </div>
            <div className=''>
                <div className='inline-box pt-8 float-left '>
                    <h1 className='font-bold text-9xl text-[#58aedd]'>
                        Page Not found!
                    </h1>
                    <Link to='/'>
                    <button href="/" className='p-4 mt-20 border-2 rounded-md text-xl font-semibold shadow ' >
                        GO HOME
                    </button>
                    </Link>
                </div>
            </div>
        </div>

    </div>;
}

export default NotFound;
