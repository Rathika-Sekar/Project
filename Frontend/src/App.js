import './App.css';
import Login from './Components/login';
import SignUp from './Components/Signup';
import ToDo from './Components/todo';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
