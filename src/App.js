import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import {ToastContainer} from 'react-toastify';
import PrivateRoute from './components/auth/PrivateRoute';
import VerifyAuth from './pages/VerifyAuth';

function App() {
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
