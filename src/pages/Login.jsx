// controlled form -> calls POST /login

import { useState } from "react";
import { loginUser } from "./api";

export default function Login() {
    // local state for form fields 
    const [form, setForm] = useState({ email: "", password: ""});

    // Basic UI state 
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [result, setResult] = useState(null);


    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResult(null);

    const { ok, data } = await loginUser(form);
    setLoading(false);

    setMessage(ok ? 'Login successful' : (data?.error || data?.message || 'Failed'));
    setResult(data);
  };


    return (
        <div className="card">
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className="form ">
                {/* email */}
                <label>
                    Email
                    <input 
                    name='email'
                    type="email"
                    placeholder="your email" 
                    value={form.email}
                    onChange={handleChange}
                    required/>
                </label>


                {/* password */}

                <label>
                    password
                    <input 
                    name='password'
                    type="password"
                    placeholder="your password"
                    value={form.password}
                    onChange={handleChange}
                    required />
                </label>

                <button type="submit" disabled={loading}>
                    { loading ? 'Submitting...' : 'Login'}
                </button>
            </form>

            { message && <p className="msg"> {message} </p> }

            {/* show raw server JSON so you can see what came back */}
            <pre className="json">
                {JSON.stringify(result, null, 2)}
            </pre>

        </div>
    )
}