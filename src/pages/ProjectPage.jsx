import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddTask from "../components/project/AddTask";
import ProjectContainer from "../components/project/ProjectContainer";

function ProjectPage({ projectId, setProjectId }) {

  

  const [showModal,setShowModal] = useState(true);
  const [labelList,setLabelList] = useState([
    {id:'l1',name:"developmnt"},
    {id:"l2",name:"production"},
    {id:'l3',name:"game"},
    {id:"l4",name:"bug"},
    {id:'l5',name:"improvment"},
    {id:"l6",name:"testing"},
  ]);

  const [priorityList,setPriorityList]  = useState([
    {id:"1", name:"Priority 1"},
    {id:"2" , name:"Priority 2"},
    {id:"3" , name:"Priority 3"},
    {id:"4" , name:"Priority 4"}
  ]);

  return (
    <div className="w-full h-full bg-slate-400">
      <div className="flex flex-col ">
        <div className="h-[70px]">
          <div>project paje</div>
          <span>{projectId}</span>
        </div>
        <div className="h-[calc(100vh_-_118px)] overflow-hidden bg-black">
          <ProjectContainer projectId={projectId} />
          <AddTask show={showModal} setModal={setShowModal} labelList={labelList} priorityList={priorityList} />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
