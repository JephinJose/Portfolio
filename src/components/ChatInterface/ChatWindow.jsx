import React, { useState, useEffect } from "react";
import { FiChevronRight, FiMoreHorizontal } from "react-icons/fi";
import "./ChatWindow.less";
import { MoreOptionsOverlay } from "./MoreOptionsOverlay";
import { moreOptionsData } from "./moreOptionsData";
import { ChatMessageWithLoading } from "../../utils/typingUtils";
import { ProfileCard } from "../profileCard/ProfileCard";
import { SkillsCard } from "../skillsCard/SkillsCard";
import { ContactCard } from "../contactCard/contactCard";
import PublicationsCard from "../publicationsCard/publicationsCard";
import { ProjectsCard } from "../projectsCard/ProjectsCard";

export function ChatWindow({ prevMessage, sectionsData, sectionQueryIndex }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (prevMessage) {
      handleAnimatedMessage(prevMessage);
    }
  }, [prevMessage]);

  useEffect(() => {
    if (sectionQueryIndex !== undefined && sectionQueryIndex in componentMap) {
      const section = sectionsData[sectionQueryIndex];
      const ComponentToRender = componentMap[sectionQueryIndex];

      if (section && ComponentToRender) {
        setChat([]);

        setTimeout(() => {
          setChat([{ type: "user", text: section.message, anim: "fade-in" }]);
        }, 150);

        setTimeout(() => {
          setChat([{ type: "user", text: section.message, anim: "fade-out" }]);
        }, 2000);

        setTimeout(() => {
          setChat([
            { type: "user", text: section.message, anim: "hidden" },
            { type: "component", component: ComponentToRender },
          ]);
        }, 3000);
      }
    }
  }, [sectionQueryIndex, sectionsData]);

  const handleAnimatedMessage = (msg) => {
    setChat([{ type: "user", text: msg?.text || msg, anim: "fade-in" }]);

    setTimeout(() => {
      setChat([{ type: "user", text: msg?.text || msg, anim: "fade-out" }]);
    }, 2000);

    setTimeout(() => {
      setChat([
        { type: "user", text: msg?.text || msg, anim: "hidden" },
        {
          type: "bot",
          text: msg?.message || "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          anim: "fade-in",
        },
      ]);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    handleAnimatedMessage(message);
    setMessage("");
  };

  const componentMap = {
    0: <ProfileCard />,
    1: <ProjectsCard />,
    2: <SkillsCard />,
    3: <PublicationsCard />,
    4: <ContactCard sections={sectionsData} />,
  };

  const handleSectionClick = (section, index) => {
    const ComponentToRender = componentMap[index];

    if (ComponentToRender) {
      setChat([]);

      setTimeout(() => {
        setChat([{ type: "user", text: section.message, anim: "fade-in" }]);
      }, 150);

      setTimeout(() => {
        setChat([{ type: "user", text: section.message, anim: "fade-out" }]);
      }, 2000);

      setTimeout(() => {
        setChat([
          { type: "user", text: section.message, anim: "hidden" },
          { type: "component", component: ComponentToRender },
        ]);
      }, 3000);
    } else {
      handleAnimatedMessage(section.message);
    }
  };

  return (
    <div className={`chat-window-container ${loaded ? "loaded" : "preload"}`}>
      {/* Chat messages */}
      <div className="chat-window">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.type} ${msg.anim || ""}`}>
            {msg.type === "bot" ? (
              <ChatMessageWithLoading text={msg.text.split(" ")} delay={1000} />
            ) : msg.type === "component" ? (
              msg.component
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="chatWindow-sections">
        {sectionsData.map((section, index) => (
          <button
            key={index}
            className="chatWindow-section-button"
            onClick={() => handleSectionClick(section, index)}
          >
            <span className="icon">{section.icon}</span>
            <span className="label">{section.label}</span>
          </button>
        ))}
        <button
          key="newSection"
          className="chatWindow-section-button"
          onClick={() => setShowOverlay(true)}
        >
          <span className="icon">
            <FiMoreHorizontal />
          </span>
        </button>
      </div>

      {/* Input */}
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="chat-submit">
          <FiChevronRight size={20} />
        </button>
      </form>

      {/* Overlay */}
      <MoreOptionsOverlay
        isOpen={showOverlay}
        onClose={() => setShowOverlay(false)}
        onSelect={(msg) => handleAnimatedMessage(msg)}
        data={moreOptionsData}
      />
    </div>
  );
}
