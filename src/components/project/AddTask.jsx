import React, { useEffect, useState } from "react";
import Input from "../common/Input2";
import TagIcon from "../../assets/icons/TagIcon";
import FlagIcon from "../../assets/icons/FlagIcon";
import CalenderIcon from "../../assets/icons/CalenderIcon";
import FilterList from '../common/FilterList';
import ListItems from "../common/ListItems";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp } from "firebase/firestore";

function AddTask({type:typedata, handleAddTask, show, setModal, labelList,priorityList,handleAddColumn,handleAddLabel }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [showLabel, setShowLabel] = useState("");
  const [priority,setPriority] = useState("1");
  const [deadline,setDeadline] = useState(null);

  const clearData = () => {
    console.log('data reset');
    setTitle("");
    setDeadline(null);
    setDetails("");
    setPriority(null)
    setModal(false);
  }

  const setLabelView = (id) => {
    if(showLabel === id){
      setShowLabel("");
      return;
    }
    setShowLabel(id);
  }
  console.log('AddTask rendered');

  useEffect(() => {
    return () => console.log('unmounted');
  },[]);

  const handleSubmit = () => {

    const newTask = {
      id:uuidv4().toString(),
      title:title,
      description:details,
      deadline:deadline,
      priority:priority,
      isCompleted : false,
      iat: serverTimestamp()
    }

    if(typedata.type === "task"){
      handleAddTask(typedata.col,newTask);
      clearData();
      return;
    }

    if(typedata.type === 'column'){
      handleAddColumn(title);
      setTitle("");
      return;
    }

  }

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${show ? "" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

        <div className=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4">
              <span className="font-bold block border-b-[1px] border-slate-400">
                Add {typedata.type[0].toUpperCase() + typedata.type.substring(1)}
              </span>
            </div>
            
            <div>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Enter title"
                  title="Title"
                  required={true}
                  value={title}
                  setValue={setTitle}
                  customStyle="focus:outline-slate-400"
                />
              </div>
              {typedata.type === "task" && (
                <div>
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Enter Details"
                      title="Description"
                      required={false}
                      value={details}
                      setValue={setDetails}
                      customStyle="focus:outline-slate-400"
                    />
                  </div>
                  <div>
                    <div className={`${showLabel === "" ? "border-b-slate-300 border-b-[1px]" : ""}`}>
                      <button  onClick={() => setLabelView("label")}>
                      {/* <div className="has-tooltip flex p-1 ">
                        <span className="ml-4 hover:bg-slate-200 p-2 rounded-full">{<TagIcon strokeWidth={1.5} />}</span>
                        <span className={` ${showLabel !== "" ? "hidden" : "tooltip"}  m-1 mt-10 `}>Add Label</span>
                      </div> */}
                      </button>
                      <button  onClick={() => setLabelView("priority")}>
                      <div className="has-tooltip flex p-1 ">
                        <span className=" hover:bg-slate-200 p-2 rounded-full">{<FlagIcon strokeWidth={1.5} />}</span>
                        <span className={` ${showLabel !== "" ? "hidden" : "tooltip"}  m-1 mt-10 `}>Add Priority</span>
                      </div>
                      </button>
                      <button  onClick={() => setLabelView("deadline")}>
                      <div className="has-tooltip flex p-1 ">
                        <span className=" hover:bg-slate-200 p-2 rounded-full">{<CalenderIcon strokeWidth={1.5} />}</span>
                        <span className={` ${showLabel !== "" ? "hidden" : "tooltip"}  m-1 mt-10 `}>set deadline</span>
                      </div>
                      </button>
                      <div 
                       className={`transition-all duration-300 max-w-[200px]  overflow-hidden overflow-x-hidden rounded-md hover:overflow-y-auto ${showLabel === "label" ? 'h-32 ease-in border-[1px] border-gray-300' : 'h-0 ease-out'}`}
                      >
                       {/* className={`${showLabel === "label" ? "" : "hidden"} max-w-[200px]  border-[1px] cursor-pointer transition-all border-slate-400 rounded overflow-y-auto max-h-32`}> */}
                        {/* <FilterList labels={labels} setLabels={setLabels} data={labelList} selectMultiple={true} handleAddLabel={handleAddLabel} /> */}
                      </div>
                      <div 
                      className={`transition-all duration-300 max-w-[200px]  overflow-hidden overflow-x-hidden rounded-md hover:overflow-y-auto ${showLabel === "priority" ? 'h-32 ease-in border-[1px] border-gray-300' : 'h-0 ease-out'}`}
                      >
                      {/* className={`${showLabel === "priority" ? "" : "hidden"} ml-20 max-w-[200px]  border-[1px] cursor-pointer transition-all border-slate-400 rounded overflow-y-auto max-h-32`}> */}
                        <ListItems data={priority} setData={setPriority} list={priorityList} selectMultiple={false}/>
                      </div>
                      <div 
                      className={`transition-all duration-300 max-w-[200px]  overflow-hidden overflow-x-hidden rounded-md hover:overflow-y-hidden ${showLabel === "deadline" ? 'h-10 ease-in border-[1px] border-gray-300' : 'h-0 ease-out'}`}
                      >
                      {/* className={`${showLabel === "deadline" ? "" : "hidden"} ml-32 rounded border-[2px] border-slate-400  inline-block `}> */}
                        <DatePicker className="p-2" selected={deadline} onChange={(date) => setDeadline(date)} />
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => setModal(!show)}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 active:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  focus:ring-offset-2  active:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
