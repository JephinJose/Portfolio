import React, { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import {
  FaSmile,
  FaBriefcase,
  FaLayerGroup,
} from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { RiUserSearchFill } from "react-icons/ri";
import { Typewriter } from "react-simple-typewriter";
import { RiHome7Fill } from "react-icons/ri";
import { ChatWindow } from "./ChatWindow";
import "./LandingChatSection.less";

export function LandingChatSection() {
  const [message, setMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [sectionQueryIndex, setSectionQueryIndex] = useState(-1);
  const [showTypewriter, setShowTypewriter] = useState(false);

  const sections = [
    { icon: <FaSmile color="#000000"/>, label: "Me", message: "Can you share a bit about who you are?" },
    { icon: <FaBriefcase color="#000000"/>, label: "Projects", message: "What kinds of projects have you been working on lately?"  },
    { icon: <FaLayerGroup color="#000000"/>, label: "Skills", message: "What are your superpowers (the professional kind)?"  },
    { icon: <IoNewspaperSharp color="#000000"/>, label: "Publications", message: "Dropped any knowledge bombs lately? Got stuff we can read?"  },
    { icon: <RiUserSearchFill color="#000000"/>, label: "Contact", message: "How do we reach you without sending a carrier pigeon?"  },
  ];

  const typewriterSentences = [
    "Hi, I'm Jephin",
    "Welcome to my portfolio!",
    "Ask me about my skills!",
    "Explore my projects",
    "Let's build something amazing together",
    "Feel free to contact me anytime",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSectionQueryIndex(-1);
    setChatStarted(true);
  };

  const navigateToHome = () => {
      setChatStarted(false);
    };

  const handleSectionClick = (index, sectionMessage) => {
    setSectionQueryIndex(index);
    setChatStarted(true);
    setMessage(sectionMessage);
  };

  if (chatStarted) {
    return (
      <>
      <div
        className="home-icon-container"
        onClick={navigateToHome}
      >
        <RiHome7Fill size={24} color="#000000" />
      </div>
      <ChatWindow
        prevMessage={message}
        sectionsData={sections}
        sectionQueryIndex={sectionQueryIndex}
      />
      </>
    );
  }

  return (
    <div className="landing-chat-section">
     <div className="name-title">
          <div className={`typewriter-wrapper ${showTypewriter ? "visible" : ""}`}>
            {showTypewriter && (
              <Typewriter
                words={typewriterSentences}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1500}
              />
              )} <span className="placeholder-text"></span> 
            </div>
        
      </div>
      <div className="role-info">
        <h1>Full Stack AI Engineer</h1>
        <h2>Turning ideas into code since 2019</h2>
      </div>

      {/* Input form */}
      <div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="landingchat-submit">
            <FiChevronRight color="#000000" className="landingPageSubmit-icon"/>
          </button>
        </form>
      </div>

      {/* Section buttons */}
      <div>
        <div className="chat-sections">
          {sections.map((section, index) => (
            <button
              key={index}
              className="chat-section-button"
              onClick={() => handleSectionClick(index, section.message)}
            >
              <span className="icon">{section.icon}</span>
              <span className="label">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
