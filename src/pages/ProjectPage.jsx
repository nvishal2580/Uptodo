import React, { useEffect, useState } from "react";
import AddTask from "../components/project/AddTask";
import ProjectContainer from "../components/project/ProjectContainer";
import {v4 as uuidv4} from 'uuid';
import data from "../components/project/InitialData";
import {collection, onSnapshot,doc,runTransaction, Firestore, setDoc,updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import { db } from "../services/firebase/firebase";
import _, { isEqual } from 'lodash';
import { toast } from "react-toastify";
import ChatAltIcon from "../assets/icons/ChatAltIcon";
import UserIcon from "../assets/icons/UsersIcon";
import DotsHorizontal from "../assets/icons/DotsHorizontal";
import ManageTeam from "../components/project/ManageTeam";
import { Route, Routes ,useParams} from "react-router-dom";


function ProjectPage({ projectId, setProjectId }) {

  const [showModal,setShowModal] = useState(false);
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

  const params = useParams()
  console.log(params);
  
  const [tasks, setTasks] = useState(data.tasks);
  const [columns, setColumns] = useState(data.colums);
  const [columnOrder, setColumnOrder] = useState(data.columnOrder);
  const [loading, setLoading] = useState(true);
  const [addType,setAddType] = useState(null); // used to store in which column we have to add task
  const [title,setTitle] = useState("");
  const [membersList,setMembersList] = useState([]);
  const [waitList,setWaitList] = useState([]);
  const [showTeam,setShowTeam] = useState(false);
  const [adminId,setAdminId] = useState(null);

  useEffect(()=>{
      setLoading(true);
      console.log('project id : ',projectId);
      if(projectId === null || projectId === undefined || projectId.length < 2) return;
      const unsub = onSnapshot(doc(db,'projects',projectId),(snapshot) => {
         const data = snapshot.data();
         if(data === undefined) return;
         if(_.isEqual(data.tasks,tasks) && _.isEqual(data.columns,columns) && _.isEqual(data.columnOrder,columnOrder) && isEqual(data.membersList,membersList) && isEqual(data.waitingList,waitList)){
           console.log('got equal on listeners');
           return;
         }
         console.log('data got',data);
         setTasks(data.tasks);
         setColumns(data.columns);
         setColumnOrder(data.columnOrder);
         setTitle(data.projectName);
         setMembersList(data.membersList)
         setWaitList(data.waitingList);
         setAdminId(data.adminId);
      });
      setLoading(false);
    return () => unsub();
  },[projectId])

  const handleAddTask = async (columnId, taskItem) => {
    console.log(columnId, taskItem);
    
    const newTaskList = {
      ...tasks,
      [taskItem.id]: taskItem,
    };

    let col = columns[columnId];
    let newTaskIds = [...col.taskIds, taskItem.id];
    col = { ...col, taskIds: newTaskIds };
    console.log(col);

    let newColumns = { ...columns };
    newColumns = { ...newColumns, [columnId]: col };

    // setTasks(newTaskList);
    // setColumns(newColumns);
    const projectRef = doc(db,'projects',projectId);
    try {
      await updateDoc(projectRef,{columns:newColumns,tasks:newTaskList});
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
  };

  const handleDeleteColumn = (columnId) => {
    const col = columns[columnId];
    const taskIds = col.taskIds;
    let newTasks = { ...tasks };
    taskIds.forEach((taskId) => {
      delete newTasks[taskId];
    });
    let newColumns = { ...columns };
    delete newColumns[columnId];
    const newColumnOrder = columnOrder.filter((colId) => colId !== columnId);
    setTasks(newTasks);
    setColumns(newColumns);
    setColumnOrder(newColumnOrder);
  };

  const handleDeleteTask = (taskId, columnId) => {
    console.log(columnId, taskId);

    let newTasks = { ...tasks };
    delete newTasks[taskId];
    const newTaskIds = columns[columnId].taskIds.filter((id) => id !== taskId);
    const newColumn = columns;
    newColumn[columnId].taskIds = newTaskIds;
    const newColumnOrder = [...columnOrder];
    setColumns(newColumn);
    setTasks(newTasks);
    setColumnOrder(newColumnOrder);
    console.log(newTasks);
    console.log(newColumn);
  };

  console.log("index.js rendered");

  const handleAddColumn = async(title) => {
    setLoading(true);
    const Id = uuidv4().toString();
    const newColumn = {
      id: Id,
      title: title,
      taskIds: [],
    };

    const newColumns = {
      ...columns,
      [Id]: newColumn,
    };
    const newColumnOrder = [...columnOrder, Id];
    // setColumns(newColumns);
    // setColumnOrder(newColumnOrder);

    const projectRef = doc(db,'projects',projectId);

    try {
       await updateDoc(projectRef,{columns:newColumns,columnOrder:newColumnOrder});
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setShowModal(false);
  };

  const handleSetAddType = (data) => {
    // console.log('clicked ',data);
    setAddType(data);
    setShowModal(true);
  }

  const handleEditTask = () => {

  }

  const handleMenuClick = (item) => {
    console.log(item);
    if(item.type === 'task'){
      if(item.name === 'Edit'){
        handleEditTask();
        return;
      }
      if(item.name==='Delete'){
        handleDeleteTask(item.taskId,item.columnId);
        return;
      }
      return;
    }

    // now we just have to handle column dropdown menu options

    if(item.name === "Edit"){

      return;
    }
    if(item.name === "Delete"){
      console.log('inside handle menu click options');
      handleDeleteColumn(item.columnId);
      return;
    }

  }

  const hadleAddMember = async(newProject,member) => {

    try {

      await updateDoc(doc(db,'projects',newProject.id),{
        membersList:arrayUnion(member)
      })

      await setDoc(doc(db,'users',member.id,'projects',newProject.id),{
        projectName:newProject.title,
        projectId:newProject.id,
      })
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  const handleRejectRequest =async(projectId,member) => {
    try {
      await updateDoc(doc(db,'projects',projectId),{
        waitingList:arrayRemove(member)
      })
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  const menuitems = [
    {type:"task", name:"Edit",id:"1"},
    {type:"task",name:"Delete",id:"2"},
  ];

  const columnMenuItems = [
    {type:"column",name:"Edit",id:"1"},
    {type:"column",name:"Delete",id:"2"}
  ]

  

  return (
    <div className="w-full h-full bg-[#f0f1f5]">
      {loading && <div className="h-full grow flex justify-center items-center" ><div class="animate-spin rounded-full w-20 h-20 border-4 border-b-blue-400 border-solid"></div></div>}
      {!loading && <div className={`flex flex-col `}>
        <div className="h-[62px] flex items-center ml-6 mb-2 pr-20 border-b-[1px] border-b-slate-300">
          <div className="grow ml-5">
            <span className="text-2xl font-bold overflow-ellipsis">{title}</span>
          </div>
          <div>
            <button className="p-2 ml-5 flex">
              <ChatAltIcon />
              <span className="ml-1">Chat</span>
            </button>
          </div>
          <div>
            <button className="p-2 ml-5 flex" onClick={() => setShowTeam(true)} >
              <UserIcon />
              <span className="ml-1">Team</span>
            </button>
          </div>
          <div>
            <button className="p-2 ml-5">
              <DotsHorizontal />
            </button>
          </div>
        </div>
        <div className="h-[calc(100vh_-_118px)] overflow-hidden">
          <ProjectContainer projectId={projectId} columnItemList={columnMenuItems} ItemList={menuitems} handleMenuClick={handleMenuClick} handleSetAddType={handleSetAddType} columnOrder={columnOrder} setColumnOrder={setColumnOrder} columns={columns} setColumns={setColumns} tasks={tasks} setTasks={setTasks} handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} handleAddColumn={handleAddColumn} />
          {showModal && <AddTask type={addType} handleAddColumn={handleAddColumn} handleAddTask={handleAddTask} show={showModal} setModal={setShowModal} labelList={labelList} priorityList={priorityList} />}
        </div>
        <div className="h-screen">
        {showTeam && <ManageTeam adminId={adminId} handleRejectRequest={handleRejectRequest} setShowTeam={setShowTeam} membersList={membersList} waitingList={waitList} projectId={projectId} projectTitle={title} hadleAddMember={hadleAddMember}  />}
        </div>
      </div>}
    </div>
  );
}

export default ProjectPage;
