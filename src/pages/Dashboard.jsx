import React, { useEffect, useState } from 'react';
import InboxIcon from '../assets/icons/InboxIcon';
import CalenderIcon from '../assets/icons/CalenderIcon';
import LogoutIcon from '../assets/icons/LogoutIcon';
import UserCircle from '../assets/icons/UserCircle';
import ChevronRight from '../assets/icons/ChevronRight'
import Hashtag from '../assets/icons/Hashtag';
import CogIcon from '../assets/icons/CogIcon';
import BellIcon from '../assets/icons/BellIcon';
import SideItem from '../components/sidebar/SideItem';
import AddIcon from '../assets/icons/AddIcon';
import ProjectPage from './ProjectPage'
import { auth, db } from '../services/firebase/firebase';
import { Routes, useNavigate,Route,useParams } from 'react-router-dom';
import {collection,doc,getDoc,getDocs,setDoc} from 'firebase/firestore';
import InboxPage from './InboxPage';
import SideLink from '../components/sidebar/SideLink';
// import {InboxIcon } from '@heroicons/react/outline';

function Dashboard() {

  const [projectList,setProjectList] = useState([{projectName:'test1',projectId:'1234'},{projectName:'test2',projectId:"4321"}]);
  const [openMenu, setOpenMenu] = useState(false);
  const [projectId,setProjectId] = useState('inbox');
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);
  useEffect(() => {
    const newProjectId = params['*'].split('/')[1];
     if(projectId !== newProjectId){
      setProjectId(newProjectId);
      console.log('projectId set');
     }
     
  },[params])

  useEffect( () => {

    const getUserData =  async () => {
      const collectonRef = collection(db,'users');
      const docRef = doc(db,'users',auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const projectRef = collection(db,'users',auth.currentUser.uid,'projects');
      const projectSnap = await getDocs(projectRef);
      // console.log(projectRef.data());
      let dataList = [];
      projectSnap.forEach(element => {
        dataList.push(element.data());
        console.log(element.data());
      })

      setProjectList(dataList);
    }
    // getUserData();

  },[])

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  }

  return <div className='w-full h-screen overflow-hidden'>
    <div className='flex '>
      <div className='w-1/6 h-screen pl-6 py-6 flex flex-col '>
        <div className='text-4xl font-mono font-extrabold pl-3'>
          .Uptodo
        </div>
        <div className=' mt-12'>
          <SideLink projectId={projectId} data={{projectName:"Inobx",projectId:'inbox'}} icon={<InboxIcon className="h-6 w-6" strokeWidth={1} />} />
          <SideLink projectId={projectId} data={{projectName:"Daily"}} icon={<CalenderIcon className="h-6 w-6" strokeWidth={1} />} />
          <SideLink projectId={projectId} data={{projectName:"Upcoming"}} icon={<InboxIcon className="h-6 w-6" strokeWidth={1} />} />
        </div>
        <div className='mt-2 pt-6'>
          <div className=' pl-3'>
            <div className='flex w-full py-2 border-2 border-red-400' >
            <button className="grow"  onClick={() => setOpenMenu(!openMenu)} >
              <div className='inline-block mr-4 float-left'>
                <ChevronRight className={openMenu === true ? 'h-6 w-6 rotate-90 duration-300' : 'h-6 w-6 rotate-0 duration-300 '} strokeWidth={2} />
              </div>
              <div className='grow text-left text-lg '>
                Project
              </div>
            </button>
              <button className="hover:text-red-400 mr-2 py-1 px-4 "  >
                  <AddIcon className="w-7 h-7" strokeWidth={2} />
              </button>
            </div>

            <div id="dropdown_box" className={openMenu === true ? 'bg-pink-500 transform scale-100 h-[400px] transition ease-in  duration-1000 overflow-y-auto scrollbar-hide' : 'scrollbar-hide h-0 hidden transform scale-0 transition ease-in-out duration-1000 overflow-y-scroll'}>
              
              {projectList.map(item => (
                <SideItem projectId={projectId} key={item.projectId} data={item} icon={<Hashtag className="h-6 w-6" strokeWidth={1} />} />
              ))}
            </div>
          </div>
        </div>
        <div className='pl-3 absolute bottom-2 pt-2 '>
          <button className='flex ' onClick={handleLogout}>  
            <LogoutIcon strokeWidth='2' />
            <h1 className='pl-3 font-mono font-semibold'>Logout</h1>
          </button>
        </div>
      </div>
      <div className='w-5/6  bg-gray-200'>
        <div className='h-full'>
          <div className='flex w-full bg-white h-12 py-2'>
             <div id='searchbar' className='grow'>
                  {/* <div className=" relative mx-auto text-gray-600 ">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"  type="search" name="search" placeholder="Search" />  
                    <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                      <SearchIcon className="h-6 w-6" strokeWidth={1} />
                     </button>
                  </div> */}
             </div>
             <div className='mr-1 font-bold font-mono bg-slate-100 px-2 rounded-full flex items-center'><span >{"Vishal Nagar"}</span></div>
             <div className='px-2 mx-1'>
               <button>
               <BellIcon className='w-6 h-6' strokeWidth={1} />
               </button>
             </div>
             <div className='px-2 mx-1'>
               <button>
               <CogIcon className='w-6 h-6 hover:animate-spin' strokeWidth={1} />
               </button>
             </div>
             <div className='px-2 mx-1 '>
               <button >
               <UserCircle className='w-6 h-6 ' strokeWidth={1}  />
               </button>
             </div>
          </div>
          <div className="">
             <Routes>
               <Route path="/inbox"  element={ <InboxPage />}></Route>
               <Route path='/project/:id' element={ <ProjectPage projectId={projectId} setProjectId={setProjectId} />} >
               </Route>
             </Routes>
          </div>
        </div>

      </div>
    </div>
  </div>;
}

export default Dashboard;
