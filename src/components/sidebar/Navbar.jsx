import React from "react";
import { useNavigate } from 'react-router-dom';
import BellIcon from "../../assets/icons/BellIcon";
import ChevronRightDouble from "../../assets/icons/ChevronRightDouble";
import CogIcon from "../../assets/icons/CogIcon";
import UserCircle from "../../assets/icons/UserCircle";
import { auth } from "../../services/firebase/firebase";

function Navbar({setShowSidebar,showSidebar}) {

  const navigate = useNavigate();

  return (
    <div className="flex w-full bg-white h-12 py-2 items-center ">
      { !showSidebar && <div className="ml-5 rounded-full hover:bg-slate-100 p-1 transition-all">
        <button onClick={() => setShowSidebar(true)}>
           <ChevronRightDouble />
        </button>
      </div>}
      <div id="searchbar" className="grow">
        {/* <div className=" relative mx-auto text-gray-600 ">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"  type="search" name="search" placeholder="Search" />  
                    <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                      <SearchIcon className="h-6 w-6" strokeWidth={1} />
                     </button>
                  </div> */}
      </div>
      <div className="mr-1 font-bold font-mono bg-slate-100 px-2 rounded-full flex items-center">
        <span>{auth.currentUser.displayName}</span>
      </div>
      <div className="px-2 mx-1">
        <button>
          <BellIcon className="w-6 h-6" strokeWidth={1} />
        </button>
      </div>
      <div className="px-2 mx-1">
        <button>
          <CogIcon className="w-6 h-6 hover:animate-spin" strokeWidth={1} />
        </button>
      </div>
      <div className="px-2 mx-1 ">
        <button onClick={() => navigate('/app/profile')}>
          <UserCircle className="w-6 h-6 " strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
