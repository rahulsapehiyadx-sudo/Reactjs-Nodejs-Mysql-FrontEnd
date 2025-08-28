// Single screen with a simple toggle between Login and Register
import './styles.css'
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    // mode controls which form is visible 
    const [mode, setMode] = useState('login'); // login | register 

    return (
        <div className="container">
            <h1>Welcome to the App</h1>

        {/* Tabs  */}
        <div className="tabs">
            <button className={mode === 'login' ? 'tab active' : 'tab'} 
            onClick={() => setMode('login')}>Login</button>

            <button
            className={mode === 'register' ? 'tab active' : 'tab'}
            onClick={() => setMode('register')}>Register</button>
        </div>

        {/* Render the active form  */}
        {mode === 'login' ? <Login/> : <Register/>}

        {/* Small note to remind where backend should run */}
      <p className="hint">
        Make sure your backend is running on <code>http://localhost:5000</code> with endpoints
        <code>/api/auth/login</code> and <code>/api/auth/register</code>.
      </p>

        </div>
    )
}