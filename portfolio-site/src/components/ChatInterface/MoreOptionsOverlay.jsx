import React, { useEffect, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import "./MoreOptionsOverlay.less";

export function MoreOptionsOverlay({ isOpen, onClose, onSelect, data }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = "";
    }
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const startDrag = (e) => {
    setDragging(true);
    setDragOffset(e.touches ? e.touches[0].clientY : e.clientY);
  };

  const onDrag = (e) => {
    if (!dragging || !containerRef.current) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - dragOffset;

    if (deltaY > 0) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const endDrag = (e) => {
    if (!dragging || !containerRef.current) return;
    const currentY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const deltaY = currentY - dragOffset;

    setDragging(false);
    setDragOffset(0);

    containerRef.current.style.transition = "";

    if (deltaY > 100) {
      onClose();
    } else {
      containerRef.current.style.transform = "";
    }
  };

  return (
    <div
      className={`overlay-backdrop ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className={`overlay-container ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={onDrag}
        onTouchEnd={endDrag}
      >
        <div
          className="overlay-handle"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        />

        <div className="overlay-content" ref={contentRef}>
          {Object.keys(data).map((section, idx) => (
            <div key={idx} className="overlay-section">
              <div className="overlay-section-header">
                {data[section].icon && (
                  <span className="section-icon">{data[section].icon}</span>
                )}
                <h4>{data[section].title || section}</h4>
              </div>
              <hr />
              <ul>
                {data[section].items.map((item, i) => (
                  <li
                    key={i}
                    className={`overlay-item ${item.primary ? "primary" : ""}`}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                  >
                    <span>{item.text}</span>
                    <FiChevronRight className="chevron" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
