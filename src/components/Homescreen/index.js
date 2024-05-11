import React from "react"; 

import Herosection from "../HeroSection/HeroSection";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";
import ContactMe from "../ContactMe/ContactMe";

import "./Home.css"; 

function Home() {
  return (
    <>
      <section id="hero" className="section-container">
       
        <Herosection />
      </section>
      <section id="aboutMe" className="section-container">
     
        <AboutMe />
      </section>
      <section id="projects" className="section-container">
      
        <Projects />
      </section>
      <section id="contactMe" className="section-container">
       
        <ContactMe />
      </section>
    </>
  );
}

export default Home;
