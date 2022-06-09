import { collection, doc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddProject from "../components/project/AddProject";
import Navbar from "../components/sidebar/Navbar";
import SideNav from "../components/sidebar/SideNav";
import { auth, db } from "../services/firebase/firebase";
import Daily from "./Daily";
import InboxPage from "./InboxPage";
import ProjectPage from "./ProjectPage";
import Upcoming from "./Upcoming";
import UserProfile from "./UserProfile";


function Dashboard() {
  const [projectList, setProjectList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [projectId, setProjectId] = useState("inbox");
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  const params = useParams();
  console.log("dashbord rendered", params);
  useEffect(() => {
    let newProjectId = params["*"].split("/");
    newProjectId = newProjectId[newProjectId.length - 1];
    // const {id:newProjectId} = params;
    if (projectId !== newProjectId) {
      setProjectId(newProjectId);
      console.log("projectId set");
    }
  }, [params]);

  useEffect(()=>{
    window.addEventListener("resize",handleResize);
    
    return () =>   window.removeEventListener('resize', handleResize);

  },[])

  const handleResize = () => {
    if(window.innerWidth < 1100){
      setShowSidebar(false);
    }
  }

  useEffect( () => {

    const unsub = onSnapshot(collection(db,'users',auth.currentUser.uid,'projects'), async(snapshot) => {
      const projectRef = collection(db,'users',auth.currentUser.uid,'projects');
      const projectSnap = await getDocs(projectRef);
      let dataList = [];
      projectSnap.forEach(element => {
        dataList.push(element.data());
        console.log(element.data());
      })
      console.log('new project list',dataList);
      setProjectList(dataList);
    });

    return () => unsub();

  },[])

  const handleLogout = () => {
    auth.signOut();
    window.gapi.auth2.getAuthInstance().signOut();
    navigate("/");
  };

  const handleAddProject = async(newProject) => {
    // const newProjectList = [
    //   ...projectList,
    //   { projectName: newProject.title, projectId: newProject.id },
    // ];
    try {
      
      await setDoc(doc(db,'projects',newProject.id),{
        projectName:newProject.title,
        projectId:newProject.id,
        desctiption:newProject.description,
        columns:{},
        tasks:{},
        columnOrder:[],
        admin:newProject.admin,
        iat:serverTimestamp()
      })

      await setDoc(doc(db,'users',auth.currentUser.uid,'projects',newProject.id),{
        projectName:newProject.title,
        projectId:newProject.id,
      })

    } catch (error) {
      console.log(error);
      toast('error',error.message);
    }

    setShowModal(false);
    // setProjectList(newProjectList);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex ">
        <div className={`w-64 transition-all absolute ${showSidebar ? 'left-0':'-left-64'}`}>
        <SideNav projectId={projectId} setShowSidebar={setShowSidebar} openMenu={openMenu} setOpenMenu={setOpenMenu} projectList={projectList} setShowModal={setShowModal} handleLogout={handleLogout}  />
        </div>
        <div className={`bg-gray-200 w-full ml-64 transition-all duration-300  ${showSidebar?'ml-64 w-[calc(100vw_-_256px)]':'ml-0'}`}>
          <div className="h-full">
            <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            {showModal && (
              <AddProject
                setShowModal={setShowModal}
                showModal={showModal}
                handleAddProject={handleAddProject}
              />
            )}
            <div className="h-screen">
              <Routes>
                <Route path="/inbox" element={<InboxPage />}></Route>
                <Route path="/daily" element={<Daily />}></Route>
                <Route path="/upcoming" element={<Upcoming />}></Route>
                <Route
                  path="/project/:id"
                  element={
                    <ProjectPage
                      projectId={projectId}
                      setProjectId={setProjectId}
                    />
                  }
                >
                </Route>
                <Route  path="/profile" element={<UserProfile />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
