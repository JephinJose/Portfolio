import React, { useEffect, useMemo, useRef, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./ExperienceTimeline.less";

const experiences = [
  {
    company: "IBM",
    role: "Software Engineer",
    date: "Oct 2023 - Present",
    logo: "src/assets/images/ibm_logo4.png",
    location: "Kochi, India",
    bullets: [
      "Architected CMS-driven reusable pagebuilder blocks using Sanity & Contentful.",
      "Delivered high-performance web apps with Next.js, React, Tailwind CSS.",
      "Implemented TypeScript across full-stack codebases to reduce defects.",
      "Scaled productivity with Turborepo and rigorous code reviews."
    ],
    tags: ["TypeScript", "Next.js", "Sanity CMS", "Contentful", "Tailwind CSS"]
  },
  {
    company: "Kanini Software Solutions",
    role: "AI Engineer - Junior Associate",
    date: "2022 - 2023",
    logo: "src/assets/images/kanini_logo.png",
    location: "Chennai, India",
    bullets: [
      "Built SSR/SSG strategies to boost Core Web Vitals by 20%.",
      "Owned design system tokens and theming across apps.",
      "Drove a11y to WCAG 2.1 AA."
    ],
    tags: ["React", "SSR/SSG", "Design Systems", "Accessibility"]
  },
  {
    company: "Mykare Health",
    role: "Junior Data Engineer",
    date: "2022 - 2022",
    logo: "src/assets/images/mykare_logo.png",
    location: "Kochi, India",
    bullets: [
      "Migrated legacy UI to TypeScript.",
      "Introduced CI checks for perf & a11y regressions.",
      "Mentored juniors; led FE chapter."
    ],
    tags: ["TypeScript", "CI", "Performance", "Mentorship"]
  },
  {
    company: "Gobunc Technologies",
    role: "Machine Learning Intern",
    date: "2019 - 2020",
    logo: "src/assets/images/gobunc_logo.png",
    location: "Bangalore, India",
    bullets: [
      "Migrated legacy UI to TypeScript.",
      "Introduced CI checks for perf & a11y regressions.",
      "Mentored juniors; led FE chapter."
    ],
    tags: ["TypeScript", "CI", "Performance", "Mentorship"]
  }
];

export function ExperienceTimeline() {
  const [active, setActive] = useState(0);
  const wrapperRef = useRef(null);
  const railRef = useRef(null);
  const sliderRef = useRef(null);

  // Slider progress in [0, 1] across the whole section.
  const [progress, setProgress] = useState(0);

  // Scrollama step enter/exit to highlight cards
  const onStepEnter = ({ data }) => setActive(data);
  const onStepExit = ({ data, direction }) => {
    // When scrolling up past a step, make the previous active
    if (direction === "up") setActive(Math.max(0, data - 1));
  };

  // Continuous slider motion tied to scroll position within the wrapper
  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapperRef.current;
      const rail = railRef.current;
      if (!wrap || !rail) return;

      const rect = wrap.getBoundingClientRect();
      const viewport = window.innerHeight;

      // position of viewport center relative to wrapper
      const centerY = viewport / 2;
      const rel = centerY - rect.top; // px from wrapper top
      const total = rect.height;

      // progress clamped to [0,1]
      const p = Math.max(0, Math.min(1, rel / total));
      setProgress(p);

      // move knob within the rail height
      const railH = rail.clientHeight;
      const knob = sliderRef.current ? sliderRef.current.clientHeight : 0;
      const y = p * (railH - knob);
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateY(${y}px)`;
      }
    };

    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // For ARIA + style hook on active card
  const isActive = (i) => i === active;

  return (
    <section className="experience-timeline-wrapper" ref={wrapperRef}>
      {/* Left sticky rail */}
      <aside className="timeline-rail">
        <div className="timeline-rail__sticky">
          <div className="timeline-rail__title">
            <div className="eyebrow"></div>
            <h2>
              Professional Experience
              {/* <span className="accent">Brings Ideas to Life</span> */}
            </h2>
          </div>
          <div className="timeline-rail__line" ref={railRef}>
            <div className="timeline-rail__gradient" />
            <div className="timeline-rail__slider" ref={sliderRef}>
              {/* avatar/thumb could go here */}
              <div className="timeline-rail__thumb" />
            </div>
          </div>
        </div>
      </aside>

      {/* Right: scrollama steps (one per experience) */}
      <div className="timeline-content">
        <Scrollama
          offset={0.6}
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
        >
          {experiences.map((exp, i) => (
            <Step data={i} key={i}>
              <div
                className={`experience-step ${isActive(i) ? "is-active" : ""}`}
                aria-current={isActive(i) ? "step" : undefined}
              >
                <div className="step-meta">
                    <div className="date">{exp.date}</div>
                    <div className="location">{exp.location}</div>
                </div>

                <article className="experience-card">
                  {exp.logo && (
                        <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="company-logo"
                        />
                    )}
                  <div className="company">{exp.company}</div>
                  <h3 className="role">{exp.role}</h3>
                  <ul className="bullets">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {exp.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              </div>
            </Step>
          ))}
        </Scrollama>

        {/* Spacer to ensure the slider can reach the end gracefully */}
        <div className="timeline-end-spacer" />
      </div>
    </section>
  );
}
