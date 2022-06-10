import { useEffect } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import {toast, ToastContainer} from 'react-toastify';
import PrivateRoute from './components/auth/PrivateRoute';
import VerifyAuth from './pages/VerifyAuth';
import { auth } from './services/firebase/firebase';



function App() {
  // console.log('current user',auth.currentUser)
  var gapi = window.gapi;
  // console.log('i got gapi',gapi);
  
  
  const clientInit = () => {

    if(gapi === null) {
      toast.error('Something went wrong! Try later or Refresh page');
      return;
    }

    gapi.load('client:auth2', () => {
      // console.log('loaded client')

      gapi.client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId :process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.events',
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))
    })
  };

  useEffect(()=>{ 

    clientInit();
    console.log('environment',process.env.NODE_ENV);  
    
      //  const script = document.createElement("script");
      //   script.src = "https://apis.google.com/js/platform.js";
      //   script.async = true;
      //   script.defer = true;
      //   document.body.appendChild(script);
        // window.gapi.load('client', () => {
        //   window.gapi.client.init({ 
        //     apiKey: process.env.REACT_APP_API_KEY,
        //     clientId: process.env.REACT_APP_CLIENT_ID,
        //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        //     scope: 'https://www.googleapis.com/auth/calendar'
        //   })


         

        // })
          // console.log('client id',process.env.REACT_APP_CLIENT_ID)
          // window.gapi.load('auth2', () => {
          //   window.gapi.auth2.init({
              
          //     client_id: 'process.envt.REACT_APP_CLIENT_ID',
          //     scope: 'https://www.googleapis.com/auth/calendar.events'
          //   })
          // }
          // )
          // window.gapi.client.load('calendar', 'v3', () => {
          //   console.log('loaded calendar')
          //   // console.log(window.gapi.auth2);
          // }
          // )
        
  },[]);

  if(process.env.NODE_ENV === 'production') {
    // console.log('okey last one');
    console.log = function no_console(){};
}
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app/verify" element={<VerifyAuth />} />
          <Route path="/app/*" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          {/* <Route path="/app/project/:id" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
