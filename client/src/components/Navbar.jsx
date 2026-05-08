import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
  await fetch("http://localhost:3000/auth/logout", {
    credentials: "include",
  });
  

  setUser(null);

  navigate("/");
};

  return (
    <nav className=" border-b border-gray-300">
      <ul className="flex items-center p-5 justify-between">

        {/* LEFT */}
        <li className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          <Link to="/" className="hover:underline-offset-1">HabitIn</Link>
        </li>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <p>Hi, {user.email.split("@")[0]}</p>

              <li>
                <button onClick={handleLogout}
                className="p-2 hover:text-primary cursor-pointer"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="p-2 hover:text-primary"
                >
                  Log In
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl shadow hover:opacity-90"
                >
                  Get Started
                </Link>
              </li>
            </>
          )}

        </div>
      </ul>
    </nav>
  )
}

export default Navbar;