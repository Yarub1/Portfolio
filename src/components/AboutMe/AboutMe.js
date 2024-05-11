import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion"; // Import motion from framer-motion
import resumeDataJson from "../../data/resumeData.json";
import "./AboutMe.css";

const AboutMePage = () => {
  const [resumeData, setResumeData] = useState({});
  const [animateSections, setAnimateSections] = useState({}); // State to control animation for each section of the component

  useEffect(() => {
    if (Object.keys(resumeDataJson).length > 0) {
      setResumeData(resumeDataJson);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutMeSection = document.getElementById("About");
      const topOffset = aboutMeSection.offsetTop;
      const bottomOffset = topOffset + aboutMeSection.offsetHeight;
      const currentScroll = window.pageYOffset;

      // Determines when to trigger the animation for About Me section when it is reached
      if (currentScroll >= topOffset && currentScroll <= bottomOffset) {
        setAnimateSections((prevState) => ({
          ...prevState,
          aboutMe: true,
        }));
      } else {
        setAnimateSections((prevState) => ({
          ...prevState,
          aboutMe: false,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="About" className="content-about">
      <div className="about-section">
        <h3 className="About">About Me</h3>

        <div id="cssportal-grid">
          <div id="div1">
            {/*<img className="Image" src={Image} alt="profile" /> */}
          </div>

          <motion.div
            id="div2"
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: animateSections.aboutMe ? 1 : 0,
              y: animateSections.aboutMe ? 0 : -50,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="about-section-b">
              <p className="Pname">Hi, my name is {resumeData?.name}</p>

              <p className="Psummary"> I am {resumeData?.summary}</p>
            </div>
          </motion.div>

          <motion.div
            id="div3"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: animateSections.aboutMe ? 1 : 0,
              x: animateSections.aboutMe ? 0 : -50,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="education-section">
              <h3 id="Ed">Education:</h3>
              {resumeData?.education?.length ? (
                resumeData.education.map((item, index) => (
                  <div key={index} className="section-content">
                    <p>- {item.degree}.</p>
                  </div>
                ))
              ) : (
                <p>No education data available.</p>
              )}
            </div>
          </motion.div>

          <motion.div
            id="div4"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: animateSections.aboutMe ? 1 : 0,
              x: animateSections.aboutMe ? 0 : -50,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="experience-section">
              <h3 id="Ed">Experience:</h3>
              {resumeData?.experience?.length ? (
                resumeData.experience.map((item, index) => (
                  <div key={index} className="section-content">
                    <h4>
                      {item.position} at {item.company}
                    </h4>
                    <p>{item.description}</p>
                  </div>
                ))
              ) : (
                <p>No experience data available.</p>
              )}
            </div>
          </motion.div>

          <motion.div
            id="div5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: animateSections.aboutMe ? 1 : 0,
              scale: animateSections.aboutMe ? 1 : 0.5,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 id="Ed">Skills:</h3>
            <Marquee className="Marquee">
              <i class="devicon-html5-plain-wordmark colored"></i>
              <i class="devicon-css3-plain-wordmark"></i>
              <i class="devicon-javascript-plain colored"></i>
              <i class="devicon-react-original-wordmark colored"></i>
              <i class="devicon-nodejs-plain-wordmark colored"></i>
              <i class="devicon-csharp-plain colored"></i>
            </Marquee>

            <div className="skills-section">
              <div className="skills-list">
                {resumeData?.skills?.length ? (
                  resumeData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: animateSections.aboutMe ? 1 : 0,
                        scale: animateSections.aboutMe ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}>
                      <div className="skill-item">
                        <p className="skill-name">{skill}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p>No skills data available.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
