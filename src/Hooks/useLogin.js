import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, seterror] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    seterror(null);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      seterror(data.error);
    }

    if (response.ok) {
      //save user data in local storage
      localStorage.setItem("user", JSON.stringify(data));

      //update user context
      dispatch({ type: "LOGIN", payload: data });
    }
  };

  return { login, error };
};
