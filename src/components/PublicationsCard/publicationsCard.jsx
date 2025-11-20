import React, { useEffect, useState } from "react";
import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css'
import "./PublicationsCard.less";

export default function PublicationsCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <>
      {isLoading ? (
                  <Pinwheel size={20} speed={0.9} stroke={5} color='black' />
              ) : (
        <div>
          <div className="my-pub-title">
            <h1>Publications</h1>
          </div>
          <div className="publication-card fade-in">
            <div className="pub-image">
              <img
                src="src/assets/images/Publication image.webp" 
                alt="Publication Cover"
              />
            </div>

            <div className="pub-content">
              <div className="pub-header">
                <h2>
                  Smart Industrial Scanner for Implementation of
                  Relevant Data Parsing from Prescriptions Using SSWF Algorithm
                </h2>
                <p className="pub-subtitle">
                  Mobile Radio Communications and 5G Networks
                </p>
              </div>

              <div className="pub-authors">
                <span>
                  By Jephin V. Jose, Sherin Eliyas, Sathish Kumar & Angeline Benitta
                </span>
              </div>

              <div className="pub-details">
                <p>
                  Published as part of the{" "}
                  <span className="highlight">
                    Lecture Notes in Networks and Systems
                  </span>{" "}
                  series (Springer, 2023).
                </p>
                <p>
                  This work introduces an industrial scanner that leverages the{" "}
                  <span className="highlight">SSWF Algorithm</span> to intelligently
                  parse relevant prescription data, improving efficiency and accuracy
                  in medical data processing.
                </p>
              </div>

              <div className="read-publication">
                  <a
                      href="https://link.springer.com/chapter/10.1007/978-981-19-7982-8_52"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <button>
                          Read this paper
                      </button>
                  </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
