import _ from 'lodash';
import React, { createRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';
import Linkify from 'linkify-react';
import {serverTimestamp,} from 'firebase/firestore'
import { auth } from '../../services/firebase/firebase';

function ActivityTabs({subtasks,handleSubtaskToggle,handleAddSub,handleAddComment,comments,membersList}) {

    const [showType,setShowType] = useState("subtasks");
    const [sub,setSub] = useState("");

    console.log('subtasks ',subtasks)

    const handleAddSubtask = () => {

        if(sub && sub.length > 2){
            const temp = {
                id : uuidv4(),
                title: sub,
                isCompleted : false,
                iat: serverTimestamp()
            }
            handleAddSub(temp);
        }
        setSub("");
    }

    const addComment = async (value,plainText) => {

        const id = uuidv4();
            const comment = {
                id: id,
                iat:serverTimestamp(),
                user: {id : auth.currentUser.uid,name:auth.currentUser.displayName},
                text:plainText,
                value:value
            }

            handleAddComment(comment);
        
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
                        <div className='w-4/6 ' >
                            <input value={sub} onChange={(e) => setSub(e.target.value)} type="text" className='px-2 py-1 focus:outline-none  rounded w-full border-[1px] border-gray-500' maxLength={256} placeholder='Add Subtasks'/>
                        </div>
                        <div className='2/6'>
                            <button onClick={handleAddSubtask} className='ml-3 border-[1px] text-white bg-orange-500 py-1 px-3 rounded-md hover:bg-orange-600'>ADD</button>
                        </div>
                    </div>
                    <div className='mt-4 overflow-y-hidden hover:overflow-y-auto overflow-x-hidden max-h-64'>
                        {subtasks?.map((item,ind) => (
                            <div key={ind} className="flex items-center cursor-pointer" onClick={() => handleSubtaskToggle(item)} >
                                <div className='w-4 h-4' >
                                     <input onChange={() => handleSubtaskToggle(item)} checked={item.isCompleted} id="shipping-2" aria-describedby="shipping-2" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                                </div>
                                <span className={`ml-3 ${item.isCompleted ? 'line-through' : ""}`}>{_.upperFirst(item.title)}</span>
                            </div>
                        ))}
                    </div>
                    </div>}
                {showType === "activity" && <div className='px-2 flex max-h-48 flex-col overflow-y-auto'>

                    <div className='overflow-y-hidden hover:overflow-y-auto'>
                            {comments?.map(comment => (<div key={comment.id} className="flex items-center mb-4" >
                                <div>
                                    <div className=' flex items-center justify-center bg-red-500 w-8 h-8 text-white rounded-full'>
                                        {_.upperFirst((comment.user.name && comment.user.name[0]) || "n")}
                                    </div>
                                </div>
                                <div className='pl-4'>
                                    <div >
                                        <span className='font-semibold'>{_.upperFirst(comment.user.name)}</span>
                                        <span className='font-light ml-5 text-xs'>{comment.iat?.toDate().toDateString()}</span>
                                    </div>
                                    <div>
                                        <span className='text-gray-500'>
                                        <Linkify  options={{target : "_blank" , className:"bg-cyan-100 px-1 rounded"}} tagName="p">{comment.text}</Linkify>
                                        </span>
                                    </div>
                                </div>
                            </div>))}
                    </div>
                    <div className="grow">{""}</div>
                    <div className="absolute bottom-2 w-full">
                        <Comment handleSubmit={addComment} membersList={membersList} />
                    </div>
                </div>}
            </div>
    </div>
  )
}

export default ActivityTabs