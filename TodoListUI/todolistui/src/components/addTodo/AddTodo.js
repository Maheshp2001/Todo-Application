import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddTodo()
{

    const [title,setTitle] = useState("");
    const [isCompleted,setIsCompleted] = useState(false);

    const apiUrl = "https://localhost:7034/api/Todo/";
    const token = localStorage.getItem("token") || null;

    const navigate = useNavigate();

    function handleAddTodo(e)
    {
        e.preventDefault();
        
        axios.post(apiUrl+'addTodo',{
            title : title,
            isCompleted : isCompleted
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res) =>{
            console.log("Todo added",res.data);
            navigate('/getTodos',{state :{token : token}});
            toast.success("Todo added successfully");
        })
        .catch((err)=>{
            console.log("Error in todo adding => ",err);
            navigate('/getTodos',{state :{token : token}});
            toast.error("Error while adding the todo");
        })
    }

    return (
        <div className="containerLogin">
            <h3 className='container-title'>Add Todo</h3>
            <br></br>
            <form onSubmit={handleAddTodo}>
                <div className="mb-3">
                    <label for="InputTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="InputTitle"
                    onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="InputStatus" class="form-label">Completed</label>
                    <input type="checkbox" class="form-check-input" id="InputStatus" 
                    checked={isCompleted}
                    onChange={(e)=>setIsCompleted(e.target.checked)}/>
                </div>
                <button type="submit" class="btn btn-primary">Save Todo</button>
            </form>
        </div>
    )
}
