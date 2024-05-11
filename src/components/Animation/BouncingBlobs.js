import React, { useEffect } from "react";
import "./BouncingBlobs.css";

const BouncingBlobs = () => {
  useEffect(() => {
    const MIN_SPEED = 1.5;
    const MAX_SPEED = 2.5;

    function randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Blob {
      constructor(el) {
        const boundingRect = el.getBoundingClientRect();
        this.el = el;
        this.size = boundingRect.width;
        this.initialX = randomNumber(0, window.innerWidth - this.size);
        this.initialY = randomNumber(0, window.innerHeight - this.size);
        this.el.style.top = `${this.initialY}px`;
        this.el.style.left = `${this.initialX}px`;
        this.vx =
          randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
        this.vy =
          randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
        this.x = this.initialX;
        this.y = this.initialY;

        // Add mousemove event listener
        this.el.addEventListener("mousemove", this.handleMousemove.bind(this));
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x >= window.innerWidth - this.size) {
          this.x = window.innerWidth - this.size;
          this.vx *= -1;
        }
        if (this.y >= window.innerHeight - this.size) {
          this.y = window.innerHeight - this.size;
          this.vy *= -1;
        }
        if (this.x <= 0) {
          this.x = 0;
          this.vx *= -1;
        }
        if (this.y <= 0) {
          this.y = 0;
          this.vy *= -1;
        }
      }

      move() {
        this.el.style.transform = `translate(${this.x - this.initialX}px, ${
          this.y - this.initialY
        }px)`;
      }

      // Function to handle mousemove event
      handleMousemove() {
        const scaleFactor = 1.2; // Increase size by 20%
        this.el.style.transform = `scale(${scaleFactor})`;
      }
    }

    function initBlobs() {
      const blobEls = document.querySelectorAll(".bouncing-blob");
      const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

      function update() {
        requestAnimationFrame(update);
        blobs.forEach((blob) => {
          blob.update();
          blob.move();
        });
      }

      requestAnimationFrame(update);
    }

    initBlobs();

    return () => {
      // Cleanup function
    };
  }, []);

  return (
    <div>
      <div className="bouncing-blobs-container">
        <div className="bouncing-blobs-glass"></div>
        <div className="bouncing-blobs">
          <div className="bouncing-blob bouncing-blob--blue"></div>
          <div className="bouncing-blob bouncing-blob--blue"></div>
          <div className="bouncing-blob bouncing-blob--blue"></div>
          <div className="bouncing-blob bouncing-blob--white"></div>
          <div className="bouncing-blob bouncing-blob--purple"></div>
          <div className="bouncing-blob bouncing-blob--purple"></div>
          <div className="bouncing-blob bouncing-blob--pink"></div>
        </div>
      </div>
      <div className="Blob">
        <div className="tutorial-link">
          {/* Add any additional content here */}
        </div>
      </div>
    </div>
  );
};

export default BouncingBlobs;
