import React from 'react'

export default function Dashboard() {
  return (

     <div className="container my-5">
      <div className="card p-4 shadow">
        <h2>Welcome to the Dashboard 🎉</h2>
        <p>This is a protected route.</p>
        <div id="sidenav-scrollbar" style={{ maxHeight: "200px", overflow: "hidden" }}>
          <button className="btn bg-gradient-dark w-100 my-4 mb-2"  
        onClick={() => {
            localStorage.removeItem('token')
            window.location.href='/';
        }}>Logout</button>
        </div>
      </div>
    </div>
  )
}


