import React, { useState } from 'react'
import axios from 'axios'


export default function ForgetPassword () {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState();
    const [message, setMessage] = useState();

    const requestOtp = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/forgot-pwd/req-otp", {email} )
                setMessage(res.data.message)
                setStep(2)

        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong") 
            
        }
    };

    const resetPassword = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/forgot-pwd/reset-pwd", {email} )
            setMessage(res.data.message) 
            
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong")
        }
    };

  return (
    <div>
    <h2>Forget password</h2>
    {step === 1 && (
        <>
        <input className="input-group input-group-outline mb-3"
        name='email'
        type="email"
        placeholder='your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-dark w-100" onClick={requestOtp} >Requset OTP</button>
        </>
    )}
    {step === 2 && (
        <>
        <input className="input-group input-group-outline mb-3"
        name='otp'
        type="text"
        placeholder='Enter otp'
        value={otp}
        onChange={(e) => setOtp(e.target.value)} />

        <input className="input-group input-group-outline mb-3"
        name='newPassword'
        type="text"
        placeholder='Enter NewPassword'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        />
        <button  className="btn btn-dark w-100" onClick={resetPassword}>Reset Password</button>
        </>
    
    )}
    <p>{message}</p>

        </div>
    )
}

