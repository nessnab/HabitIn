import { useState } from "react";
import { Link } from "react-router-dom"

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <main className="flex-1 items-center justify-center py-7">
    <div className="flex-1 items-center justify-center py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-7 space-y-4 text-left">
          <h2 className="text-primary text-3xl font-bold max-w-md">Sign Up</h2>
          <input 
            type="text" name="email" placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)} required 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          <div className="email error"></div>

          <input type="password" name="password" placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)} required 
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          <div className="password error"></div>

          <button className="bg-primary text-white px-4 py-2 rounded mr-4 hover:bg-primary-light cursor-pointer">
            Sign Up
          </button>
          <p>Don't have an account? <Link to="/login" className="text-primary hover:underline">Log In</Link></p>
      </form>
    </div>
    </main>
  )
}

export default Signup;