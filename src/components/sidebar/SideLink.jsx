import React from 'react';
import { Link, NavLink,useParams } from 'react-router-dom';

function SideLink({icon,data,projectId}) {

    const params=useParams();


  return <div className={`flex group pl-3 py-2 w-full items-center  hover:bg-slate-200 cursor-pointer  ${projectId && projectId === data.projectId ? 'border-r-4 bg-slate-200 border-r-cyan-500' : ''}`}>
      {/* <button className='flex items-center' > */}
        <Link to={`${data.projectId}`} className='flex items-center' >
      <div className='h-full align-middle'>
          {icon}
      </div>
      <div className='pl-3 text-lg grow text-left '>{data.projectName}</div>
        
        </Link>
      {/* </button> */}
      <div className='grow'>{""}</div>
      <button className='bg-yellow-400  hidden group-hover:block'>
        hh
      </button>
  </div>;
}

export default SideLink;
