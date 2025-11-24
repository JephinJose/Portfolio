import React, { useEffect, useState } from "react";
import { ChatInterface } from "../ChatInterface/ChatInterface";
import Experience from "../experienceTimeline/Experiences";
import SkillsVisualization from "../SkillsSection/Skills";
import PersonalBranding from "../BrandingSection/PersonalBranding";
import Contact from "../ContactSection/Contact";
import "./LandingPage.less";

export function LandingPage() {

  const [headingColor, setHeadingColor] = useState("rgb(0,0,0)");

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        const percent = docHeight > 0 ? scrollTop / docHeight : 0;
        const v = Math.round(percent * 255);

        setHeadingColor(`rgb(${v}, ${v}, ${v})`);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <div className="container" >
      <ChatInterface />
      <div className="content-wrapper">
        <Experience headingColor={headingColor} />
      </div>
      <div className="content-wrapper">
        <SkillsVisualization headingColor={headingColor} />
      </div>
      <div className="content-wrapper">
        <PersonalBranding />
      </div>
      <Contact color={headingColor} />

    
      {/* <ExperienceTimeline />
       <ExperienceTimeline /> */}
    </div>
  );
}
