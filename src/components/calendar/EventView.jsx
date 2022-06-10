import moment from "moment";
import React from "react";
import { useEffect } from "react";
import CalenderIcon from "../../assets/icons/CalenderIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import GoogleCalander from "../../assets/logos/GoogleCalendar.png";

export default function EventView({ currentEvent, setShowEvent, showEvent }) {
  // console.log("show currentEvent rendered", currentEvent,setShowEvent,showEvent);

  // useEffect(() => {
  //   console.log("show currentEvent rendered", currentEvent,setShowEvent,showEvent);
  // }, [currentEvent]);

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

          <div className=" relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  max-h-[400px] w-[400px]">
            <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-blue-700 p-2 mr-4">{""}</div>
                <span className="text-xl font-semibold text-gray-600 grow">
          
                  {currentEvent?.title}
                </span>
                <button onClick={() => setShowEvent(!showEvent)}>
                  <CloseIcon strokeWidth={"2"} />
                </button>
              </div>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <CalenderIcon className={"w-6 h-6"} />
                </div>
                <span className="text-sm font-semibold text-gray-600">
               
                  {moment(currentEvent?.start).format("MMM Do, YYYY : h:m A")}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <ClockIcon className={"w-6 h-6"} />
                </div>
                <span className="text-sm font-semibold text-gray-600">
             
                  {moment(currentEvent?.end).format("MMM Do, YYYY : h:m A")}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <LocationIcon className={"w-6 h-6"} />
                </div>
                <span className="text-sm font-semibold text-gray-600">
               
                  {currentEvent?.location===""?"Not Specified":currentEvent?.location}
                </span>
              </div>
              {currentEvent?.isNotify && (
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img src={GoogleCalander} alt="" className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">
                    currentEvent is scheuled on google calaendar
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
