import React, { useState } from "react";
import Input from "../common/Input2";
import DateTimePicker from "react-datetime-picker";
import ClockIcon from "../../assets/icons/ClockIcon";
import moment from "moment";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

export default function AddEvent({ setShowAddEvent , handleAddEvent }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());     
  const [location,setLocation] = useState("");
    
  const [isNotify, setNotify] = useState(false);

  const handleSubmit = () => {

    const d1 = moment(eventStart);
    const d2 = moment(eventEnd);
    const st = new Date(eventStart).toISOString();
    const et = new Date(eventEnd).toISOString();
    console.log(st,et);
    let newEvent = {title,description,isNotify,start:st,end:et,allDay:false,location:location};
    if(d1 >= d2){
        // end date is before start date
        newEvent = {...newEvent,allDay:true};
    }

    handleAddEvent(newEvent);
    setShowAddEvent(false);
  }

  return (
    <div>
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

          <div className=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle h-[600px] w-[700px]">
            <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <span className="font-bold block border-b-[1px] border-slate-400">
                  Add Event
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
                    placeholder="Enter description"
                    title="Description"
                    required={false}
                    value={description}
                    setValue={setDescription}
                    customStyle="focus:outline-slate-400"
                  />
                </div>
                <div className="mb-2">
                  <Input
                    type="text"
                    placeholder="Enter Location"
                    title="Location"
                    required={false}
                    value={location}
                    setValue={setLocation}
                    customStyle="focus:outline-slate-400"
                  />
                </div>
              </div>
              <div className="flex pt-2">
                  <span className="ml-2 mr-2">From</span>
                <DateTimePicker value={eventStart} onChange={setEventStart} />
                <span className="ml-5 mr-2">To</span>
                <DateTimePicker value={eventEnd} onChange={setEventEnd} />
              </div>
              <div className="mt-10">
              <button
                  onClick={() => setNotify(!isNotify)}
                  className="ml-5 flex border-2 p-1 hover:border-yellow-300"
                >
                  <span>
                    <ClockIcon
                      className={`w-8 h-8 ${isNotify ? "text-yellow-500" : ""}`}
                      strokeWidth={2}
                    />
                  </span>
                  schedule on google calendar
                </button>
              </div>
              <div className="w-full p-3 mt-2 ml-2 bg-white rounded flex  ">
                <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99992 1.33333C8.17673 1.33333 8.3463 1.40357 8.47132 1.52859C8.59635 1.65361 8.66659 1.82318 8.66659 1.99999V3.99999C8.66659 4.17681 8.59635 4.34638 8.47132 4.4714C8.3463 4.59642 8.17673 4.66666 7.99992 4.66666C7.82311 4.66666 7.65354 4.59642 7.52851 4.4714C7.40349 4.34638 7.33325 4.17681 7.33325 3.99999V1.99999C7.33325 1.82318 7.40349 1.65361 7.52851 1.52859C7.65354 1.40357 7.82311 1.33333 7.99992 1.33333ZM7.99992 11.3333C8.17673 11.3333 8.3463 11.4036 8.47132 11.5286C8.59635 11.6536 8.66659 11.8232 8.66659 12V14C8.66659 14.1768 8.59635 14.3464 8.47132 14.4714C8.3463 14.5964 8.17673 14.6667 7.99992 14.6667C7.82311 14.6667 7.65354 14.5964 7.52851 14.4714C7.40349 14.3464 7.33325 14.1768 7.33325 14V12C7.33325 11.8232 7.40349 11.6536 7.52851 11.5286C7.65354 11.4036 7.82311 11.3333 7.99992 11.3333ZM14.6666 8C14.6666 8.17681 14.5963 8.34638 14.4713 8.4714C14.3463 8.59642 14.1767 8.66666 13.9999 8.66666H11.9999C11.8231 8.66666 11.6535 8.59642 11.5285 8.4714C11.4035 8.34638 11.3333 8.17681 11.3333 8C11.3333 7.82318 11.4035 7.65361 11.5285 7.52859C11.6535 7.40357 11.8231 7.33333 11.9999 7.33333H13.9999C14.1767 7.33333 14.3463 7.40357 14.4713 7.52859C14.5963 7.65361 14.6666 7.82318 14.6666 8ZM4.66659 8C4.66659 8.17681 4.59635 8.34638 4.47132 8.4714C4.3463 8.59642 4.17673 8.66666 3.99992 8.66666H1.99992C1.82311 8.66666 1.65354 8.59642 1.52851 8.4714C1.40349 8.34638 1.33325 8.17681 1.33325 8C1.33325 7.82318 1.40349 7.65361 1.52851 7.52859C1.65354 7.40357 1.82311 7.33333 1.99992 7.33333H3.99992C4.17673 7.33333 4.3463 7.40357 4.47132 7.52859C4.59635 7.65361 4.66659 7.82318 4.66659 8ZM12.7139 12.714C12.5889 12.839 12.4194 12.9092 12.2426 12.9092C12.0658 12.9092 11.8963 12.839 11.7713 12.714L10.3573 11.3C10.2358 11.1743 10.1686 11.0059 10.1701 10.8311C10.1717 10.6563 10.2418 10.4891 10.3654 10.3654C10.489 10.2418 10.6562 10.1717 10.831 10.1702C11.0058 10.1687 11.1742 10.2359 11.2999 10.3573L12.7139 11.7707C12.7759 11.8326 12.8251 11.9061 12.8586 11.987C12.8922 12.068 12.9094 12.1547 12.9094 12.2423C12.9094 12.3299 12.8922 12.4167 12.8586 12.4976C12.8251 12.5786 12.7759 12.6521 12.7139 12.714ZM5.64259 5.64266C5.51757 5.76764 5.34803 5.83785 5.17125 5.83785C4.99448 5.83785 4.82494 5.76764 4.69992 5.64266L3.28659 4.22933C3.16149 4.10432 3.09118 3.93474 3.09112 3.7579C3.09105 3.58105 3.16125 3.41142 3.28625 3.28633C3.41126 3.16123 3.58084 3.09092 3.75768 3.09086C3.93453 3.0908 4.10416 3.16099 4.22925 3.28599L5.64259 4.7C5.76757 4.82501 5.83778 4.99455 5.83778 5.17133C5.83778 5.3481 5.76757 5.51764 5.64259 5.64266ZM3.28659 12.714C3.1616 12.589 3.09139 12.4194 3.09139 12.2427C3.09139 12.0659 3.1616 11.8963 3.28659 11.7713L4.70059 10.3573C4.76208 10.2937 4.83565 10.2429 4.91698 10.2079C4.99832 10.173 5.0858 10.1546 5.17432 10.1538C5.26284 10.1531 5.35062 10.1699 5.43256 10.2034C5.51449 10.237 5.58892 10.2865 5.65152 10.3491C5.71411 10.4117 5.76361 10.4861 5.79713 10.568C5.83065 10.65 5.84752 10.7377 5.84675 10.8263C5.84598 10.9148 5.82759 11.0023 5.79265 11.0836C5.75771 11.1649 5.70693 11.2385 5.64325 11.3L4.22992 12.714C4.168 12.776 4.09448 12.8252 4.01355 12.8587C3.93261 12.8923 3.84586 12.9095 3.75825 12.9095C3.67064 12.9095 3.58389 12.8923 3.50296 12.8587C3.42203 12.8252 3.3485 12.776 3.28659 12.714ZM10.3573 5.64266C10.2323 5.51764 10.1621 5.3481 10.1621 5.17133C10.1621 4.99455 10.2323 4.82501 10.3573 4.7L11.7706 3.28599C11.8956 3.1609 12.0652 3.09059 12.242 3.09053C12.4189 3.09046 12.5885 3.16066 12.7136 3.28566C12.8387 3.41067 12.909 3.58025 12.9091 3.75709C12.9091 3.93394 12.8389 4.10357 12.7139 4.22866L11.2999 5.64266C11.1749 5.76764 11.0054 5.83785 10.8286 5.83785C10.6518 5.83785 10.4823 5.76764 10.3573 5.64266Z"
                      fill="#F59E0B"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    Scheduling on google calender will add this task to your
                    google calendar application
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    Active show as yellow clock
                  </p>
                </div>
              </div>
              
              <div className="  py-3 mt-16  sm:flex sm:flex-row-reverse fixed bottom-2  ">
              <button
                onClick={() => setShowAddEvent(false)}
                type="button"
                className="mt-3  w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  focus:ring-offset-2 active:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
      </div>
    </div>
  );
}
