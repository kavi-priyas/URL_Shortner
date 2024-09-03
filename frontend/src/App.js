import LandingPage from './comp/LandingPage';
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom';
import Redirect from './comp/Redirect';
import Login from './comp/Login';
import Dashboard from './comp/Dashboard';
import Signup from './comp/Signup';
import Aform from './comp/AForm';

function App() {
  return <Aform/>
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/:shortUrl" element={<Redirect/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
