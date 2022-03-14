import _ from 'lodash';
import React, { createRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function ActivityTabs({subtasks,handleSubtaskToggle,handleAddSub}) {

    const [showType,setShowType] = useState("subtasks");

    const inputRef = createRef();

    console.log('subtasks ',subtasks)

    const handleAddSubtask = () => {
        
        const val = inputRef.current.value;
        if(val && val.length > 2){
            const temp = {
                id : uuidv4(),
                title: val,
                isCompleted : false
            }
            handleAddSub(temp);
        }
    }

  return (
    <div className='mt-2 w-full flex flex-col'>
        <div className='flex justify-evenly'>
            <div onClick={() => setShowType("subtasks")} className={`pb-1 cursor-pointer w-1/2 text-center font-semibold transition-all duration-400  px-3 ${showType === "subtasks" ? "border-b-[1px] border-b-gray-600" :"" }`}>
                <span>Subtasks</span>
            </div>
            <div onClick={() => setShowType("activity")} className={`pb-1 cursor-pointer w-1/2 text-center font-semibold transition-all duration-400 px-3 ${showType === "activity" ? "border-b-[1px] border-b-gray-600" :"" }`}>
                <span>Comments</span>
            </div>
        </div>
            <div className='mt-3'>
                {showType === "subtasks" && <div>
                    <div className='flex justify-center items-center'>
                        <div className='w-4/6' >
                            <input ref={inputRef} type="text" className='px-2 py-1 focus:outline-none  rounded w-full border-[1px] border-gray-500' maxLength={256} placeholder='Add Subtasks'/>
                        </div>
                        <div className='2/6'>
                            <button onClick={handleAddSubtask} className='ml-3 border-[1px] text-white bg-orange-500 py-1 px-3 rounded-md hover:bg-orange-600'>ADD</button>
                        </div>
                    </div>
                    <div className='mt-4 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden max-h-64'>
                        {subtasks?.map((item,ind) => (
                            <div key={ind} className="flex items-center cursor-pointer" onClick={() => handleSubtaskToggle(item)} >
                                <input onChange={() => handleSubtaskToggle(item)} checked={item.isCompleted} id="shipping-2" aria-describedby="shipping-2" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                                <span className={`ml-3 ${item.isCompleted ? 'line-through' : ""}`}>{_.upperFirst(item.title)}</span>
                            </div>
                        ))}
                    </div>
                    </div>}
                {showType === "activity" && <div>
                    chat secion
                </div>}
            </div>
    </div>
  )
}

export default ActivityTabs