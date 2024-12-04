
import React, { useContext, useState } from 'react';
import classes from './Auth.module.css';
import { Link , useNavigate,useLocation} from 'react-router-dom';
import {auth} from '../../Utility/Firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword}  from "firebase/auth"
import {DataContext} from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import {ClipLoader} from 'react-spinners'




function Auth() {
  const [email,setEmail] = useState ("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  });
  const [{user} ,dispatch] = useContext(DataContext);
  const navigate = useNavigate();
const navStateData = useLocation();
console.log(navStateData);
  // console.log(user);


const authHandler = async(e) => {
  e.preventDefault()
  console.log(e.target.name);

  if (e.target.name == "signin"){
    setLoading({ ...loading,signIn:true})
// firebase auth
    signInWithEmailAndPassword(auth,email,password)
    .then((userInfo) => {
      
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      });
      setLoading({
        ...loading,signIn:false});
        navigate(navStateData?.state?.redirect || "/");

    }).catch((err) => {
      setError(err.message)
      setLoading({...loading, signIn:false});
    })

  }else{
    setLoading({...loading,signUp:true})
    createUserWithEmailAndPassword(auth,email,password)
    .then((userInfo) =>{
       dispatch({
        type:Type.SET_USER,
        user:userInfo.user,
      });
      setLoading({...loading,signUp:false});
       navigate(navStateData?.state?.redirect || "/");
      
    }).catch((err) =>{
      setError(err.message);
      setLoading({...loading, signUp:false});
    })
  }

}




   return (
    
    <section className={classes.login}>
      <Link to={"/"}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1224px-Amazon_logo.svg.png' alt=''/>
      </Link>

<div className={classes.login__container}>
  <h1>Sign In</h1>
 {navStateData?.state?.msg && (
  <small style ={{
    padding: "5px",
    textAlign: "center",
    color: "red",
    fontWeight:"bold",
   }} 
   >
  
    {navStateData?.state?.msg}
   
  </small>
 )}
  <form action="">
    <div>
      <label htmlFor='email'>Email</label>
      <input value ={email} onChange = {(e) => setEmail(e.target.value)}type='email' id='email' />
    </div>
    <div><label htmlFor="password">Password</label>
    <input value={password} onChange = {(e) => setPassword(e.target.value)}type="password" id="password" />
    
    </div>
    <button  type ="submit" 
    
    onClick = {authHandler} 
    name='signin'
    className={classes.
      
      login__signInButton}
      >{
        loading.signIn ?(<ClipLoader color='#000' size={15}></ClipLoader>):("Sign In")
      
      }</button>





  </form>
  <p> By Signing-Nn You Agree To The AMAZON FAKE CLONE Conditions Of Use & Sale. Please See Our Privacy Notice, Our Cookies Notice, And Our Interest-Based Ads Notice.</p>

  <button  type = "submit" 
  name='signup'
   onClick ={authHandler}className={classes.login__registerButton} 
   
   >
    {
        loading.signUp ?(<ClipLoader color='#000' size={15}></ClipLoader>):("Creat your Amazon Account")
      
      }
      </button>
   {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}

   
</div>
    </section>
     
  );
}

export default Auth;
