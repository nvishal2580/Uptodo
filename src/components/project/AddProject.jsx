import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../../services/firebase/firebase";
import Input from "../common/Input2";

function AddProject({ showModal, setShowModal, handleAddProject }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isJoin,setIsJoin] = useState(false);
  const [projectId,setProjectId] = useState("");

  useEffect(() => {
    return () => console.log("unmounted");
  }, []);

  const handleSubmit =async () => {

    if(isJoin){
      const docRef = doc(db,'projects',projectId);
      const docSnap = await getDoc(docRef);

      console.log('point a');

      if(docSnap.exists()){
        const data = docSnap.data();
        console.log('dddta',data);
        const waitList = data.waitingList;
        const memberList = data.membersList;
        console.log('wait list ',waitList);

        console.log('point b');

        const userobj = {name: auth.currentUser.displayName,id : auth.currentUser.uid,email:auth.currentUser.email};
        if(memberList.length > 0){
          const member = memberList.find(member => member.email === auth.currentUser.email);
          if(member != null){
            toast.info("You are already a member of this project");
            return;
          }
        }
        console.log('point c');
        
          
          const member = waitList.find(member => member.email === auth.currentUser.email);
          console.log('member',member);
          if(member != null){
            toast.info('Project Request is already sent');
            return;
          }

          console.log('point d');
          try {
            await updateDoc(docRef,{
              waitingList : arrayUnion(userobj)
            })
            toast.success('Request Sent !');
          } catch (error) {
            toast.error('Something went Wrong!');
          }
        
      }else{
        toast.error('Invalid Project');
      }
      console.log('point e');
      setProjectId("");
      setShowModal(false);
      return;
    }

    handleAddProject({
      projectName: title,
      description: details,
      projectId: uuidv4().toString(),
      admin:{
        id:auth.currentUser.uid,
        name:auth.currentUser.displayName
      },
      waitingList:[],
      membersList : [],
      columns:{},
      tasks:{},
      columnOrder:[],
    });

  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        showModal ? "" : "hidden"
      }`}
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
            <div className="form-check">
              <input
                className="form-check-input rounded-full h-4 w-4 border border-gray-300 bg-white  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center  float-left mr-2 cursor-pointer"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={isJoin}
                onClick={() => setIsJoin(!isJoin)}
                checked={isJoin}
              />
              <label
                className="form-check-label inline-block text-gray-800 ml-2 font-semibold"
                htmlFor="flexRadioDefault1"
              >
                Join project
              </label>
            </div>
            {isJoin && <div>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Enter Project Id"
                  title="Project Id"
                  required={true}
                  value={projectId}
                  setValue={setProjectId}
                  customStyle="focus:outline-slate-400"
                />
              </div>
              </div>}
            {!isJoin && <div>
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
            </div>}
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

export default AddProject;
