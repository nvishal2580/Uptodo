import React from 'react';

import SideLink from './SideLink';
import SideItem from './SideItem';
import InboxIcon from '../../assets/icons/InboxIcon';
import CalenderIcon from '../../assets/icons/CalenderIcon';
import ChevronRight from "../../assets/icons/ChevronRight";
import DotsHorizontal from '../../assets/icons/DotsHorizontal';
import LogoutIcon from "../../assets/icons/LogoutIcon";
import Hashtag from '../../assets/icons/Hashtag';
import ChevronLeftDouble from '../../assets/icons/ChevronLeftDouble';



function SideNav({projectId,setShowModal,openMenu,setOpenMenu,projectList,handleLogout,setShowSidebar}) {
  return (
    <div className=" h-screen pl-6 py-4 flex flex-col bg-[#F3F6FA]">
          <div className=" pl-3 flex items-center">
            <div className='grow'>
              <span className="font-mono font-extrabold text-3xl">Uptodo</span>
            </div>
            <div className='mr-5'>
              <button onClick={() => setShowSidebar(false)} >
                  <ChevronLeftDouble />
              </button>
            </div>
          </div>
          <div className="mt-7 pl-3 pr-5">
            <button
              onClick={() => setShowModal(true)}
              className="w-full rounded bg-purple-600 text-white py-2"
            >
              Add Project
            </button>
          </div>
          <div className=" mt-6">
            <SideLink
              projectId={projectId}
              data={{ projectName: "Inobx", projectId: "inbox" }}
              Icon={InboxIcon}
            />
            <SideLink
              projectId={projectId}
              data={{ projectName: "Daily" }}
              Icon={CalenderIcon}
            />
            <SideLink
              projectId={projectId}
              data={{ projectName: "Upcoming" }}
              Icon={InboxIcon}
            />
          </div>
          <div className="mt-2 pt-6">
            <div className=" pl-3">
              <div className="flex w-full py-2 border-2">
                <button className="grow" onClick={() => setOpenMenu(!openMenu)}>
                  <div className="inline-block mr-4 float-left">
                    <ChevronRight
                      className={
                        openMenu === true
                          ? "h-6 w-6 rotate-90 duration-300"
                          : "h-6 w-6 rotate-0 duration-300 "
                      }
                      strokeWidth={2}
                    />
                  </div>
                  <div className="grow text-left text-lg ">Project</div>
                </button>
                <div>
                <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-800 bg-gray-200 rounded-full">{projectList.length > 0 ? projectList.length : ""}</span>
                </div>
              </div>

              <div
                id="dropdown_box"
                className={`transition-all duration-300  overflow-hidden overflow-x-hidden hover:overflow-y-auto ${openMenu ? 'h-64 ease-in' : 'h-0 ease-out'}`}
              >
                {projectList.map((item) => (
                  <SideItem
                    projectId={projectId}
                    key={item.projectId}
                    data={item}
                    Icon={Hashtag}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pl-3 absolute bottom-2 pt-2 ">
            <button className="flex " onClick={handleLogout}>
              <LogoutIcon strokeWidth="2" />
              <h1 className="pl-3 font-mono font-semibold">Logout</h1>
            </button>
          </div>
        </div>
  )
}

export default SideNav