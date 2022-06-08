import React,{useState,useEffect} from 'react';
import { Link, NavLink,useParams } from 'react-router-dom';
import DotsHorizontal from '../../assets/icons/DotsHorizontal';

function SideItem({Icon,data,projectId}) {

  const [isActive ,setActive] = useState(false);
  const params=useParams();

  useEffect(() => {
    if(projectId && projectId === data.projectId){
      setActive(true);
      console.log('active set ',projectId);
    }else{
      setActive(false);
    }
  },[projectId])

  return <div className={`flex group pl-3 py-2 w-full items-center rounded-l-md hover:bg-slate-200 cursor-pointer  ${isActive ? 'border-r-4 bg-white border-r-gray-700 font-semibold' : ''}`}>
      {/* <button className='flex items-center' > */}
      <Link to={`project/${data.projectId}`} className='flex items-center' >
      <div className='h-full align-middle'>
          <Icon strokeWidth={isActive? "2":""}  />
      </div>
      <div className={`pl-3 text-lg grow text-left w-full ${isActive ? 'font-semibold' : ''}`}>{data.projectName}</div>
        
      </Link>
      {/* </button> */}
      <div className='grow'>{""}</div>
      <button className='  hidden group-hover:block'>
        <DotsHorizontal />
      </button>
  </div>;
}

export default SideItem;
