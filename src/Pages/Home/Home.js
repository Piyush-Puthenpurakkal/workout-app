import React from "react";
import Records from "../../Components/Records/Records";
import Form from "../../Components/Form/Form";
import "./Home.css";

const Home = () => {
  return (
    <section className="home-section">
      <Records />
      <Form />
    </section>
  );
};

export default Home;
