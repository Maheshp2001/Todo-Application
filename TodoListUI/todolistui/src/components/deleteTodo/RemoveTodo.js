import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RemoveTodo()
{
    const location = useLocation();
    const {todoId} = location.state || {};

    const [item,setItem] = useState({
        title : "",
        isCompleted:false
    });

    const navigate = useNavigate();

    const apiUrl = "https://localhost:7034/api/Todo/";

    useEffect(()=>{
        axios.get(apiUrl+"getTodo/"+JSON.stringify(todoId),{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            console.log(res.data);
            setItem({
                title : res.data.title,
                isCompleted : res.data.isCompleted
            })
        })
        .catch((err)=>{
            console.log("error = > ",err);
        })
    },[]);

    function handleDeleteTodo(e)
    {
        e.preventDefault();
        axios.delete(apiUrl+"deleteTodo/"+JSON.stringify(todoId),{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            console.log(res.data);
            navigate('/getTodos',{state : {token : localStorage.getItem("token")}});
            toast.success("Todo removed successfully");
        })
        .catch((err)=>{
            navigate('/getTodos',{state : {token : localStorage.getItem("token")}});
            toast.error("Error in todo removal");
        })
    }

    return (
        <div className="containerLogin">
            <h3 className='container-title'>Remove Todo</h3>
            <br></br>
            <form onSubmit={handleDeleteTodo}>
                <div className="mb-3">
                    <label for="InputTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="InputTitle"
                    value={item.title}
                    disabled
                   />
                </div>
                <div className="mb-3">
                    <label for="InputStatus" class="form-label">Completed</label>
                    <input type="checkbox" class="form-check-input" id="InputStatus" 
                    checked={item.isCompleted}
                    value={item.isCompleted}
                    disabled
                    />
                </div>
                <button type="submit" class="btn btn-danger">Remove Todo</button>
            </form>
        </div>
    )
}
