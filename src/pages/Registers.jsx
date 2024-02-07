import React,{useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
const Registers = () => {
    const [err , seterr]= useState(false);
    const [imgerr,setimgerr]=useState(true);
      const navigate = useNavigate();

    const handlesubmit = async(e)=>{
      e.preventDefault();
      if(e.target[0].value<3){
        seterr(true)
      }
      const displayName=e.target[0].value;
      const email=e.target[1].value;
      const password=e.target[2].value;
      const file=e.target[3].files[0];
      if(file == null){
        setimgerr(false);
      }
      try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
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
                   await setDoc(doc(db, "userChats", res.user.uid), {});
                  navigate("/");
            });
        });
      }catch(err){
        seterr(true);
      }
    };
  return (
    <div className='outer_container'>
      <div className="inner_container">
         <span className="logo">Create an account</span>
           <form onSubmit={handlesubmit}>
            <input type="text" name="" id="" placeholder='username' />
            <input type="email" name="" id="" placeholder='email Id' />
            <input type="password" name="" id="" placeholder='password' />
            <input style={{display:"none"}} type="file" name="" id="file" />
            <label htmlFor="file">
                <i class="material-icons" id='profile_img' >camera_roll</i>
                <span>Add a profile pictures</span></label>
            <button>Sign Up</button>
           </form>
           <p>Already have an account? <Link to="/login" className='hiii'> Login</Link> </p>
           {err && <p className='error'>Please Enter Correct Email and Password</p>}
           {!imgerr && <p className='error'>Please select a profile picture</p>}

      </div>
    </div>
  );
};

export default Registers;
