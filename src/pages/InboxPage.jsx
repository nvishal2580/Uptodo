import {
  collection, deleteDoc, doc, getDocs, query, setDoc,
  updateDoc, where
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import CheckIcon from "../assets/icons/CheckIcon";
import DotsHorizontal from "../assets/icons/DotsHorizontal";
import TrashIcon from "../assets/icons/TrashIcon";
import No_data from "../assets/logos/No_data.svg";
import Spinner from "../components/common/Spinner";
import { auth, db } from "../services/firebase/firebase";
import InboxCompleted from "./InboxCompleted";

function InboxPage() {
  const inputRef = useRef(null);
  // const docRef = doc(db, 'users', auth.currentUser.uid, 'Inbox');
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Task 1",
    //   iat: new Date(),
    //   isCompleted: false,
    // },
    // {
    //   id: 2,
    //   title: "Task 2",
    //   iat: new Date(),
    //   isCompleted: true,
    // },
    // {
    //   id: 3,
    //   title: "Task 3",
    //   iat: new Date(),
    //   isCompleted: false,
    // },
  ]);

  const [isProcess, setIsProcess] = useState(true);
  
  const getCompletedTasks = () => {

  }

  const getData = async () => {
    const taskList = [];
    const q = query(
      collection(db, "users", auth.currentUser.uid, "Inbox")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      taskList.push(doc.data());
    });
    setTasks(taskList);
    console.log("inbox page data fatched from database");
    setIsProcess(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleToggleTask = async (id) => {
    const task = tasks.find((task) => task.id === id);
    task.isCompleted = !task.isCompleted;
    const newTasks = tasks.filter((task) => task.id !== id);
    const newTaskList = [...newTasks, task];

    try {
      // storing as a subcollection inbox to track tasks and perform operations
      // const randomId = uuid();

      await updateDoc(doc(db, "users", auth.currentUser.uid, "Inbox", id), {
        ...task,
      });
      setTasks(newTaskList);
    } catch (error) {
      toast.error("something went wrong!");
    }

    setTasks(newTaskList);
  };

  const handleDeleteCompletedTask = async () => {
    const newTaskList = [];
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "Inbox"),
      where("isCompleted", "==", true)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(doc) => {
      
      if(doc.data().isCompleted === true) await deleteDoc(doc.ref);
  });
    const newTasksList = tasks.filter((task) => task.isCompleted === false);
    setTasks(newTasksList);
  } catch (error) {
    toast.error("something went wrong!");
    console.log(error);

  }
    
  }

  const handleAddTask = async () => {
    const newTask = inputRef.current.value;

    if (newTask === "") {
      toast.error("Please enter a task");
      return;
    }
    const randomId = uuid();
    const newTaskList = [
      ...tasks,
      { id: randomId, title: newTask, iat: new Date(), isCompleted: false },
    ];
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid, "Inbox", randomId), {
        title: newTask,
        iat: new Date(),
        id: randomId,
        isCompleted: false,
      });
      setTasks(newTaskList);
    } catch (error) {
      toast.error("something went wrong!");
    }
    inputRef.current.value = "";
  };

  const handleDeleteTask = async (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "Inbox", id));
    } catch (error) {
      toast.error("something went wrong!");
    }
    setTasks(newTaskList);
  };

  return (
    <div className="pr-40 pt-10 pl-20">
      {isProcess && (<Spinner />)}
      <div className="flex border-b-[1px] border-b-gray-400 items-center ">
        <div className="text-4xl font-semibold grow ">Inbox</div>
        <button
          onClick={() => setShowModal(!showModal)}
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 active:outline-none"
        >
          Show Completed
        </button>
        <div>
          <button className="p-2 rounded-full hover:bg-slate-300">
            <DotsHorizontal />
          </button>
        </div>
      </div>
      <div className=" bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-4xl">
        <div className="flex">
          <div className="w-full">
            <input
              ref={inputRef}
              type="text"
              className="shadow appearance-none border rounded-md w-full py-2 px-3 mr-4 text-grey-darker outline-gray-400"
              placeholder="Add Todo"
            />
          </div>
          <button
            onClick={handleAddTask}
            className="mx-2 text-white   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  bg-[#6C63FF] hover:bg-[#574ff9]"
          >
            ADD
          </button>
        </div>
        <div className="pt-6 max-h-[500px] overflow-y-auto">
          {tasks.map(
            (task) =>
              task?.isCompleted === false && (
                <div key={task.id} className="flex mx-6 py-2 border-b-[1px] border-gray-400">
                  <div>
                    <span>{task.title}</span>
                  </div>
                  <div className="grow"></div>
                  <button
                    onClick={() => handleToggleTask(task.id)}
                    className="mx-2 hover:text-green-700 hover:font-bold rounded-full"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="mx-2 hover:text-red-700"
                  >
                    <TrashIcon />
                  </button>
                </div>
              )
          )}
          {tasks.length === 0 && (
            <div className="flex justify-center">
              <img
                className="h-96 "
                src={No_data}
                alt="404...page not found!"
              />
            </div>
          )}
          {showModal &&  <InboxCompleted handleDeleteCompletedTask={handleDeleteCompletedTask} showModal={showModal} setShowModal={setShowModal} tasks={tasks} handleDeleteTask={handleDeleteTask} handleToggleTask={handleToggleTask} />}
        </div>
      </div>
    </div>
  );
}

export default InboxPage;
