import React from "react";
import { ChatInterface } from "../ChatInterface/ChatInterface";
import { ExperienceTimeline } from "../experienceTimeline/ExperienceTimeline";
import "./LandingPage.less";

export function LandingPage() {

  return (
    <div className="container" >
      <ChatInterface/>
      <ExperienceTimeline />
       <ExperienceTimeline />

      {/* <div className="section"><div className="card">Section 2</div></div>
      <div className="section"><div className="card">Section 3</div></div>
      <div className="section"><div className="card dark">Section 4</div></div>
      <div className="section"><div className="card dark">Section 5</div></div>
      <div className="section"><div className="card dark">Section 6</div></div> */}
    </div>
    // <div></div>
  );
}
