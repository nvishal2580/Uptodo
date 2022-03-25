import React, { useEffect, useState } from "react";
import _ from 'lodash';
import DotsHorizontal from "../../assets/icons/DotsHorizontal";
import LinkIcon from "../../assets/icons/LinkIcon";
import ChatIcon from "../../assets/icons/ChatIcon";
import CalenderIcon from "../../assets/icons/CalenderIcon";
import DropdownMenu from "../common/DropdownMenu";

var options = {  month: 'long', day: 'numeric' };

const TaskContainer = React.memo( ({ task, handleDeleteTask, columnId,ItemList,handleMenuClick,setShowTask}) => {


  const priority = {
    "1" : {id:"1", name:"Priority 1" , color:"bg-blue-600",},
    "2":{id:"2" , name:"Priority 2" ,color:"bg-cyan-600"},
    "3":{id:"3" , name:"Priority 3",color:"bg-purple-600"},
    "4":{id:"4" , name:"Priority 4", color:"bg-green-600"}
  }

  
  console.log('task i got ',task)



  return (
    <div  className="flex group flex-col" >

      <div className="flex "  >
        <div className="grow  mb-2" >
        <span className={`w-4 h-4 rounded-full ${priority[task.priority].color} inline-block`} >{""}</span>
        <span className="font-semibold text-base ml-3 ">{_.startCase(_.toLower(task.title))}</span>
        </div>
        <div className="hidden group-hover:block">
          <button>
          <span>
            <DropdownMenu ItemList={ItemList} handleSubmit={handleMenuClick} columnId={columnId} task={task} />
          </span>
          </button>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => setShowTask(task)} >
      
      <div className="max-h-20 pb-2 overflow-hidden overflow-ellipsis">
        <span className="text-sm leading-3 text-[#787B85] ">{task.description}</span>
      </div>
      <div className="flex border-t-[1px] items-center border-t-stone-300 pt-1" >
      <div className={`${task.deadline === null ? "hidden" : "flex"}`}>
            <span>{<CalenderIcon className="w-5 h-5" />}</span>
            <span className="text-sm ml-1">{task.deadline?.toDate().toLocaleDateString("en-US", options)}</span>
        </div>
        
        <div className="grow">{""}</div>
        <div className={` ${ task.deadline!== null && task.isCompleted ===false && new Date() > new Date(task.deadline.toDate()) ? "flex pr-2 pt-2 items-center" : "hidden"}`}>
           <span className="bg-red-100 text-red-700 px-1 rounded text-sm font-semibold">{"Due"}</span>
        </div>
        <div className={` ${ task.isCompleted ? "flex pr-2 pt-2 items-center" : "hidden"}`}>
           <span className="bg-green-100 text-green-700 px-1 rounded text-sm font-semibold">{"Completed"}</span>
        </div>
      </div>
      </div>
      
    </div>
  );
})

export default TaskContainer;
