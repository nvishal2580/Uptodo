import React, { useEffect, useState } from "react";

import ProjectPage from "./ProjectPage";
import { auth, db } from "../services/firebase/firebase";
import { Routes, useNavigate, Route, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, setDoc ,ref,onSnapshot, serverTimestamp} from "firebase/firestore";
import InboxPage from "./InboxPage";
import AddProject from "../components/project/AddProject";
import SideNav from "../components/sidebar/SideNav";
import Navbar from "../components/sidebar/Navbar";
import { toast } from "react-toastify";

function Dashboard() {
  const [projectList, setProjectList] = useState([
    { projectName: "test1", projectId: "1234" },
    { projectName: "test2", projectId: "4321" },
  ]);
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
                <Route
                  path="/project/:id"
                  element={
                    <ProjectPage
                      projectId={projectId}
                      setProjectId={setProjectId}
                    />
                  }
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
