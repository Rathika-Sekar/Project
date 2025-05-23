import { useState, useEffect } from "react";
import Layout from "../Layout/layout";
import { useNavigate } from 'react-router-dom';
import styles from './todo.module.css';
import axios from "axios"
function TodoForm({ inputText, setInputText, handleSubmit }) {
    return (
      <form onSubmit={handleSubmit}>
        <input className={styles.todoInput} type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter task"/>
        <button className={styles.todobutton} type="submit">Add</button>
      </form>
    );
  }
function TodoItem({ todo, onToggle, onDelete, isSubmitting }) {
    return (
      <tr>
        <td style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'black'
        }}>{todo.date}</td>
        <td style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'gray' : 'black'
        }}>{todo.task}</td>
        <td>
          <button className={styles.todocomplete}
            style={{
              background: todo.completed ? 'green' : 'orange',
              color: todo.completed ? 'white' : 'black'
            }} onClick={() => onToggle(todo.id)} disabled={isSubmitting === todo.id}>
            {todo.completed ? 'Completed' : 'Not Completed'}
          </button>
        </td>
        <td>
          <button className={styles.tododelete} onClick={() => onDelete(todo.id)}> Delete</button>
        </td>
      </tr>
    );
  }
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <div className={styles.todolist}>
      <h3 className={styles.h3}>Your Todo List</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ToDo() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState('');
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const baseURL = 'http://localhost:7071';
  const fetchCurrentUser = async () => {
  try{
      const res=await axios.get(`${baseURL}/todo/current-user`, { withCredentials: true });
      setCurrentUser(res.data); 
    }
    catch (error) {
      alert("Session expired or user not logged in.");
      navigate("/login");
    }
  };
  const fetchTodos = async(user) => {
     const res=await axios.get(`${baseURL}/todo/${user}`);
    setTodos(res.data);

   };

  useEffect(() => {
    fetchCurrentUser(); 
  });

  useEffect(() => {
    if (currentUser) {
      fetchTodos(currentUser);
    }
  }, [currentUser]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      alert("Task can't be empty.");
      return;
    }
    const newTodo = {
      username:currentUser,
      date: new Date().toLocaleDateString(),
      task: inputText,
      completed: false
    };
    try{
      console.log("Submitting new task:", newTodo);
    const res = await axios.post(`${baseURL}/todo/${currentUser}`, newTodo,{
      withCredentials: true});
    setTodos([...todos, res.data]);
    setInputText('');
    }
    catch (err) {
      alert("Error adding task");
    }
  };
  const deleteTodo =async (id) => {
    await axios.delete(`${baseURL}/todo/${id}`);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  const completeTodo =async (id) => {
    const res = await axios.put(`${baseURL}/todo/${id}`);
    const updatedTodo = res.data;
    setTodos(
        todos.map(todo =>
          todo.id === id ? updatedTodo  : todo
        )
      );
  };
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <Layout />
      <center>
        <div className={styles.todo}>
          <h2>Welcome {currentUser}</h2>
          <TodoForm
            inputText={inputText}
            setInputText={setInputText}
            handleSubmit={handleSubmit}
          />
          <hr />
          <TodoList
            todos={todos}
            onToggle={completeTodo}
            onDelete={deleteTodo}
          />
          <button className={styles.logoutbutton} onClick={handleLogout}>Logout</button>
        </div>
      </center>
    </>
  );
}
export default ToDo;