import { ProfileCard } from "./components/profileCard/ProfileCard";
import { SkillsCard } from "./components/skillsCard/SkillsCard";
import { ContactCard } from "./components/contactCard/contactCard";
import PublicationsCard from "./components/publicationsCard/publicationsCard";
import { ProjectsCard } from "./components/projectsCard/ProjectsCard";
import { LandingPage } from "./components/mainPage/LandingPage"; 

export const urls = {
  HOME: "/",
  ME: "/me",
  PROJECTS: "/projects",
  SKILLS: "/skills",
  PUBLICATIONS: "/publications",
  CONTACT: "/contact",
};

export const routes = [
  {
    path: urls.HOME,
    exact: true,
    component: LandingPage, 
  },
  {
    path: urls.ME,
    exact: true,
    component: ProfileCard, 
  },
  {
    path: urls.PROJECTS,
    exact: true,
    component: ProjectsCard,
  },
  {
    path: urls.SKILLS,
    exact: true,
    component: SkillsCard,
  },
  {
    path: urls.PUBLICATIONS,
    exact: true,
    component: PublicationsCard,
  },
  {
    path: urls.CONTACT,
    exact: true,
    component: ContactCard, 
  },
];
