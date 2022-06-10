import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarDatePicker from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';
import AddEvent from "../components/calendar/AddEvent";
import Spinner from "../components/common/Spinner";
import { auth, db } from "../services/firebase/firebase";
const localizer = momentLocalizer(moment);

 

const myEventsList = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];


export default function Upcoming() {

    var gapi = window.gapi;

  const [value, setValue] = React.useState(new Date());
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [eventList,setEventList] = React.useState([]);
  const [isPending,setIsPending] = React.useState(true);

  const handleDateChange = (date) => {
    console.log(date);
    setValue(date);
  };

  const getEventData = async () => {
    let temp = [];
    const q = query(collection(db, "users", auth.currentUser.uid, "Events"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        temp.push({...data,start:new Date(data.start),end:new Date(data.end)});
        }
    );
    setEventList(temp);
    setIsPending(false);
  }

  useEffect(() => {
    getEventData();
  }, []);

  const handleAddEvent = async(newEvent) => {
      const randomId  = uuid();
    let validUser  = true;
    if( window.gapi && window.gapi.auth2.getAuthInstance().isSignedIn.get()===false) validUser = false;

    console.log(myEventsList);  
    const st = new Date(newEvent.start).getTime();
    const et = new Date(newEvent.end).getTime();
    const temp = {
        title:newEvent.title,
        description : newEvent.description,
        start: st,
        end: et,
        allDay: newEvent.allDay,
        isNotify: validUser ? newEvent.isNotify : false,
        id : randomId
    }

    // update into database
    try {
        await setDoc(doc(db,'users',auth.currentUser.uid,'Events',randomId),temp);
        const newList = [...eventList,{...newEvent,start:new Date(newEvent.start),end:new Date(newEvent.end),id:randomId}];
        setEventList(newList);

    } catch (error) {
       console.log('something went wrong',error); 
    }

    if(newEvent.isNotify){

        if(!validUser){
            toast.info('To add event in google calendar you need to login using Google method ');
            return;
        }

        let event = {
            'summary': newEvent.title,
            'location': newEvent.location,
            'description': newEvent.description,
            'start': {
                'dateTime': newEvent.start,
                'timeZone': 'Asia/Kolkata',
            },
            'end': {
                'dateTime': newEvent.end,
                'timeZone': 'Asia/Kolkata',
            },
            // 'recurrence': [
            //     'RRULE:FREQ=DAILY;COUNT=2'
            // ],
            // 'attendees': [
            //     {'email': ''},  
            // ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    // {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };
        // create a event in user's google calendar
        try {
            console.log('new event',event);
            
            let request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
              });

              request.execute(function(event) {
                //  console.log('Event created: ' + event.htmlLink);
                toast.success('Event Scheduled');
              });
        } catch (error) {
            console.log(error);
        }
            
        }
        return;
    }
  

  return (
    <div className="flex h-screen bg-white pt-5 border-t-[1px] border-gray-400 pl-5 pb-20">
        {showAddEvent && (
            <AddEvent setShowAddEvent={setShowAddEvent} handleAddEvent={handleAddEvent} />
        )}
        {isPending && (<Spinner />)}
        {!isPending && (
            <>
            <div className="grow h-full">
        <Calendar
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          date={value}
          onNavigate={date => setValue(date)}
          
        //   style={{ height: 500 }}
        />
      </div>
      <div className="mx-2">
        <div className="w-64 text-center">
          <button onClick={() => setShowAddEvent(!showAddEvent)} className="text-center rounded-md text-white bg-blue-600 p-2 w-full mb-2">
            ADD EVENT
          </button>
          <CalendarDatePicker onChange={handleDateChange} value={value} />
        </div>
      </div>
            </>
        )}
    </div>
  );
}
