import { useState } from 'react';
import './Register.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {

    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");

    const registerApi = "https://localhost:7034/api/User/register";

    const navigate = useNavigate();

    async function handleRegister(e)
    {
        e.preventDefault();

        try
        {
            const response = await axios.post(registerApi,{
                email : emailId,
                password : password
            });
            setEmailId("");
            setPassword("");

            if(localStorage.getItem("token")!==null){
            localStorage.clear();
            }

            navigate('/login');

            toast.success("Registration success");
        }
        catch(err)
        {
            toast.error("Registration failed. Please try again");
            console.log(err)
        }

    }

    return (
        <div className="containerRegister">
            <h3 className='container-title'>New User Registration</h3>
            <br></br>
            <form onSubmit={handleRegister}>
                <div class="mb-3">
                    <label for="InputEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" 
                    onChange={(e)=>setEmailId(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="InputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="InputPassword" 
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
                <Link to="/login" className='btn btn-info'>Login</Link>
            </form>
        </div>
    )
}

export default Register;
