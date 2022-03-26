import { doc, onSnapshot } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { auth, db } from '../services/firebase/firebase';

function InboxPage() {

 const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    const unsub = onSnapshot(doc(db,'users',auth.currentUser.uid),(snapshot)=> {
      const data = snapshot.data();
      if(data === undefined) return ;
       
    })
  })

  return (
    <div>InboxPage</div>
  )
}

export default InboxPage