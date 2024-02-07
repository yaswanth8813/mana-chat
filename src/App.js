import Registers from './pages/Registers';
import Login from './pages/login';
import Home from './pages/home';
import './style.scss';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './contex/Auth';
function App() {
  const {currentuser}=useContext(AuthContext);

   const ProtectedRoute = ({children})=>{
    if(!currentuser){
      return <Navigate to='/login'/>
    }else{
      return children
    };
   }
  return (
   <BrowserRouter>
     <Routes>
      <Route path="/">
      <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path="register" element={<Registers></Registers>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      </Route>
     </Routes>
   </BrowserRouter>

  );
}

export default App;
