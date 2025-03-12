import React, { useEffect, useContext } from "react";
import { Data } from "../../Context/WorkoutContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./Records.css";

const Records = () => {
  const { user } = useAuthContext();
  const { workouts, getWorkouts, deleteWorkout, toggleUpdate } =
    useContext(Data);

  useEffect(() => {
    if (user) {
      getWorkouts();
    }
  }, [user, getWorkouts]);

  return (
    <div className="records">
      {workouts &&
        workouts.map((item) => {
          return (
            <div className="record" key={item._id}>
              <div className="content">
                <h1>Name of Exercise: {item.title}</h1>
                <p>Reps: {item.reps}</p>
                <p>Load (in kg): {item.load}</p>
              </div>
              <div className="btns">
                <img
                  onClick={() => {
                    toggleUpdate(item);
                  }}
                  src={require("../../assets/edit.png")}
                  alt="Edit"
                />
                <img
                  onClick={() => {
                    deleteWorkout(item._id);
                  }}
                  src={require("../../assets/delete.png")}
                  alt="Delete"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Records;
