import React, { useState, useEffect } from 'react';
import { FaRegCalendar } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { ChatWindow } from '../ChatInterface/ChatWindow';
import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css'

import './ContactCard.less';

const calculateExperience = (expStart) => {
  const today = new Date();
  const startDate = new Date(expStart);

  let years = today.getFullYear() - startDate.getFullYear();
  let months = today.getMonth() - startDate.getMonth();
  let days = today.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const experience = years + (months + days / 30) / 12;
  const rounded = Math.floor(experience * 10) / 10;

  if (rounded % 1 === 0) {
    return rounded.toString().split('.')[0];
  }
  
  return rounded;
};

export function ContactCard({ sections }) {
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const startDate = "2021-09-30"; 
    const experience = calculateExperience(startDate); 

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);

    const handleSeeMoreClick = (e) => {
        e.preventDefault(); 
        setShowChatWindow(true);
    };

    if (showChatWindow) {
    return (
      <ChatWindow
        prevMessage="hi"
        sectionsData={sections}
        sectionQueryIndex={2}
      />
    );
  }
    
  return (
    <>
    {isLoading ? (
            <Pinwheel size={20} speed={0.9} stroke={5} color='black' />
        ) : (
            <div className='fade-in'>
                <div className="contact-card">
                    <div className="card-header">
                        <img src="src/assets/images/profileImage.jpg" alt="JJ" />
                        <div className="info">
                        <h1>Jephin Jose</h1>
                        <p>Full Stack AI Engineer</p>
                        </div>
                        <div className="status">● Live</div>
                    </div>

                    <div className="card-details">
                        <div className="detail-section">
                        <h3 className="label"><FaRegCalendar />Experience</h3>
                        <p>{experience} years</p>
                        </div>
                        <div className="detail-section">
                        <h3 className="label"><IoGlobeOutline />Location</h3>
                        <p>Preferably Kochi/Remote</p>
                        </div>
                    </div>

                    <div className="tech-stack">
                        <h3><FaCode/>Tech stack</h3>
                        <ul>
                            <li><strong>Fullstack:</strong> Python, Java, React, JavaScript, TypeScript</li>
                            <li><strong>REST Frameworks:</strong> Django, Flask, ExpressJs</li>
                            <li><strong>Cloud Infrastructure:</strong> AWS, Azure, GCP</li>
                            <li><strong>Cloud Tools:</strong> Databricks, GCP Vision, S3, SES, SNS, EC2</li>
                            <li><strong>AI & Data Science:</strong> Pandas, SQL, TensorFlow, PyTorch, Scikit-learn, Keras, Statistics, Algorithms</li>
                            <li><strong>Big Data:</strong> Kafka, Hadoop, Hive, Pig, MapReduce</li>
                            <li><strong>Visualization:</strong> Tableau</li>
                            <li><strong>GenAI:</strong> AI Agents, Prompt engineering, Vector databases, RAG, CAG</li>
                        </ul>
                        {/* <a href="#" onClick={handleSeeMoreClick}>
                        See more
                        </a> */}
                    </div>

                    <div className="section-block">
                        <h3>What I bring</h3>
                        <p>
                        I bring a well-rounded mix of technical and soft skills to the table. On the tech side, I work across the full stack with languages like Python, Java, JavaScript, and frameworks such as React, Django, and Flask. I have experience with cloud platforms (AWS, Azure, GCP), data tools (Pandas, SQL, TensorFlow, PyTorch), big data technologies (Kafka, Hadoop), and GenAI concepts like RAG and vector databases. Alongside these, I value strong communication, problem-solving, adaptability, and teamwork. Key soft skills that support effective collaboration and continuous learning. I love working in teams and being creative!
                        </p>
                    </div>

                    <div className="section-block">
                        <h3>Goal</h3>
                        <p>
                        Join a bold, innovative team building AI-powered tools that matter. I want to improve fast,
                        contribute hard, and leave a mark.
                        </p>
                    </div>

                    <div className="contact-button">
                        <button onClick={() => window.location.href = 'mailto:jjephin5@gmail.com'}>
                            Contact me
                        </button>
                    </div>
                </div>
            
                <div className="contact-info">
                <h3>Feel free to get in touch!</h3>
                <ul>
                    <li><b>Email: </b> <a href="mailto:jjephin5@gmail.com">jjephin5@gmail.com</a></li>
                    <li><b>LinkedIn:</b> <a href="https://linkedin.com/in/jephin-Jose" target="_blank" rel="noopener noreferrer">linkedin.com/in/jephin-Jose</a></li>
                    <li><b>GitHub: </b> <a href="https://github.com/JephinJose" target="_blank" rel="noopener noreferrer">github.com/JephinJose</a></li>
                </ul>

                <h3>About the types of projects that excite me:</h3>
                <p>I'm especially excited about opportunities where AI takes on the heavy lifting, enabling me to concentrate on driving meaningful, impactful outcomes.
                    My passion lies at the intersection of AI development and full-stack web applications. When a project is innovative and presents a real challenge, 
                    I'm eager to bring my skills and creativity to the table and make a valuable contribution.</p>
                </div>
            </div>
        )}
    </>
  );
}