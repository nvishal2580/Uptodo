import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "../../assets/icons/CloseIcon";
import DotsHorizontal from "../../assets/icons/DotsHorizontal";
import { db } from "../../services/firebase/firebase";
import ActivityTabs from './ActivityTabs';

const colors = [
  'bg-blue-200 text-blue-800',
  'bg-purple-200 text-purple-800',
  'bg-cyan-200 text-cyan-800',
  'bg-green-200 text-green-800',
  'bg-orange-200 text-orange-800',
];

var options = { year: 'numeric', month: 'long', day: 'numeric' };


function TaskModal({setShowTask,task}) {
  console.log('task modal ',task)

  const [subtasks,setSubtasks] = useState([]);

  

  const handleSubtaskToggle = async(subtask) => {

    if(subtask === undefined) return;

    let subtaskcopy = {...subtask,isCompleted:!subtask.isCompleted};
    try {
        db.collection('tasks').doc(task.key).update({
          [`subtasks.${subtask.id}`] : subtaskcopy
        })   
           
    } catch (error) {
      toast.error('something went wrong');
    }
  }

  const handleAddSubtask = async(item) => {
    try {
      await db.collection('tasks').doc(task.key).update({
        [`subtasks.${item.id}`] : item
      })
    } catch (error) {
      toast.error('something went wrong');
    }
  }

  useEffect(() => {

     const taskRef = doc(db,'tasks',task.key);
      const unsub = onSnapshot(taskRef,(snapshot) => {
         
        if(snapshot.exists()){
          const data = snapshot.data();
          let arr = [];
          Object.values(data.subtasks).forEach((item) => {
         arr.push(item);
        })
      //  console.log(arr);
       setSubtasks(arr);
        }

      })
    
      return () => unsub();

  },[task])


  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      // onClick={() => setShowTask(null)}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  md:h-[650px] w-[700px] ">
          <div className="flex flex-col bg-white px-14 pt-2 pb-2">
            <div className="flex mb-2">
              <div className="grow">{""}</div>
              <div>
                <button onClick={() => setShowTask(null)} className="px-2  border-[1px] rounded-md transition-all hover:bg-gray-200 border-gray-400" >
                  Close
                </button>
              </div>
            </div>
              <hr />
              <div className="flex mb-3" >
                <div className="grow">
                   <span className="text-2xl font-bold">{_.startCase(_.toLower(task.title))}</span>
                </div>
                <div>
                  <DotsHorizontal />
                </div>
              </div>
              <div className="flex flex-col">
                  <div className="flex mb-3">
                    <div className="w-1/5 text-gray-600">Created By</div>
                    <div className="w-4/5">{"Aman Gupta"}</div>
                  </div>
                  <div className="flex mb-3">
                    <div className="w-1/5 text-gray-600">Assign To</div>
                    <div className="w-4/5">{"Prakher"}</div>
                  </div>
                  <div className="flex mb-3">
                    <div className="w-1/5 text-gray-600">Due Date</div>
                    <div className="w-4/5">{new Date(task.deadline.nanoseconds).toLocaleDateString("en-US", options)}</div>
                  </div><div className="flex mb-3">
                    <div className="w-1/5 text-gray-600">Labels</div>
                    <div className="w-4/5">
                       {task.labels?.map((label,ind) => <span key={label.id} className={` px-2 rounded mr-2 pb-1 ${colors[ind%colors.length]}`} >
                         {label.name}
                       </span>)}
                    </div>
                  </div>
              </div>
              <hr />
              <div className="py-2">
                <span className="text-gray-500">{_.upperFirst(task.description)}</span>
              </div>
              <hr />
              <div>
                <ActivityTabs subtasks={subtasks} handleAddSub={handleAddSubtask}  handleSubtaskToggle={handleSubtaskToggle} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
