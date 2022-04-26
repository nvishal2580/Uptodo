import React, { useEffect, useState } from "react";
import AddTask from "../components/project/AddTask";
import ProjectContainer from "../components/project/ProjectContainer";
import {v4 as uuidv4} from 'uuid';
import data from "../components/project/InitialData";
import {collection, onSnapshot,doc,runTransaction, Firestore, setDoc,updateDoc, arrayUnion, arrayRemove, deleteDoc, FieldValue, deleteField} from 'firebase/firestore'
import { auth, db } from "../services/firebase/firebase";
import _, { isEqual } from 'lodash';
import { toast } from "react-toastify";
import ChatAltIcon from "../assets/icons/ChatAltIcon";
import UserIcon from "../assets/icons/UsersIcon";
import DotsHorizontal from "../assets/icons/DotsHorizontal";
import ManageTeam from "../components/project/ManageTeam";
import { Route, Routes ,useParams} from "react-router-dom";
import TaskModal from "../components/project/TaskModal";


function ProjectPage({ projectId, setProjectId }) {

  const [showModal,setShowModal] = useState(false);
  const [showTask,setShowTask] = useState(null);

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
  
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnOrder, setColumnOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addType,setAddType] = useState(null); // used to store in which column we have to add task
  const [title,setTitle] = useState("");
  const [membersList,setMembersList] = useState([]);
  const [waitList,setWaitList] = useState([]);
  const [showTeam,setShowTeam] = useState(false);
  const [admin,setAdmin] = useState(null);

  useEffect(()=>{
      setLoading(true);
      console.log('project id : ',projectId);
      if(projectId === null || projectId === undefined || projectId.length < 2) return;
      const unsub = onSnapshot(doc(db,'projects',projectId),(snapshot) => {
         const data = snapshot.data();
         if(data === undefined) return;
         if(_.isEqual(data.tasks,tasks) && _.isEqual(data.columns,columns) && _.isEqual(data.columnOrder,columnOrder) && _.isEqual(data.membersList,membersList) && isEqual(data.waitingList,waitList) && isEqual(data.labelList,labelList)){
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
         setAdmin(data.admin);
         setLabelList(data.labelList);
      });
      setLoading(false);
    return () => unsub();
  },[projectId])

  const handleAddTask = async (columnId, taskItem) => {
    console.log(columnId, taskItem);

    const key = uuidv4();
    const taskItemCopy = {...taskItem,key:key}
    const newTaskList = {
      ...tasks,
      [taskItem.id]: taskItemCopy,
    };

    let col = columns[columnId];
    let newTaskIds = [...col.taskIds, taskItem.id];
    col = { ...col, taskIds: newTaskIds };
    console.log(col);

    let newColumns = { ...columns };
    newColumns = { ...newColumns, [columnId]: col };

    const projectRef = doc(db,'projects',projectId);
    try {

      await setDoc(doc(db,'tasks',key),{comments:[],subtasks:[],labels:[],members:[],createdBy:{name:auth.currentUser.displayName,id:auth.currentUser.uid}});

      await updateDoc(projectRef,{columns:newColumns,tasks:newTaskList});
    } catch (error) {
      console.log(error);
    }

    setShowModal(false);
  };

  const handleDeleteColumn = async(columnId) => {

    const col = columns[columnId];
    const taskIds = col.taskIds;

    if(taskIds.length > 0){
      toast.info('Remove all column tasks first');
      return;
    }

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

    

    try {

      await db.collection('projects').doc(projectId).update({
          columnOrder:newColumnOrder,
          columns : newColumns,
      })
      
    } catch (error) {
      toast.error('something went wrong');
      console.log(error);
    }


  };

  const handleDeleteTask =async (taskId, columnId) => {
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

    try {
      if(tasks[taskId].key){
        console.log('task key found');
        await deleteDoc(doc(db,'tasks',tasks[taskId].key));
      }
      await db.collection('projects').doc(projectId).update({
        [`columns.${columnId}.taskIds`] : arrayRemove(taskId),
        [`tasks.${taskId}`] : deleteField()
      })
    } catch (error) {
      toast.error('something went wrong');
      console.log('this is error ',error);
    }

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
      toast.info('comming soon');
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
      toast.info('comming soon');
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
        waitingList:arrayRemove(member)
      })
      
      await updateDoc(doc(db,'projects',newProject.id),{
        membersList:arrayUnion(member)
      })


      await setDoc(doc(db,'users',member.id,'projects',newProject.id),{
        projectName:newProject.title,
        projectId:newProject.id,
      })
    } catch (error) {
      toast.error('Something went wrong',error);
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

  const handleAddLabel = async(labelName) => {
    const temp = {
      id : uuidv4(),
      name:labelName
    }
    await updateDoc(doc(db,'projects',projectId),{
      labelList: arrayUnion(temp)
    })

  }

  
  return (
    <div className="w-full h-full bg-[#f0f1f5]">
      {loading && <div className="h-full grow flex justify-center items-center" ><div class="animate-spin rounded-full w-20 h-20 border-4 border-b-blue-400 border-solid"></div></div>}
      {!loading && <div className={`flex flex-col `}>
        <div className="h-[62px] flex items-center ml-6 mb-2 pr-20 border-b-[1px] border-b-slate-300">
          <div className="grow ml-5">
            <span className="text-2xl font-bold overflow-ellipsis">{title}</span>
          </div>
          <div>
            <button className="p-2 ml-5 flex" onClick={() => toast.info('comming soon')} >
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
          <ProjectContainer projectId={projectId} setShowTask={setShowTask} columnItemList={columnMenuItems} ItemList={menuitems} handleMenuClick={handleMenuClick} handleSetAddType={handleSetAddType} columnOrder={columnOrder} setColumnOrder={setColumnOrder} columns={columns} setColumns={setColumns} tasks={tasks} setTasks={setTasks} handleAddTask={handleAddTask} handleDeleteTask={handleDeleteTask} handleAddColumn={handleAddColumn} />
          {showModal && <AddTask type={addType} handleAddLabel={handleAddLabel} handleAddColumn={handleAddColumn} handleAddTask={handleAddTask} show={showModal} setModal={setShowModal} labelList={labelList} priorityList={priorityList} />}
        </div>
        <div className="h-screen">
        {showTeam && <ManageTeam admin={admin} handleRejectRequest={handleRejectRequest} setShowTeam={setShowTeam} membersList={membersList} waitingList={waitList} projectId={projectId} projectTitle={title} hadleAddMember={hadleAddMember}  />}
        </div>
        <div className="h-screen">
        {showTask !== null && <TaskModal membersList={membersList} projectId={projectId} labelList={labelList}  task={showTask} setShowTask={setShowTask} handleAddLabel={handleAddLabel} />}
        </div>
      </div>}
    </div>
  );
}

export default ProjectPage;
