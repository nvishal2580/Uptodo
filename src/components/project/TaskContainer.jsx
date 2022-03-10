import React, { useEffect, useState } from "react";
import _ from 'lodash';
import DotsHorizontal from "../../assets/icons/DotsHorizontal";
import LinkIcon from "../../assets/icons/LinkIcon";
import ChatIcon from "../../assets/icons/ChatIcon";
import CalenderIcon from "../../assets/icons/CalenderIcon";
import DropdownMenu from "../common/DropdownMenu";



function TaskContainer({ task, handleDeleteTask, columnId,ItemList,handleMenuClick}) {

  const [taskLabel,setTaskLabel] = useState({});

  const priority = {
    "1" : {id:"1", name:"Priority 1" , color:"bg-blue-100 text-blue-800",},
    "2":{id:"2" , name:"Priority 2" ,color:"bg-cyan-100 text-cyan-800"},
    "3":{id:"3" , name:"Priority 3",color:"bg-purple-100 text-purple-800"},
    "4":{id:"4" , name:"Priority 4", color:"bg-green-100 text-green-800"}
  }

  const labelList = [
    {id:'l1',name:"developmnt"},
    {id:"l2",name:"production"},
    {id:'l3',name:"game"},
    {id:"l4",name:"bug"},
    {id:'l5',name:"improvment"},
    {id:"l6",name:"testing"},
  ];

  const priorityList = [
    {id:"1", name:"Priority 1"},
    {id:"2" , name:"Priority 2"},
    {id:"3" , name:"Priority 3"},
    {id:"4" , name:"Priority 4"}
  ]



  return (
    <div className="flex group flex-col">

      <div className="flex  ">
        <div className="grow mb-2" >
          <span className={`p-1 text-sm font-medium bg-red-300 text-red-900 rounded`} >bug</span>
        </div>
        <div className="hidden group-hover:block">
          <button>
          <span>
            <DropdownMenu ItemList={ItemList} handleSubmit={handleMenuClick} columnId={columnId} task={task} />
          </span>
          </button>
        </div>
      </div>
      <div className="mt-1">
        <span className="font-semibold text-base ">{_.startCase(_.toLower(task.title))}</span>
      </div>
      <div className="max-h-20  overflow-hidden overflow-ellipsis">
        <span className="text-sm leading-3 text-[#787B85] ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</span>
      </div>
      <div className="flex border-t-[1px] items-center border-t-stone-300 pt-1" >
        <div className="flex px-2 items-center">
           <span>{<ChatIcon />}</span>
           <span className="ml-1">{6}</span>
        </div>
        <div className="flex px-2 items-center">
           <span>{<LinkIcon className="w-5 h-5" />}</span>
           <span className="ml-1">{2}</span>
        </div>
        <div className="grow">{""}</div>
        <div className="flex">
            <span>{<CalenderIcon className="w-5 h-5" />}</span>
            <span className="text-sm ml-1">Nov 30</span>
        </div>
      </div>
    </div>
  );
}

export default TaskContainer;
