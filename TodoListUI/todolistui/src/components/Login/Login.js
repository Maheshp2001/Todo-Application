import { useEffect, useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    
    const loginApi = "https://localhost:7034/api/User/login";

    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.clear();
    },[]);

    async function handleLogin(e) {
        e.preventDefault();

        const response = axios.post(loginApi,{
            email : emailId,
            password : password
        });

        if(localStorage.getItem("token")!==null){
            localStorage.clear();
        }

        localStorage.setItem("token",(await response).data);

        setEmailId("");
        setPassword("");

        navigate('/getTodos',{state :{token : localStorage.getItem("token")}});

        toast.success("Login success");
    }


    return (
        <div className="containerLogin">
            <h3 className='container-title'>User Login</h3>
            <br></br>
            <form onSubmit={handleLogin}>
                <div class="mb-3">
                    <label for="InputEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" 
                    onChange={(e)=>setEmailId(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="InputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="InputPassword" 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/register" className='btn btn-info'>Register</Link>
            </form>
        </div>
    )
}

export default Login;
