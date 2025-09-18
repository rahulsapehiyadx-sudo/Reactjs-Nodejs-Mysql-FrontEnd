import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./api";

export default function Login() {
  const [form, setForm] = useState({ username: "" ,email: "", password: "" });  // add code for the username logic not added yet 
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // validation state 
  const [errors, setErrors] = useState({});

  // validation function
  const validate = (name, value) => {
    let error  = ""

    if (name === "email") {
      if (!value.trim())  error = "Email is required ";
      else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
         error = "Invalid email format"
  }

  if (name === "password") {
    if (!value.trim()) error = "Password is required";
    else if (value.length < 6) error = "Password must be at least 6 characters"
  }
   setErrors((prev) => ({ ...prev, [name]: error}));

}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));


  // validate on change 
  validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(form).forEach((key) => validate(key, form[key]));

    // if (Object.values(errors).some((err) => err)) {
    //   setMessage("Please fix the errors before logging in")
    //   return;
    
    setLoading(true);
    // setMessage("");
    const { ok, data } = await loginUser(form);
    setLoading(false);

    if (ok && data.token) {
      if (rememberMe) {
        localStorage.setItem("token", data.token)
      } else {
        sessionStorage.setItem("token", data.token)
      }
      navigate('/layout')
    }
  }


  return (


    <main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"}}>
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                  <div className="row mt-3">
            
                  </div>
                </div>
              </div>

          

              <div className="card-body">
                <form role="form"  onSubmit={handleSubmit} className="text-start">
                  <div className="input-group input-group-outline my-3">
                    <label className="form-label">Email</label>
                     <input
                        type="email"
                        className="form-control"
                        // placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
             
            />
          </div>
          {/* inline error display */}
          {errors.email && <p style={{ color: "red"}}>{errors.email}</p>}

          <div className="input-group input-group-outline mb-3">
                    <label className="form-label">Password</label>
                    <input
              type="password"
              className="form-control"
              // placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            
            />
                  </div>

          {/* inline error display  */}
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
         
                  <div className="form-check form-switch d-flex align-items-center mb-3">
                    <input className="form-check-input" type="checkbox" id="rememberMe" 
                     checked={rememberMe}
                     onChange={(e) => setRememberMe(e.target.checked)}
                     />
                    <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2"  
                    disabled={loading}>
                    {loading ? "Logging in..." : "Login"}</button>
                  </div>
                  <p className="mt-4 text-sm text-center">
                    Don't have an account?
                    <Link to="/">SignUp</Link>
                  </p>
                </form>
                 </div>
                <div>
          <Link className="btn btn-dark w-100" to="/reset-pwd">Reset Password</Link>
          </div>
        </div>
            </div>
          </div>
        </div>
    </div>
  </main>
     
  );
}
