import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./Projects.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Define currentPage here
  const projectsPerPage = 4;
  const [selectedProject, setSelectedProject] = useState(null);
  const [animateSections, setAnimateSections] = useState({ projects: false }); // State to control animation for each section of the component
  const projectSectionRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loading && !error) {
          setAnimateSections((prevState) => ({ ...prevState, projects: true }));
          loadMoreProjects();
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    observer.observe(projectSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading, error]);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    const username = "Yarub1";
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (response.ok) {
        const data = await response.json();
        setProjects((prevProjects) => [...prevProjects, ...data]);
      } else if (response.status === 403) {
        setError(
          "We're currently experiencing a high volume of traffic. Please refresh the page in a few moments."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProjects = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleProjectDetails = (project) => {
    window.open(project.html_url, "_blank"); // Open the GitHub link in a new window
  };

  return (
    <div className="container">
      <h3 className="Projects">Projects</h3>

      <div className="projects-container">
        {projects
          .slice(0, currentPage * projectsPerPage + projectsPerPage)
          .map((project, index) => (
            <motion.div
              className="quick-fact"
              key={project.id}
              initial={{
                opacity: 0,
                x: animateSections.projects ? (index % 2 === 0 ? 50 : -50) : 0,
                y: 50,
              }} // Initial motion
              animate={{
                opacity: animateSections.projects ? 1 : 0,
                x: 0,
                y: 0,
              }} // Target motion
              transition={{ duration: 0.5, delay: index * 0.1 }} // Duration
            >
              <div className="quick-fact__img">
                <img
                  src={
                    "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                  }
                  alt="Icon of Person with Heart Shown"
                  loading="lazy"
                  width="300"
                  height="300"
                />
              </div>
              <div className="quick-fact__content">
                <div className="quick-fact__title">
                  <h2>{project.name}</h2>
                </div>
                <div className="quick-fact__desc">
                  <p>{project.description}</p>
                  <button onClick={() => handleProjectDetails(project)}>
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
      <div id="observer" ref={projectSectionRef}></div>
    </div>
  );
};

export default ProjectsPage;
