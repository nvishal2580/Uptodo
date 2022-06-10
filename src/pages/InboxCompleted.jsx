import React from "react";
import CheckIcon from "../assets/icons/CheckIcon";
import TrashIcon from "../assets/icons/TrashIcon";

export default function InboxCompleted({
  showModal,
  setShowModal,
  tasks,
  handleDeleteTask,
  handleToggleTask,
  handleDeleteCompletedTask,
}) {
  const submit = () => {
    if (window.confirm("Are you sure you want to delete All task?")) {
      console.log("got confirmation");
      handleDeleteCompletedTask();
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className=" flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

        <div className="  relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mt-20 sm:align-top sm:max-w-3xl w-[700px]">
          <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex w-full">
              <div className="grow">
                <span className="text-xl">Completed Tasks</span>
              </div>
              <button
                onClick={submit}
                type="button"
                className="mt-3 hover:text-red-700 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 active:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete All
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 active:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
            <div className="max-h-96 overflow-auto">
              {tasks.map(
                (task) =>
                  task?.isCompleted === true && (
                    <div
                      key={task.id}
                      className="flex mx-6 py-2 border-b-[1px] border-gray-400"
                    >
                      <div>
                        <span>{task.title}</span>
                      </div>
                      <div className="grow"></div>
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="mx-2 hover:text-yellow-600 hover:font-bold rounded-full"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
