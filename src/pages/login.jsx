import React,{useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase';
const Login = () => {
  const [err , seterr]= useState(false);
      const navigate = useNavigate();

    const handlesubmit = async(e)=>{
      e.preventDefault();
      const email=e.target[0].value;
      const password=e.target[1].value;
      try{
         await signInWithEmailAndPassword(auth, email, password);
         navigate('/');
      }catch(err){
        seterr(true);
      }
    };
     
  return (
    <div className='outer_container'>
    <div className="inner_container">
       <span className="logo">welcome back!</span>
       <span className="title">We're so excited to see you again!</span>
         <form onSubmit={handlesubmit}>
          <input type="email" name="" id="" placeholder='email id' />
          <input type="password" name="" id=""placeholder='password' />
          <button>Login</button>
         </form>
         <p>Don't have an account? <Link to='/register'className='hiii'>Register</Link> </p>
         {err && <p className='error'>EMAIL or Password is invalid</p>}
    </div>
  </div>
  )
}

export default Login;
