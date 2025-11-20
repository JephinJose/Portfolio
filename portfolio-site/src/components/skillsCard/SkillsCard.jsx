import Reac, { useEffect, useState } from "react";
import { skillsData } from "./skillsData";
import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css'
import "./SkillsCard.less";
import { IoIosCloudOutline } from "react-icons/io";
import { IoCloudDoneOutline } from "react-icons/io5";
import { MdOutlineEngineering } from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { BsClipboardData } from "react-icons/bs";
import { RiAiGenerate, RiSpeakAiLine } from "react-icons/ri";
import { AiOutlineApi } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";

export function SkillsCard() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 1000);
      
          return () => clearTimeout(timer);
        }, []);

    const renderSkills = (skills) => {
        return skills.map((skill, index) => (
        <span key={index} className="skill-badge">{skill}</span>
        ));
    };

    return (
        <>
            {isLoading ? (
                <Pinwheel size={20} speed={0.9} stroke={5} color='black' />
                ) : (
                <div className="skills-container fade-in">
                    <h1 className="skills-title">Skills and Expertise</h1>

                    <section className="skill-category">
                    <h2><MdOutlineEngineering/>Fullstack Engineering</h2>
                    <div className="skills-list">{renderSkills(skillsData.fullstack)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><BsClipboardData/>AI & Data Science</h2>
                    <div className="skills-list">{renderSkills(skillsData.aiDataScience)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><LuDatabase/>Big Data</h2>
                    <div className="skills-list">{renderSkills(skillsData.bigData)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><RiAiGenerate/>Generative AI</h2>
                    <div className="skills-list">{renderSkills(skillsData.genAi)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><IoIosCloudOutline/>Cloud Infrastructure</h2>
                    <div className="skills-list">{renderSkills(skillsData.cloudInfra)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><IoCloudDoneOutline/>Cloud Tools</h2>
                    <div className="skills-list">{renderSkills(skillsData.cloudTools)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><AiOutlineApi/>REST Frameworks</h2>
                    <div className="skills-list">{renderSkills(skillsData.restFramework)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><VscGraph/>Visualization</h2>
                    <div className="skills-list">{renderSkills(skillsData.visualization)}</div>
                    </section>

                    <section className="skill-category">
                    <h2><RiSpeakAiLine/>Soft Skills</h2>
                    <div className="skills-list">{renderSkills(skillsData.softSkills)}</div>
                    </section>

                    <p className="skills-description">{skillsData.description}</p>
                </div>
            )}
        </>
    );
}
