import React, { useContext } from "react";
import axios from "axios";
import { Data } from "../../Context/WorkoutContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./Form.css";

const Form = () => {
  const { user } = useAuthContext();
  const {
    form,
    setform,
    setworkouts,
    workouts,
    getWorkouts,
    Updateform,
    setUpdateform,
  } = useContext(Data);
  const updateFormfield = (e) => {
    const { name, value } = e.target;
    setform({
      ...form,
      [name]: value,
    });
  };

  const createWorkout = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/workouts/",
      form,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setworkouts([...workouts, response.data]);
    setform({
      title: "",
      reps: "",
      load: "",
    });
    getWorkouts();
  };

  const updateWorkout = async (e) => {
    e.preventDefault();
    const { _id, title, reps, load } = Updateform;
    await axios.patch(
      `http://localhost:4000/api/workouts/${_id}`,
      {
        title,
        reps,
        load,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    getWorkouts();
    setUpdateform({
      _id: null,
      title: "",
      reps: "",
      load: "",
    });
  };

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateform({
      ...Updateform,
      [name]: value,
    });
  };

  return (
    <div>
      {/* CREATE FORM */}
      {!Updateform._id && (
        <div className="form">
          <h1>Create Record</h1>
          <form onSubmit={createWorkout}>
            <div className="field">
              <label htmlFor="">Exercise name: </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={updateFormfield}
              />
            </div>
            <div className="field">
              <label htmlFor="">reps: </label>
              <input
                type="number"
                name="reps"
                value={form.reps}
                onChange={updateFormfield}
              />
            </div>
            <div className="field">
              <label htmlFor="">load: </label>
              <input
                type="number"
                name="load"
                value={form.load}
                onChange={updateFormfield}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* UPDATE FORM */}
      {Updateform._id && (
        <div className="form">
          <h1>Edit Record</h1>
          <form onSubmit={updateWorkout}>
            <div className="field">
              <label htmlFor="">Exercise Name: </label>
              <input
                type="text"
                name="title"
                value={Updateform.title}
                onChange={handleUpdateFieldChange}
              />
            </div>
            <div className="field">
              <label htmlFor="">reps: </label>
              <input
                type="number"
                name="reps"
                value={Updateform.reps}
                onChange={handleUpdateFieldChange}
              />
            </div>
            <div className="field">
              <label htmlFor="">load: </label>
              <input
                type="number"
                name="load"
                value={Updateform.load}
                onChange={handleUpdateFieldChange}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
