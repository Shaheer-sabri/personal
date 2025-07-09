import React from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      {/* Background Effects */}
      <div className="bg-effects">
        <div className="bg-gradient"></div>
        <div className="bg-gradient"></div>
        <div className="bg-gradient"></div>
      </div>

      {/* Header */}
      <header>
        <nav>
          <ul className="nav-links">
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Syed Shaheer Sabri. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;