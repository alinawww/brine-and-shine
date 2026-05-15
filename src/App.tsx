import { Routes, Route } from 'react-router-dom';
import { SvgDefs } from './components/SvgDefs';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Builder from './pages/Builder';
import MyJars from './pages/MyJars';

export default function App() {
  return (
    <>
      <SvgDefs />
      <Navbar />
      <Routes>
        <Route path="/"                 element={<Home />} />
        <Route path="/ingredient/:slug" element={<Guide />} />
        <Route path="/build"            element={<Builder />} />
        <Route path="/build/:slug"      element={<Builder />} />
        <Route path="/jars"             element={<MyJars />} />
      </Routes>
    </>
  );
}
