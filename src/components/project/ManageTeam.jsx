import React from "react";
import { auth } from "../../services/firebase/firebase";
import CloseIcon from "../../assets/icons/CloseIcon";
import CheckIcon from "../../assets/icons/CheckIcon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

function ManageTeam({
  setShowTeam,
  membersList,
  waitingList,
  admin,
  projectId,
  projectTitle,
  hadleAddMember,
  handleRejectRequest,
}) {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto `}
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
            <div className="mb-4 flex">
              <div className="grow">
                <span className="font-bold block border-b-[1px] text-center border-slate-400">
                  Manage Team
                </span>
              </div>
            </div>
            <div className="flex flex-col max-h-96 overflow-x-hidden overflow-y-auto">
              <div className="text-center mb-4">
                {" "}
                <span className="font-semibold text-lg">Team members</span>
              </div>
              {membersList?.map((member) => (
                <div
                  key={member.id}
                  className="flex group h-8 bg-gray-100 mb-2 pl-5 rounded-md items-center"
                >
                  <div className="grow">{member.name}</div>
                  {admin && auth.currentUser.uid === admin.id && (
                    <div>
                      <button className=" py-1 rounded-full hover:bg-red-100  px-2 hidden group-hover:block ">
                        <CloseIcon className="text-red-500" strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {admin && auth.currentUser.uid === admin.id &&
              waitingList &&
              waitingList.length > 0 && (
                <div className="flex flex-col">
                  <div className="text-center mb-4">
                    {" "}
                    <span className="font-semibold text-lg">waiting List</span>
                  </div>
                  {waitingList?.map((member) => (
                    <div
                      key={member.id}
                      className="flex group h-8 bg-gray-100 mb-2 pl-5 rounded-md items-center"
                    >
                      <div className="grow">{member.name}</div>
                      <div>
                        <button
                          onClick={() =>
                            hadleAddMember(
                              { id: projectId, title: projectTitle },
                              member
                            )
                          }
                          className=" px-2 mr-2 py-1 hover:bg-green-100 rounded-full"
                        >
                          <CheckIcon
                            className="text-green-500"
                            strokeWidth={2}
                          />
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRejectRequest(projectId, member)}
                          className="hover:bg-red-100 py-1 rounded-full  px-2 "
                        >
                          <CloseIcon className="text-red-500" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            <div>
              {auth.currentUser.uid === admin.id && (
                <div className="flex items-center pt-4">
                  <div className="grow">
                    <CopyToClipboard
                      text={projectId}
                      onCopy={() => toast.success("Project Id copied")}
                    >
                      <button className="outline-1 bg-blue-100 hover:bg-blue-200 font-semibold font-mono text-blue-600 p-2 rounded-md">
                        Copy Project Id to share
                      </button>
                    </CopyToClipboard>
                  </div>
                  <div className="outline-1 border-[1px] border-gray-300 hover:bg-gray-300 p-2 rounded-md">
                    <button onClick={() => setShowTeam(false)}>
                        Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTeam;
