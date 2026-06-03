import { Link } from "react-router-dom";

import '../dist/output.css';



function Landing() {
    
    // const user = null;
  return (
    <main>
      <div className="flex py-15 text-center items-center">
        <div className="m-auto text-center max-w-lg mt-3">
            <h1 className="text-6xl font-bold my-4 text-gray-900">
                Build Your Habit with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">HabitIn</span>

            </h1>
            <p className="px-4 text-xl">
                HabitIn is your personal habit tracker designed to help you build and maintain positive habits effortlessly. 
            </p>
            <div className="my-9 mx-auto">
                <Link to="/app" className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl shadow hover:opacity-90">Get Started</Link>
                <Link to="/signup" className="border border-primary text-primary text-bold px-4 py-2 rounded-xl ml-2 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all">Sign Up</Link>
            </div>
        </div>
    </div>
    </main>
  )
}

export default Landing;