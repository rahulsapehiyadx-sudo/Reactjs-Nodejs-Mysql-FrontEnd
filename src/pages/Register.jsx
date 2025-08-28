// controlled from -> calls POST /register 

import { useState } from "react";
import { registerUser } from "./api";

export default function Register() {

    // Local state for form fields 
    const [form, setForm] = useState({ username: '', email: '', password: ''});
    // .Basic UI state 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);

    // Update a single field 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }



    // Submit handler 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setResult(null);


        const { ok, data } = await registerUser(form); 
        setLoading(false);

        // Show a simple message & raw JSON response to understand the flow
    setMessage(ok ? 'Registered successfully' : (data?.error || data?.message || 'Failed'));
    setResult(data);
  };
    

    
    return (
        <> 
        <div className="card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="form">
                {/* username */}
                <label>
                    Username
                    <input 
                    name="username"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required />
                </label>

                {/* email */}
                <label>
                    Email
                    <input 
                    name="email"
                    type="eamil"
                    placeholder="Your email"
                    value={form.email}
                    onChange={handleChange}
                    required />
                </label>

                {/* password */}
                <label>
                    <input 
                    name="password"
                    type="password"
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleChange}
                    required />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'create account'}
                </button>
            </form>

                {/* feedback area */}
                {message && <p>{message}</p> }

                 {/* show raw server JSON so you can inspect what backend returns */}
                 {result && (
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                 )}

            </div></>
    )
}