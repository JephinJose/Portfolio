import React, { useRef, useState, useEffect } from "react";
import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css'

import "./ProjectsCard.less";

const projects = [
  {
    title: "Fun Project",
    name: "Vox Profile",
    description: "An AI interface to identify speakers using spectal analysis",
    image: "src/assets/images/Spectrogram2.jpg",
  },
   {
    title: "Fun Project",
    name: "Solver",
    description: "A Fun bot that uses reinforcement learning to solve puzzles",
    image: "src/assets/images/maze_puzzle.jpg",
  },
  {
    title: "Startup Days",
    name: "SSWF",
    description: "A medical grade application to transcribe complex handrwritten prescriptions",
    image: "src/assets/images/prescription-SSWF.png",
  },
  {
    title: "AI Explorer",
    name: "Neura",
    description: "An AI-powered research tool for summarizing papers.",
    image: "https://i.ibb.co/9gkzFj1/ai-brain.png",
  },
  {
    title: "Finance Tracker",
    name: "TrackIt",
    description: "Personal finance tracker with insights.",
    image: "https://i.ibb.co/zxNG1Gm/finance.png",
  },
];

export function ProjectsCard() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    if (isLoading) return;
    checkScroll();
    const el = scrollRef.current;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <>
        {isLoading ? (
            <Pinwheel size={20} speed={0.9} stroke={5} color='black' />
        ) : (
            <div className="projects-section fade-in">
                <h2 className="projects-heading">My Projects</h2>

                <div className="carousel-wrapper" ref={scrollRef}>
                    <div className="projects-container">
                    {projects.map((proj, i) => (
                        <div
                        key={i}
                        className="project-card"
                        style={{ backgroundImage: `url(${proj.image})` }}
                        >
                        <div className="overlay" />
                        <div className="project-content">
                            <div className="project-title">{proj.title}</div>
                            <div className="project-name">{proj.name}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="projects-controls">
                    <button
                    className="arrow-btn"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    >
                    ←
                    </button>
                    <button
                    className="arrow-btn"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    >
                    →
                    </button>
                </div>

                <div className="projects-description">
                    <p>Here are some of the projects I've worked on! 🎉</p>
                    <ul>
                    {projects.map((proj, i) => (
                        <li key={i}>
                        <strong>{proj.name.toLowerCase()}:</strong> {proj.description}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        )}
    </>
  );
}
