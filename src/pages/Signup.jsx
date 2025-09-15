import React, { useState } from "react";
import { registerUser } from "./api";
import { Link, Navigate } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  // validation state
  // const [errors, setErrors] = useState({});

  // validation function
   const navigate = useNavigate();

  const checkEmail = (email) => {
    const result = {
      hasNumber: false,
      hasAtSymbol: false,
      hasValidDomain: false,
    };

    if (/[0-9]/.test(email)) {
      result.hasNumber = true;
    }

    if (email.includes("@")) {
      result.hasAtSymbol = true;
    }

    if (
      email.endsWith("@gmail.com") ||
      email.endsWith("@yahoo.com") ||
      email.endsWith("@outlook.com") ||
      email.endsWith("@gmail.in")
    ) {
      result.hasValidDomain = true;
    }

    return result;
  };

  const checkPassword = (password) => {
    const result = {
      hasMinLength: false,
      hasNumber: false,
      hasSpecialChar: false,
      hasUppercase: false,
    };

    if (password.length >= 8) {
      result.hasMinLength = true;
    }

    if (/[0-9]/.test(password)) {
      result.hasNumber = true;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      result.hasSpecialChar = true;
    }

    if (/[A-Z]/.test(password)) {
      result.hasUppercase = true;
    }

    return result;
  };


  const emailValidations = checkEmail(form.email);
  const passwordValidations = checkPassword(form.password);

  // Check if all rules are true
  const isFormValid =
    Object.values(emailValidations).every(Boolean) &&
    Object.values(passwordValidations).every(Boolean) &&
    form.username.trim() !== "";

  const renderRule = (valid, text) => {
    return (
      <div className="flex items-center gap-2">
        <span
          style={{
            display: "inline-block",
            width: "20px",
            textAlign: "center",
            fontSize: "16px",
          }}
        >
          {valid ? "✅" : "❌"}
        </span>
        <span>{text}</span>
      </div>
    );
  };


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setMessage("");
    const { ok, data } = await registerUser(form);
    setLoading(false);
    setMessage(ok ? "Registered successfully" : data?.message || "Failed");
    navigate('/login'); 
  };

  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  style={{
                    backgroundImage:
                      "url(../assets/img/illustrations/illustration-signup.jpg)",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                <div className="card card-plain">
                  <div className="card-header">
                    <h4 className="font-weight-bolder">Sign Up</h4>
                    <p className="mb-0">
                      Enter your email and password to register
                    </p>
                  </div>

                  <div className="card-body">
                    {/* form starts here */}
                    <form onSubmit={handleSubmit}>
                      <div className="input-group input-group-outline mb-3">
                        
                        <input
                          type="text"
                          className="form-control"
                          // placeholder="Name"
                          name="username"
                          placeholder="username"
                          value={form.username}
                          onChange={handleChange}
                        />
                      </div>

                      {/* inline error display */}
                      {/* {errors.username && (
                        <p style={{ color: "red" }}>{errors.username}</p>
                      )} */}

                      <div className="input-group input-group-outline mb-3">
                        
                        <input
                          type="email"
                          className="form-control"
                          // placeholder="Email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="email"
                          onFocus={() => setShowEmailPopup(true)}
                          onBlur={() => setShowEmailPopup(false)}
                        />

                        {showEmailPopup && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              marginTop: "6px",
                              background: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              padding: "10px 14px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              zIndex: 9999,
                              width: "max-content",
                              minWidth: "250px",
                            }}
                          >
                            {renderRule(
                              emailValidations.hasValidDomain,
                              "Should contain a valid domain"
                            )}
                            {renderRule(
                              emailValidations.hasAtSymbol,
                              "Should contain @ symbol"
                            )}
                            {renderRule(
                             emailValidations.hasNumber,
                              "Should contain a Number"
                            )}
                          </div>
                        )}
                      </div>

                      {/* inline error display */}
                      {/* {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )} */}

                      <div className="input-group input-group-outline mb-3">
                        
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          placeholder="password"
                          value={form.password}
                          onChange={handleChange}
                          onFocus={() => setShowPasswordPopup(true)}
                          onBlur={() => setShowPasswordPopup(false)}
                        />

                        

                        {showPasswordPopup && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              marginTop: "6px",
                              background: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "6px",
                              padding: "10px 14px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              zIndex: 9999,
                              width: "max-content",
                              minWidth: "250px",
                            }}
                          >
                            {renderRule(
                              passwordValidations.hasMinLength,
                              "Should contain minimum 8 characters"
                            )}
                            {renderRule(
                              passwordValidations.hasSpecialChar,
                              "Should contain a special character"
                            )}
                            {renderRule(
                              passwordValidations.hasUppercase,
                              "Should contain a UpperCase alphabet"
                            )}
                            {renderRule(
                              passwordValidations.hasNumber,
                              "Should contain a Number"
                            )}
                          </div>
                        )}

                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>

                      {/* inline error display */}
                      {/* {errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                      )} */}

                      {/* Submit */}
                      <div className="text-center">
                        <button
                          type="submit"
                          disabled={!isFormValid || loading}
                          className={`btn btn-lg w-100 mt-4 ${
                            isFormValid
                              ? "bg-gradient-dark text-white"
                              : "bg-secondary"
                          }`}
                        >
                          {loading ? "Submitting..." : "Sign Up"}
                        </button>
                      </div>
                    </form>

                    <Link
                      className="card-footer text-center pt-0 px-lg-2 px-1"
                      to="/login"
                    >
                      <p className="mb-2 text-sm mx-auto">
                        Already have a account
                      </p>
                    </Link>
                    <Link className="btn btn-dark w-100" to="/forget-pwd">
                      Forget Password
                    </Link>
                    {message && <p className="text-center mt-3">{message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
