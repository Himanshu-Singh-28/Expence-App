import axios  from 'axios';
import React, { useContext, useState } from 'react'
import { server } from '../../main';
import {Navigate} from 'react-router-dom'
import './Register.css'
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { context } from '../../ContextProvider';

const Register = () => {
    const {isAuth,setIsAuth,setClose,setactive}=useContext(context);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false);

    if(isAuth){
        toast("Already Register",{duration:1000});
        return <Navigate replace to="/" />;
    }

    const submitHandler= async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const {data}=await axios.post(`${server}/user/register`,{name,email,password},{withCredentials:true});
            if (data.success) {
                setLoading(false);
                toast.success(data.message,{duration:1000});
                setIsAuth(true);
              } else {
                setLoading(false);
                toast.error(data.message,{duration:1000});
                setIsAuth(false);
              }
            return <Navigate to={"/"}/>

        } catch (error) {
            setLoading(false);
            toast.success(error.response.data.message,{duration:1000});
            setIsAuth(false);
        }
        if(isAuth){
            return <Navigate to={"/"}/>
        }
    }

    if(loading){
        return <Loading open={loading}/>
    }
  return (
    <div
      className="loginbox-container"
      onClick={() => {
        setClose("nav-menu");
        setactive("Link");
      }}
    >
      <div className="img-container">
        <img src="Expence-image.jpg" className="image" />
      </div>
      <section className="background-login">
        <div className="shape-login"></div>
        <div className="shape-login"></div>
        <form onSubmit={submitHandler}>
          <h3>Register</h3>
          <label htmlFor="Name">Name of User</label>
          <input
            id="Name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={submitHandler} disabled={loading}>
            Register
          </button>
        </form>
      </section>
      {loading && <Loading open={loading} />}
    </div>
  );
}

export default Register