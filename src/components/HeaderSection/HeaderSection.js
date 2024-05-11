import React from "react";
import logo from "../../assets/img/logo1.png";
import "./HeaderSection.css";

const repoName = "Portfolio"; 

const HeaderSection = () => {
  return (
    <header>
      <nav className="navbar">
        <div class="container">
          <div class="flex-container">
            <div id="cssportal-grid-Header">
              <div id="divC">
                <a className="Scroll" href={`/${repoName}#aboutMe`}>
                  scroll down
                </a>
              </div>
              <div id="divR">
                <h1>
                  <a href={`/${repoName}#menu`}>Menu</a>
                </h1>
              </div>
              <div id="divL">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </div>
          </div>

          <div class="popover" id="menu">
            <div class="content">
              <a href="#" class="close"></a>
              <div class="nav">
                <ul class="nav_list">
                  <div class="nav_list_item">
                    <li>
                      <a href={`/${repoName}#hero`}>Home</a>
                    </li>
                  </div>
                  <div class="nav_list_item">
                    <li>
                      <a href={`/${repoName}#aboutMe`}>About</a>
                    </li>
                  </div>
                  <div class="nav_list_item">
                    <li>
                      <a href={`/${repoName}#projects`}>Projects</a>
                    </li>
                  </div>

                  <div class="nav_list_item">
                    <li>
                      <a href={`/${repoName}#contactMe`}>Contact</a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderSection;
