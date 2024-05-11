import React from "react";
import {

Html5,
Css3,
Javascript,
ReactJs,
Nodejs,
DotNet,
Csharp,
} from "devicon/react";

class SkillsMarquee extends React.Component {
render() {
  return (
    <div>
      <marquee behavior="scroll" direction="left">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/icons/html5.svg"}
            alt="HTML5"
          />
        </div>
      </marquee>
      <div className="skills-list">
        {this.props.resumeData?.skills?.length ? (
          this.props.resumeData.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <p className="skill-name">{skill}</p>
            </div>
          ))
        ) : (
          <p>No skills data available.</p>
        )}
      </div>
    </div>
  );
}
}

export default SkillsMarquee;
