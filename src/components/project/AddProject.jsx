import React, { useEffect, useState } from "react";
import Input from "../common/Input2";
import TagIcon from "../../assets/icons/TagIcon";
import FlagIcon from "../../assets/icons/FlagIcon";
import CalenderIcon from "../../assets/icons/CalenderIcon";
import FilterList from "../common/FilterList";
import ListItems from "../common/ListItems";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";

function AddProject({showModal,setShowModal,handleAddProject}) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    return () => console.log("unmounted");
  }, []);

  const handleSubmit = () => {
    
    
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${showModal ? "" : "hidden"}`}
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
               Add Project
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
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => setShowModal(!showModal)}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 active:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleAddProject({title:title,description: details,id:uuidv4().toString()})}
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

export default AddProject;
