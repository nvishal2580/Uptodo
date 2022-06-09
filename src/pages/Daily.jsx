import React, { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarDatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import AddEvent from "../components/calendar/AddEvent";
import Spinner from "../components/common/Spinner";
import { auth, db } from "../services/firebase/firebase";
import TrashIcon from "../assets/icons/TrashIcon";
import ClockIcon from "../assets/icons/ClockIcon";
import Emtpy_cart from '../assets/logos/Empty_cart.svg';
const localizer = momentLocalizer(moment);

export default function Daily() {
  const [showEvent, setShowEvent] = React.useState(false);
  const [isPending, setIsPending] = React.useState(true);
  const [value, setValue] = React.useState(new Date());
  const [eventList, setEventList] = React.useState([]);

  const handleDateChange = (date) => {
    console.log(date);
    setValue(date);
  };

  const getHeading = () => {
    const today = new Date().getDate();
    const temp = new Date(value).getDate();

    if (today === temp) {
        return "Today";
        }
    else if (today - temp === -1) {
        return "Tomorrow";
        }
    else if (today - temp === 1) {
        return "Yesterday";
        }
    else {
        return moment(value).format("dddd, MMMM Do");
        }


}

    const handleDeleteEvent = async (id) => {
        try {
            if(window.confirm('Are you sure you want to delete this event?')){
                await deleteDoc(doc(db, "users", auth.currentUser.uid, "Events", id));
                const newList = eventList.filter((event) => event.id !== id);
                setEventList(newList);
            }
        } catch (error) {
            toast.error('something went wrong');
        }
    }

  const getEventData = async () => {
    let temp = [];
    const startOfDay = new Date(value);
    startOfDay.setHours(0, 0, 0, 0);
    console.log(startOfDay);

    const endOfDay = new Date(value);
    endOfDay.setHours(23, 59, 59, 999);
    console.log(endOfDay);

    const st = startOfDay.getTime();
    const et = endOfDay.getTime();
    console.log(st, et);
    try {
      const q = query(
        collection(db, "users", auth.currentUser.uid, "Events"),
        where("start", ">=", startOfDay.getTime()),
        where("start", "<=", endOfDay.getTime())
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        temp.push({
          ...data,
          start: new Date(data.start),
          end: new Date(data.end),
        });
      });
      console.log("data fatched", temp);
      setEventList(temp);
      setIsPending(false);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getEventData();
  }, [value]);

  return (
    <div className=" h-screen bg-[#E5E7EB] pt-5 border-t-[1px] border-gray-400 pl-16 pb-20">
      {showEvent && (
        // <AddEvent setShowEvent={setShowEvent} handleAddEvent={handleAddEvent} />
        <div>hello</div>
      )}
      {isPending && <Spinner />}
      {!isPending && (
        <div lassName="flex flex-col w-full items-stretch pr-40 pt-10 pl-20">
          <div className="flex  border-b-[1px] border-b-gray-400 items-center ">
            <div className="text-4xl font-semibold font-mono grow pl-5 ">{getHeading()}</div>
            <button
              //   onClick={() => setShowModal(!showModal)}
              className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 active:outline-none"
            >
              Show Completed
            </button>
            <div>
              <button className="p-2 rounded-full hover:bg-slate-300">
                {/* <DotsHorizontal /> */}
              </button>
            </div>
          </div>
         <div className="flex mt-10">
         <div className="grow h-full">
         <div className=" bg-white  rounded shadow p-6 pt-2 m-4 w-full lg:w-10/12 lg:max-w-4xl ">
            {eventList.length === 0 && (
                <div className="flext justify-center text-center ">
                    <img src={Emtpy_cart} alt="no events" className="w-96 alig inline-block " />
                </div>
            )}
           <div className=" max-h-[500px] overflow-y-auto">
          {eventList.map(
            (event) =>
               (
                <div
                  key={event.id}
                  className="flex mx-6 py-2 border-b-[1px] border-gray-400"
                >
                  <div>
                    <span>{event.title}</span>
                  </div>
                  <div className="grow"></div>
                  <button
                    // onClick={() => handleToggleTask(task.id)}
                    className="mx-2 hover:text-green-700 hover:font-bold rounded-full"
                  >
                    {event.isNotify &&  <ClockIcon className={"text-yellow-500"} />}

                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
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
          <div className="mx-5">
            <div className="w-72 text-center">
              <button
                onClick={() => setValue(new Date())}
                className="text-center rounded-md text-white bg-blue-600 p-2 w-full mb-2"
              >
                Today
              </button>
              <CalendarDatePicker onChange={handleDateChange} value={value} />
            </div>
          </div>
         </div>
        </div>
      )}
    </div>
  );
}
