import React, { useState } from "react";
import { useSignup } from "../../Hooks/useSignup";

const Signup = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { signup, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(Email, Password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
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

export default Signup;
