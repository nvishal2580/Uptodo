import { doc, onSnapshot } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { auth, db } from '../services/firebase/firebase';
import DotsHorizontal from '../assets/icons/DotsHorizontal';
import CheckIcon from '../assets/icons/CheckIcon';
import Input from '../components/common/Input';


function InboxPage() {

 const [tasks,setTasks] = useState([]);
 const [newTask,setNewTask] = useState('');

  useEffect(()=>{
    const unsub = onSnapshot(doc(db,'users',auth.currentUser.uid),(snapshot)=> {
      const data = snapshot.data();
      console.log('ddta',data);
      if(data === undefined) return ;
        const tasksList = data.Inbox;
        setTasks(tasksList);
        console.log(tasksList);
    })
  },[])

  const handleToggleTask = (id) => {
    const task = tasks.find(task => task.id === id);
    task.isCompleted = !task.isCompleted;
    const newTasks = tasks.filter(task => task.id !== id);
    const newTaskList = [...newTasks,task];
    setTasks(newTaskList);
  }

  return (
    <div className='pr-40 pt-10 pl-20'>
      <div className='flex border-b-[1px] border-b-gray-400 items-center '>
        <div className='text-4xl font-semibold grow '>Inbox</div>
       
        <div>
          <button className='p-2 rounded-full hover:bg-slate-300'>
            <DotsHorizontal />
          </button>
        </div>
      </div>
      <div className='mt-6'>
        {tasks?.map((task,index) => (
          <div className='flex transition-transform duration-500 align-center'>
              {/* {true && <div className='w-5 h-5 rounded-full border-[3px] border-black'></div>} */}
              <div><input type={'checkbox'} checked={task.isCompleted} onClick={ () => handleToggleTask(task.id)} /></div>
              <div className='ml-3'>{task.text}</div>
          </div>
        ))}
      </div>
      <div>
          <div className='flex'>
            <div className='w-full'>
              <input type="text" className='w-full' />
            </div>
            <button>ADD</button>
          </div>
      </div>
    </div>
  )
}

export default InboxPage