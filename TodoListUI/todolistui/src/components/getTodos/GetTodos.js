import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function GetTodos() {

    const location = useLocation();
    const { token } = location.state || {};

    const apiUrl = "https://localhost:7034/api/Todo/";

    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get(apiUrl+"getAllTodos", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setTodos(res.data);
            console.log(res.data);
        })
            .catch((err) => {
                console.log("Error in fethcing todos => ", err);
            });
    }, [apiUrl]);

    // function handleButton(todoIdVar)
    // {
    //     setTodos(prevTodos => prevTodos.map(todo => todo.todoId === todoIdVar
    //         ? {...todo,isCompleted: !todo.isCompleted}
    //         :todo
    //     ));

    // }

    function handleButton(todoIdVar,todoTitle,todoStatus)
    {
        axios.put(apiUrl+"updateTodo/"+JSON.stringify(todoIdVar),{
            title : todoTitle,
            isCompleted : !todoStatus
        },{
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
             setTodos(prevTodos => prevTodos.map(todo => todo.todoId === todoIdVar
            ? {...todo,isCompleted: !todo.isCompleted}
             :todo
         ));
        })
        .catch((err)=>{
            console.log(err);
        })
    }

   
    return (
        <div className="container">
        <Link to="/login" className="btn btn-danger">Log Out</Link>
    
        <div className="container text-center">
            
            <h2>Get Todos</h2>
            <table class="table table-success table-striped-columns">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Todo</th>
                        <th>Status</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo,index) => (
                        <tr key={todo.todoId}>
                            <td>{index+1}</td>
                            <td>{todo.title}</td>
                            <td>{todo.isCompleted ? "✅ Done" : "❌ Pending"}</td>
                            <td>
                                <button onClick={() => handleButton(todo.todoId,todo.title,todo.isCompleted)}>
                                    {todo.isCompleted ? "Mark as Pending": " Mark as Done"}</button> 
                            </td>
                            <td>
                                <Link to='/updateTodo/' state={{todoId : todo.todoId}} className="btn btn-warning">Update</Link>
                            </td>
                            <td>
                                <Link to='/deleteTodo/' state={{todoId : todo.todoId}} className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="btn btn-secondary" to='/addTodo'>Add</Link>
        </div>
            </div>
    )
}