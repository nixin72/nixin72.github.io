import useScrollValues from '../util/Scroll';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Projects from '../components/Projects';
import Experiences from '../components/Experience';
import Footer from '../components/Footer';

import '../App.css';

export default function App() {
  const scrollValues = useScrollValues();
  return (
    <div className="App">
      <Header />
      <Banner scrollValues={scrollValues} />
      <Projects />
      <Experiences />
      <Footer />
    </div>
  );
}
