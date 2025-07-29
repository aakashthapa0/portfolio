import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/experience" element={<ExperienceSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/skills" element={<SkillsSection />} />
            <Route path="/education" element={<EducationSection />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;