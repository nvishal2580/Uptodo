import React,{useState,useEffect} from 'react';
import { Link,useParams } from 'react-router-dom';
import DotsHorizontal from '../../assets/icons/DotsHorizontal';

function SideLink({Icon,data,projectId}) {

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

  return <div className={`flex group pl-3 py-2 w-full items-center rounded-l-md hover:bg-slate-200 cursor-pointer  ${isActive ? 'border-r-4 bg-[#d5e3fc] border-r-blue-500 font-semibold' : ''}`}>
      {/* <button className='flex items-center' > */}
      <Link to={`${data.projectId}`} className='flex items-center' >
      <div className='h-full align-middle'>
          <Icon strokeWidth={isActive? "2":""} />
      </div>
      <div className={`pl-3 text-lg grow text-left ${isActive ? 'font-semibold' : ''}`}>{data.projectName}</div>
        
      </Link>
      {/* </button> */}
      <div className='grow'>{""}</div>
      <button className='  hidden group-hover:block'>
        <DotsHorizontal />
      </button>
  </div>;
}

export default SideLink;
