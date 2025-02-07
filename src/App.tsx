import React from 'react';

import { Header } from './components/Header';
import { Projects } from './components/Projects';
import { Experiences } from './components/Experience';
import { Footer } from './components/Footer';

import jackjack from './photos/jackjack.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Projects />
      <Experiences />
      <img src={jackjack} height={window.innerHeight / 2} style={{marginTop: "10rem"}} alt="my cat Jack" />
      <p>
        My cat Jack :&#x29;
      </p>
      <Footer />
    </div>
  );
}

export default App;
