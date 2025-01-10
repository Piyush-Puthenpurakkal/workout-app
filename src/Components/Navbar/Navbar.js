import { Link } from "react-router-dom";
import { useLogout } from "../../Hooks/useLogout";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };
  return (
    <nav>
      <Link to="/">WorkoutBuddy</Link>
      {user && (
        <div className="logout">
          <span>{user.email}</span>
          <button onClick={handleClick}>Logout</button>
        </div>
      )}
      {!user && (
        <div className="auth">
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
