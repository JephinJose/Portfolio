// "use client"

// import {
//   motion,
//   MotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "motion/react"
// import { useRef } from "react"
// import "./Parallax.less"

// const experiences = [
//   {
//     company: "IBM",
//     logo: "src/assets/images/ibm_logo.png",
//     role: "Lead Machine Learning Engineer",
//     date: "Jan 2024 - Present",
//     points: [
//       "Involved in several AI initiatives across the organization.",
//       "Leading recommendations & personalization platform efforts.",
//       "Architected a centralized AI platform for multilingual apps and knowledge discovery.",
//       "Services for fine-tuning, hosting LLMs/multimodal models, and production inference.",
//     ],
//   },
//   {
//     company: "Kanini Software Solutions",
//     logo: "src/assets/images/kanini_logo.png",
//     role: "Machine Learning Engineer",
//     date: "2022 - 2023",
//     points: [
//       "Built scalable recommendation systems.",
//       "NLP pipelines for multilingual moderation.",
//       "Deployed ML models with cross-functional teams.",
//     ],
//   },
//   {
//     company: "Mykare",
//     logo: "src/assets/images/mykare_logo.png",
//     role: "Software Engineer",
//     date: "2020 - 2022",
//     points: [
//       "Full-stack features in React & Node.js.",
//       "Backend performance optimizations.",
//       "Mentored junior developers.",
//     ],
//   },
//   {
//     company: "Gobunc Technologies",
//     logo: "src/assets/images/gobunc_logo.png",
//     role: "Software Engineer",
//     date: "2020 - 2022",
//     points: [
//       "Full-stack features in React & Node.js.",
//       "Backend performance optimizations.",
//       "Mentored junior developers.",
//     ],
//   },
// ]

// function useParallax(value: MotionValue<number>, distance: number) {
//   return useTransform(value, [0, 1], [-distance, distance])
// }

// function ParallaxExperienceCard({
//   experience,
//   index,
// }: {
//   experience: typeof experiences[number]
//   index: number
// }) {
//   const ref = useRef(null)
//   const { scrollYProgress } = useScroll({ target: ref })
//   const y = useParallax(scrollYProgress, 100)

//   return (
//     <body className="scroll-container">    
//         <section className="img-container" ref={ref}>
//       <motion.div style={{ y }} className="experience-card">
//         <h2>{experience.date}</h2>
//         <h3>{experience.company}</h3>
//         <p className="role">{experience.role}</p>
//         <ul>
//           {experience.points.map((point, idx) => (
//             <li key={idx}>{point}</li>
//           ))}
//         </ul>
//         <img
//           src={experience.logo}
//           alt={`${experience.company} Logo`}
//           className="company-logo"
//         />
//       </motion.div>
//     </section>
//     </body>

//   )
// }

// export default function Parallax() {
//   const { scrollYProgress } = useScroll()
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   })

//   return (
//     <div id="example">
//       {experiences.map((exp, index) => (
//         <ParallaxExperienceCard key={index} experience={exp} index={index} />
//       ))}
//       <motion.div className="progress" style={{ scaleX }} />
//     </div>
//   )
// }
