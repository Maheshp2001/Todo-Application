import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export default function UpdateTodo()
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

    function handleUpdateTodo(e)
    {
        e.preventDefault();
        axios.put(apiUrl+"updateTodo/"+JSON.stringify(todoId),{
            title : item.title,
            isCompleted : item.isCompleted
        },{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            console.log(res.data);
            navigate('/getTodos',{state :{token : localStorage.getItem("token")}});
            toast.success("Updated successfully");
        })
        .catch((err)=>{
            console.log(err);
            navigate('/getTodos',{state :{token : localStorage.getItem("token")}});
            toast.error("Error in update");
        });
    }

    return (
        <div className="containerLogin">
            <h3 className='container-title'>Update Todo</h3>
            <br></br>
            <form onSubmit={handleUpdateTodo}>
                <div className="mb-3">
                    <label for="InputTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="InputTitle"
                    value={item.title}
                    onChange={(e)=>setItem({
                        ...item,
                        title : e.target.value
                    })}/>
                </div>
                <div className="mb-3">
                    <label for="InputStatus" class="form-label">Completed</label>
                    <input type="checkbox" class="form-check-input" id="InputStatus" 
                    checked={item.isCompleted}
                    value={item.isCompleted}
                    onChange={(e)=>setItem({
                        ...item,
                        isCompleted : e.target.checked
                    })}/>
                </div>
                <button type="submit" class="btn btn-primary">Save Updated Todo</button>
            </form>
        </div>
    )
}
