import React,{useState} from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage, db } from '../firebase';
//import { async } from '@firebase/util';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    
  const [err , seterr]= useState('');
  const navigate = useNavigate();
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const displayName=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];

    try{
     const res= await createUserWithEmailAndPassword(auth, email, password);

     const storageRef = ref(storage, displayName);
     const uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on(

  (error) => {
    seterr('error in uploading image');
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
     await updateProfile(res.user,{
      displayName,
      photoURL:downloadURL,
     });

     await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
     photoURL:downloadURL,
     });
     await setDoc(doc(db, "users", res.user.uid), {});
     navigate("/");
     //yaswanthkumarmidathana8813@gmail.com
    });
  });
    }catch(err){
      seterr("not logged in");
    }
    
  };
  return (
      <div className='outer_container'>
      <div className="inner_container">
         <span className="logo">MANA CHAT</span>
         <span className="title">Register</span>
           <form onSubmit={handlesubmit}>
            <input type="text" name="" id="" placeholder='username' />
            <input type="email" name="" id="" placeholder='email Id' />
            <input type="password" name="" id="" placeholder='password' />
            <input style={{display:"none"}} type="file" name="" id="file" />
            <label htmlFor="file">
                <i class="material-icons" id='profile_img' >camera_roll</i>
                <span>Add a profile pictures</span></label>
            <button>Sign Up</button>
           {err}
           </form>
           <p>Already have an account? Login  </p>
      </div>
    </div>
  );
}

export default Register;
