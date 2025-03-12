import axios from "axios";
import React from "react";
import { createContext, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";

export const Data = createContext();

const WorkoutContext = ({ children }) => {
  const { user } = useAuthContext();
  //GET Request State
  const [workouts, setworkouts] = useState(null);

  //Get Request function
  const getWorkouts = async () => {
    const response = await axios.get(
      "https://workout-app-backend-zauy.onrender.com/api/workouts/",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = response.data;
    setworkouts(data);
    // console.log(response.data);
  };

  //   POST Request State
  const [form, setform] = useState({
    title: "",
    reps: "",
    load: "",
  });

  // DELETE Request Function
  const deleteWorkout = async (_id) => {
    await axios.delete(`http://localhost:4000/api/workouts/${_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    getWorkouts();
  };

  // UPDATE Request State
  const [Updateform, setUpdateform] = useState({
    _id: null,
    title: "",
    reps: "",
    load: "",
  });

  const toggleUpdate = (item) => {
    // console.log(item);
    setUpdateform({
      _id: item._id,
      title: item.title,
      reps: item.reps,
      load: item.load,
    });
  };

  return (
    <>
      <Data.Provider
        value={{
          workouts,
          setworkouts,
          getWorkouts,
          form,
          setform,
          deleteWorkout,
          Updateform,
          setUpdateform,
          toggleUpdate,
        }}
      >
        {children}
      </Data.Provider>
    </>
  );
};

export default WorkoutContext;
