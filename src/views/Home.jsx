import HomeNavbar from "components/Navbars/HomeNavbar";
import React from "react";
import "../assets/css/Home.css";

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <section className="section-one">
        <div className="container">
          <h1 className="home_h1">Landing Page</h1>
          <p className="home_p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
          <a href="" className="home-button">
            Read More
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
