import { useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import "./Login.css";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(Email, Password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="field">
          <label htmlFor="">Email: </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={Email}
          />
        </div>
        <div className="field">
          <label htmlFor="">Password: </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={Password}
          />
        </div>
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
