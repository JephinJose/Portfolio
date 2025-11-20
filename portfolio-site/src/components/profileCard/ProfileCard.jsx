import React, { useState, useEffect } from "react";
import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css'
import "./ProfileCard.less";

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
    age--;
  }

  return age;
};

export function ProfileCard() {
    const [isLoading, setIsLoading] = useState(true);
    
    const birthdate = "1998-10-30"; 
    const age = calculateAge(birthdate); 
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <>
        {isLoading ? (
            <Pinwheel size={20} speed={0.9} stroke={5} color='black' />
        ) : (
            <div className="profile-card">
            <div className="profile-top">
                <div className="profile-image-container">
                <img
                    src="src/assets/images/profileImage.jpg"
                    alt="JJ"
                    className="profile-image"
                />
                </div>
                <div className="profile-details">
                <div className="profile-header">
                    <h2 className="profile-name">Jephin Jose</h2>
                    <p className="profile-sub">{age} years old • Kochi, India</p>
                </div>

                <div className="profile-content">
                    <p className="profile-desc">
                    Hey! 👋 I'm Jephin, a Full Stack AI Developer at IBM Kochi, India.
                    I specialize in AI-driven technologies and am currently focused on building observability software, 
                    diving into telemetry, system performance, and scalability. 
                    Always up for a good challenge, I'm passionate about building tech that makes a difference.
                    </p>

                    <div className="profile-tags">
                    <span className="tag">AI</span>
                    <span className="tag">Developer</span>
                    <span className="tag">IBM</span>
                    <span className="tag">Music</span>
                    <span className="tag">Agentic AI</span>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="profile-footer">
                <p>
                I'm deeply fascinated by the endless possibilities AI and tech offer. From solving complex problems 
                to shaping the future of smart, scalable systems, 
                I'm all in when it comes to creating meaningful solutions.
                Outside of work, music is my creative escape, and travel fuels my curiosity and creativity. 
                Exploring new places not only broadens my perspective but also sparks new ideas for my projects. 
                I believe that true innovation comes from blending technical skills, creativity, and diverse life experiences, 
                elements that are key to shaping the future of tech.
                What about you? What interests you? 😊
                </p>
            </div>
            </div>
        )}
    </>
  );
}
