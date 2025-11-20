import React, { useState } from "react";
import { BirdsBackground } from "../birdsAnimation/BirdsBackground";
import { LandingChatSection } from "./LandingChatSection";
import SunsetBackground from "../sunsetBackground/SunsetBackground";
import "./ChatInterface.less";

export function ChatInterface() {

  return (
    <div className="chat-interface">
        <SunsetBackground/>
        <div className="birds-background">
            <BirdsBackground />
        </div>
        <LandingChatSection/>
    </div>
  );
}
