import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GetTodos from './components/getTodos/GetTodos';
import AddTodo from './components/addTodo/AddTodo';
import UpdateTodo from './components/updateTodo/UpdateTodo';
import RemoveTodo from './components/deleteTodo/RemoveTodo';
import { useEffect, useState } from 'react';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  // Keep state in sync with localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, [authToken]);

  const handleLogout = () => {
    localStorage.clear();
    setAuthToken(""); // 🔑 triggers re-render
    window.location.href = "/login"; // optional redirect after logout
  };

  return (
    <BrowserRouter>

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link to="/login" class="navbar-brand">My Todos</Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/getTodos">Home</Link>
              </li>
              
            </ul>
            {
              authToken ? <button className='btn btn-danger' onClick={handleLogout}>Log Out</button> : null
            }
            
          </div>
        </div>
      </nav>

      <div className='maincontainer'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/getTodos' element={<GetTodos/>}/>
          <Route path='/addTodo' element={<AddTodo/>}/>
          <Route path='/updateTodo' element={<UpdateTodo/>}/>
          <Route path='/deleteTodo' element={<RemoveTodo/>}/>
        </Routes>
      </div>
      <ToastContainer position='top-right' autoClose={3000} />

    </BrowserRouter>

  );
}

export default App;
