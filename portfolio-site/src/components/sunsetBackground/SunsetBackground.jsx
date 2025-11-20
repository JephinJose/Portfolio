import React, { useEffect, useState } from "react";
import "./SunsetBackground.less";

const SunsetBackground = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sunset-background">
      {/* Keep your current sunrise/sunset gradient untouched */}
      <div className="sunset-overlay">{children}</div>

      {/* Add a night overlay that fades in as you scroll */}
      <div
        className="night-overlay"
        style={{ opacity: scrollProgress }}
      />
    </div>
  );
};

export default SunsetBackground;
